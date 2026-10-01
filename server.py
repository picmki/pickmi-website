import http.server
import socketserver
import webbrowser
import threading
import time
import sys
import json
import ssl
import urllib.request

DEFAULT_PORT = 3000
TWOFACTOR_KEY = 'd0a8104d-bbc6-11f1-af74-0200cd936042'
UA_HEADER = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

ctx = ssl._create_unverified_context()

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/send-otp':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'
            try:
                data = json.loads(body)
                mobile = str(data.get('mobile', '')).strip()
                clean_mobile = ''.join(filter(str.isdigit, mobile))
                if len(clean_mobile) >= 10:
                    clean_mobile = clean_mobile[-10:]
                    url = f'https://2factor.in/API/V1/{TWOFACTOR_KEY}/SMS/{clean_mobile}/AUTOGEN'
                    req = urllib.request.Request(url)
                    req.add_header('User-Agent', UA_HEADER)
                    with urllib.request.urlopen(req, context=ctx) as resp:
                        resp_data = json.loads(resp.read().decode('utf-8'))
                        print(f'✅ Real SMS sent to {clean_mobile}: {resp_data}')
                        if resp_data.get('Status') == 'Success':
                            self.send_response(200)
                            self.send_header('Content-Type', 'application/json')
                            self.end_headers()
                            self.wfile.write(json.dumps({'success': True, 'sessionId': resp_data.get('Details')}).encode('utf-8'))
                            return
                        else:
                            print(f'SMS status failed: {resp_data}')
            except Exception as e:
                print(f'Error sending OTP server-side: {e}')

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': False, 'message': 'Failed to dispatch SMS'}).encode('utf-8'))
            return

        elif self.path == '/api/verify-otp':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'
            try:
                data = json.loads(body)
                session_id = data.get('sessionId', '')
                otp_code = str(data.get('otp', '')).strip()
                if session_id and otp_code:
                    url = f'https://2factor.in/API/V1/{TWOFACTOR_KEY}/SMS/VERIFY/{session_id}/{otp_code}'
                    req = urllib.request.Request(url)
                    req.add_header('User-Agent', UA_HEADER)
                    with urllib.request.urlopen(req, context=ctx) as resp:
                        resp_data = json.loads(resp.read().decode('utf-8'))
                        print(f'✅ Real SMS verification response: {resp_data}')
                        if resp_data.get('Status') == 'Success' and resp_data.get('Details') == 'OTP Matched':
                            self.send_response(200)
                            self.send_header('Content-Type', 'application/json')
                            self.end_headers()
                            self.wfile.write(json.dumps({'success': True}).encode('utf-8'))
                            return
            except Exception as e:
                print(f'Error verifying OTP server-side: {e}')

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': False, 'message': 'Invalid OTP code entered'}).encode('utf-8'))
            return

        super().do_POST()

def open_browser(port):
    time.sleep(0.5)
    try:
        webbrowser.open(f'http://localhost:{port}')
    except Exception:
        pass

def find_server(start_port):
    port = start_port
    while port < start_port + 50:
        try:
            socketserver.TCPServer.allow_reuse_address = True
            httpd = socketserver.TCPServer(('', port), Handler)
            return httpd, port
        except OSError:
            port += 1
    return None, None

if __name__ == '__main__':
    initial_port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    httpd, port = find_server(initial_port)
    
    if not httpd:
        print(f'Error: Could not bind to any port starting from {initial_port}.')
        sys.exit(1)

    print('==================================================')
    print(f' PickMi Website is live at: http://localhost:{port}/')
    print('==================================================')

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('Server stopped.')
    finally:
        httpd.server_close()
