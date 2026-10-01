/**
 * PickMi - Eyes Ah AI Travel & Ride Booking Assistant
 * Robust, intelligent NLP assistant with interactive in-chat booking cards
 */

(function () {
  'use strict';

  // Knowledge base for common routes
  const ROUTE_DISTANCES = {
    'bangalore-mysore': { km: 145, duration: '2h 45m', from: 'Bangalore', to: 'Mysore' },
    'bengaluru-mysuru': { km: 145, duration: '2h 45m', from: 'Bengaluru', to: 'Mysuru' },
    'bangalore-chennai': { km: 345, duration: '6h 15m', from: 'Bangalore', to: 'Chennai' },
    'bangalore-ooty': { km: 275, duration: '5h 45m', from: 'Bangalore', to: 'Ooty' },
    'bangalore-coorg': { km: 260, duration: '5h 30m', from: 'Bangalore', to: 'Coorg' },
    'bangalore-goa': { km: 560, duration: '10h 30m', from: 'Bangalore', to: 'Goa' },
    'bangalore-chikmagalur': { km: 245, duration: '4h 45m', from: 'Bangalore', to: 'Chikmagalur' },
    'chennai-pondicherry': { km: 155, duration: '3h 15m', from: 'Chennai', to: 'Pondicherry' },
    'mumbai-pune': { km: 150, duration: '3h 00m', from: 'Mumbai', to: 'Pune' },
    'delhi-agra': { km: 230, duration: '3h 45m', from: 'Delhi', to: 'Agra' },
    'delhi-jaipur': { km: 280, duration: '4h 50m', from: 'Delhi', to: 'Jaipur' },
    'mumbai-goa': { km: 585, duration: '11h 00m', from: 'Mumbai', to: 'Goa' },
    'hyderabad-vijayawada': { km: 275, duration: '4h 50m', from: 'Hyderabad', to: 'Vijayawada' }
  };

  const FARE_RATES = {
    hatchback: { name: 'Go Hatchback', rate: 14, base: 200, seats: 4 },
    sedan: { name: 'Sedan Intercity', rate: 18, base: 200, seats: 4 },
    suv: { name: 'XL Intercity SUV', rate: 24, base: 200, seats: 6 }
  };

  function fmtINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  function parseRoute(text) {
    const clean = text.toLowerCase();
    
    // Check "from X to Y"
    const fromToMatch = clean.match(/(?:from\s+)?([a-z\s]+?)\s+(?:to|➔|->)\s+([a-z\s]+)/i);
    if (fromToMatch) {
      const from = fromToMatch[1].replace(/cab|taxi|book|trip|ride|please/gi, '').trim();
      const to = fromToMatch[2].replace(/cab|taxi|trip|ride|tomorrow|today|now|please/gi, '').trim();
      if (from && to && from.length > 2 && to.length > 2) {
        return { from: capitalize(from), to: capitalize(to) };
      }
    }

    // Check "to X"
    const toMatch = clean.match(/(?:to\s+)([a-z\s]+)/i);
    if (toMatch) {
      const to = toMatch[1].replace(/cab|taxi|trip|ride|tomorrow|today|now|please/gi, '').trim();
      if (to && to.length > 2) {
        return { from: 'Bengaluru', to: capitalize(to) };
      }
    }

    return null;
  }

  function capitalize(str) {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }

  function getEstimatedDistance(from, to) {
    const key1 = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const key2 = `${to.toLowerCase()}-${from.toLowerCase()}`;

    if (ROUTE_DISTANCES[key1]) return ROUTE_DISTANCES[key1];
    if (ROUTE_DISTANCES[key2]) return ROUTE_DISTANCES[key2];

    // Generic realistic estimate based on string hashing for consistency
    const hash = (from + to).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const km = 120 + (hash % 380);
    const hours = Math.floor(km / 55);
    const mins = Math.round((km % 55) * 1.09);
    return {
      km,
      duration: `${hours}h ${mins}m`,
      from,
      to
    };
  }

  // Predefined detailed responses
  const KNOWLEDGE_RESPONSES = {
    beaches: "India has an incredible coastline! 🌊\n\n• **Goa (Baga, Palolem & Morjim)**: Best for lively shacks, water sports & beach nightlife.\n• **Havelock Island (Radhanagar Beach, Andamans)**: Ranked among Asia's best beaches with crystal-clear turquoise waters.\n• **Gokarna (Om Beach & Kudle Beach)**: Laid-back, tranquil vibe surrounded by cliffs.\n• **Varkala (Kerala)**: Dramatic red cliff views and sunset cafes right by the Arabian Sea.\n\n*Would you like to book a cab to any of these coastal destinations?*",
    palaces: "For a majestic royal heritage vacation, Rajasthan & Karnataka have India's grandest palaces! 🏰\n\n• **Taj Lake Palace, Udaipur**: A floating marble marvel in Lake Pichola.\n• **Umaid Bhawan Palace, Jodhpur**: Spectacular golden-yellow sandstone royal palace.\n• **Rambagh Palace, Jaipur**: Historic luxury home of the Maharaja of Jaipur.\n• **Mysore Palace, Karnataka**: Stunning Indo-Saracenic architecture, illuminated with 100,000 lights every Sunday.\n\n*Tip: We provide round-trip intercity packages to all royal heritage cities!*",
    offbeat: "Looking to escape tourist crowds? Here are top offbeat gems! 🌿\n\n• **Ziro Valley, Arunachal Pradesh**: Pine hills and peaceful Apatani tribal culture.\n• **Mawlynnong & Cherrapunji, Meghalaya**: Asia's cleanest village featuring living root bridges.\n• **Gandikota, Andhra Pradesh**: Famous as the 'Grand Canyon of India' overlooking the Pennar river.\n• **Tirthan Valley, Himachal Pradesh**: Quiet riverside retreat near the Great Himalayan National Park.",
    honeymoon: "Here are India's most romantic getaways for couples! 💍✨\n\n• **Munnar & Alleppey (Kerala)**: Misty green tea hills paired with private backwater houseboats.\n• **Gulmarg & Srinagar (Kashmir)**: Snowy peaks, pine valleys and serene Shikara rides on Dal Lake.\n• **Andaman Islands**: Secluded white-sand beaches, candlelit beach dinners & private resorts.\n• **Udaipur (Rajasthan)**: Lakeside romantic heritage dining and sunset boat rides.",
    fares: "Here is Pickmi's transparent outstation & local rate card: 🏷️\n\n🚗 **Go Hatchback**: ₹14/km (WagonR, Swift • 4 Seats • AC)\n🚘 **Sedan Intercity**: ₹18/km (Dzire, Etios • 4 Seats • AC • Extra boot)\n🚙 **XL Intercity SUV**: ₹24/km (Innova, Ertiga • 6-7 Seats • AC)\n\n✅ **What's Included:**\n• Professional Chauffeur\n• Fuel Charges\n• Free Cancellation up to 1 hr before departure\n• 24/7 Roadside Assistance & Customer Support",
    safety: "Your safety is Pickmi's highest priority! 🛡️\n\n• **Verified Drivers**: 100% background and police-verified commercial chauffeurs.\n• **Live Trip Tracking**: Real-time GPS sharing with your family and emergency contacts.\n• **Sanitized Cabs**: Clean, inspected and air-conditioned vehicles.\n• **Emergency SOS**: 24/7 dedicated rapid response team available at all times.",
    cancel: "Pickmi offers **100% Free Cancellation**! 🎉\n\nYou can cancel your ride up to **1 hour before pickup** with zero penalty and an instant refund. You can manage or cancel any ride directly in your **Activity** tab in your Account.",
    contact: "Need help? We're available 24/7! 📞\n\n• **Phone Support**: [+91 8867791805](tel:+918867791805)\n• **Email**: support@pickmicabs.com\n• **Office**: Phase 2, J.P. Nagar, Bangalore, Karnataka - 560078\n• **Live Support**: Every day, 24 hours a day."
  };

  // Helper to open results.html with parameters
  window.goToBooking = function (from, to) {
    const url = `results.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&type=intercity&time=10:00`;
    window.location.href = url;
  };

  // Helper to trigger chip action
  window.handleChatChip = function (action) {
    if (action === 'book') {
      window.sendSuggestion("I want to book a cab from Bangalore to Mysore");
    } else if (action === 'fares') {
      window.sendSuggestion("What are your cab fares and rates?");
    } else if (action === 'beaches') {
      window.sendSuggestion("Which are the best beaches to visit in India?");
    } else if (action === 'palaces') {
      window.sendSuggestion("Which are the iconic palace hotels to experience in India?");
    } else if (action === 'honeymoon') {
      window.sendSuggestion("What are some perfect destinations for a memorable honeymoon?");
    } else if (action === 'safety') {
      window.sendSuggestion("What safety measures does Pickmi provide?");
    } else if (action === 'support') {
      window.sendSuggestion("How can I contact Pickmi customer support?");
    }
  };

  function initChatWidget() {
    const launcher = document.getElementById('myraLauncher');
    const chatbox = document.getElementById('myraChatbox');
    const closeBtn = document.getElementById('myraCloseBtn');
    const form = document.getElementById('myraInputForm');
    const input = document.getElementById('myraInputText');
    const welcomeScreen = document.getElementById('myraWelcomeScreen');
    const messagesList = document.getElementById('myraMessagesList');
    const chatBody = document.getElementById('myraChatBody');

    if (!chatbox) return;

    function scrollBottom() {
      if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showChat() {
      chatbox.classList.add('active');
      if (launcher) launcher.classList.add('hidden');
      scrollBottom();
    }

    function hideChat() {
      chatbox.classList.remove('active');
      if (launcher) launcher.classList.remove('hidden');
    }

    if (launcher) {
      launcher.addEventListener('click', () => {
        showChat();
        // If empty, show initial greeting
        if (messagesList && messagesList.children.length === 0) {
          setupInitialConversation();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideChat();
      });
    }

    function appendQuickChips() {
      const chipsDiv = document.createElement('div');
      chipsDiv.className = 'chat-quick-chips';
      chipsDiv.innerHTML = `
        <button type="button" class="chat-chip" onclick="handleChatChip('book')">🚕 Book a Ride</button>
        <button type="button" class="chat-chip" onclick="handleChatChip('fares')">💰 Fare Rates</button>
        <button type="button" class="chat-chip" onclick="handleChatChip('beaches')">🏖️ Best Beaches</button>
        <button type="button" class="chat-chip" onclick="handleChatChip('palaces')">🏰 Palaces</button>
        <button type="button" class="chat-chip" onclick="handleChatChip('honeymoon')">💍 Honeymoon</button>
        <button type="button" class="chat-chip" onclick="handleChatChip('safety')">🛡️ Safety</button>
        <button type="button" class="chat-chip" onclick="handleChatChip('support')">📞 Support</button>
      `;
      messagesList.appendChild(chipsDiv);
      scrollBottom();
    }

    function setupInitialConversation() {
      if (!messagesList) return;
      if (welcomeScreen) welcomeScreen.style.display = 'none';
      messagesList.style.display = 'flex';

      appendBotMsg("Hi there! I'm **Eyes Ah** — your personal Pickmi travel assistant. 🤖\n\nI can help you plan trips, compare cab fares, discover destinations, and book your ride instantly! How can I help you today?");
      appendQuickChips();
    }

    function appendUserMsg(text) {
      if (welcomeScreen) welcomeScreen.style.display = 'none';
      if (messagesList) messagesList.style.display = 'flex';

      const div = document.createElement('div');
      div.className = 'myra-msg user';
      div.textContent = text;
      messagesList.appendChild(div);
      scrollBottom();
    }

    function appendBotMsg(text, htmlExtra = '') {
      if (welcomeScreen) welcomeScreen.style.display = 'none';
      if (messagesList) messagesList.style.display = 'flex';

      const div = document.createElement('div');
      div.className = 'myra-msg bot';

      const header = document.createElement('div');
      header.className = 'bot-header';
      header.innerHTML = '<span class="bot-sparkle">✦</span> <span>Eyes Ah</span>';

      const body = document.createElement('div');
      body.className = 'bot-text';
      
      // Convert markdown **bold** and newlines
      let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

      body.innerHTML = formatted;
      if (htmlExtra) {
        body.innerHTML += htmlExtra;
      }

      div.appendChild(header);
      div.appendChild(body);
      messagesList.appendChild(div);
      scrollBottom();
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'myra-typing';
      typing.id = 'activeTypingIndicator';
      typing.innerHTML = `
        <div class="myra-typing-dot"></div>
        <div class="myra-typing-dot"></div>
        <div class="myra-typing-dot"></div>
      `;
      messagesList.appendChild(typing);
      scrollBottom();
    }

    function removeTyping() {
      const t = document.getElementById('activeTypingIndicator');
      if (t) t.remove();
    }

    // Main AI Engine matching logic
    function processUserMessage(rawText) {
      const text = rawText.trim();
      const lower = text.toLowerCase();

      showTyping();

      setTimeout(() => {
        removeTyping();

        // 1. Check for Route / Trip Booking Intent
        const route = parseRoute(text);
        const hasBookingWord = /book|cab|taxi|ride|fare|price|cost|drive|trip|travel/i.test(lower);

        if (route || (hasBookingWord && (lower.includes('to') || lower.includes('from')))) {
          const fromCity = route ? route.from : 'Bengaluru';
          const toCity = route ? route.to : 'Mysuru';
          const trip = getEstimatedDistance(fromCity, toCity);

          const hatchPrice = fmtINR(trip.km * FARE_RATES.hatchback.rate + FARE_RATES.hatchback.base);
          const sedanPrice = fmtINR(trip.km * FARE_RATES.sedan.rate + FARE_RATES.sedan.base);
          const suvPrice = fmtINR(trip.km * FARE_RATES.suv.rate + FARE_RATES.suv.base);

          const bookingCardHTML = `
            <div class="chat-booking-card">
              <span class="chat-trip-badge">⚡ Instant Route Calculation</span>
              <div class="chat-trip-route">📍 ${trip.from} ➔ 🏁 ${trip.to}</div>
              <div class="chat-trip-stats">🛣️ Distance: ~${trip.km} km • ⏱️ Est. Drive: ~${trip.duration}</div>
              <div class="chat-fare-options">
                <div class="chat-fare-pill">
                  <span>🚗 <strong>Go Hatchback</strong> (4 Seats)</span>
                  <strong>${hatchPrice}</strong>
                </div>
                <div class="chat-fare-pill">
                  <span>🚘 <strong>Sedan Intercity</strong> (4 Seats, AC)</span>
                  <strong>${sedanPrice}</strong>
                </div>
                <div class="chat-fare-pill">
                  <span>🚙 <strong>XL Intercity SUV</strong> (6-7 Seats)</span>
                  <strong>${suvPrice}</strong>
                </div>
              </div>
              <button class="chat-book-action-btn" onclick="goToBooking('${trip.from}', '${trip.to}')">
                🚕 Choose Driver &amp; Book Now ➔
              </button>
            </div>
          `;

          appendBotMsg(
            `Great! I found available Pickmi cabs for **${trip.from} to ${trip.to}**.\nHere are the estimated fares with fuel, driver allowance, and free cancellation included:`,
            bookingCardHTML
          );
          return;
        }

        // 2. Fares & Rates Query
        if (/fare|rate|price|cost|how much|charges/i.test(lower)) {
          appendBotMsg(KNOWLEDGE_RESPONSES.fares);
          appendQuickChips();
          return;
        }

        // 3. Beaches
        if (/beach|sea|coast|goa|gokarna|andaman|varkala/i.test(lower)) {
          appendBotMsg(KNOWLEDGE_RESPONSES.beaches);
          return;
        }

        // 4. Palaces & Heritage
        if (/palace|heritage|royal|rajasthan|jaipur|udaipur|jodhpur|mysore palace|hampi/i.test(lower)) {
          appendBotMsg(KNOWLEDGE_RESPONSES.palaces);
          return;
        }

        // 5. Offbeat & Adventure
        if (/offbeat|unique|adventure|hidden|nature|hills/i.test(lower)) {
          appendBotMsg(KNOWLEDGE_RESPONSES.offbeat);
          return;
        }

        // 6. Honeymoon / Couple
        if (/honeymoon|couple|romantic|anniversary/i.test(lower)) {
          appendBotMsg(KNOWLEDGE_RESPONSES.honeymoon);
          return;
        }

        // 7. Safety & Drivers
        if (/safe|safety|driver|police|gps|emergency|sos/i.test(lower)) {
          appendBotMsg(KNOWLEDGE_RESPONSES.safety);
          return;
        }

        // 8. Cancellation & Refund
        if (/cancel|refund|reschedule|change date/i.test(lower)) {
          appendBotMsg(KNOWLEDGE_RESPONSES.cancel);
          return;
        }

        // 9. Contact & Support
        if (/support|contact|call|phone|help|number|email|agent/i.test(lower)) {
          appendBotMsg(KNOWLEDGE_RESPONSES.contact);
          return;
        }

        // 10. Greetings
        if (/^(hi|hello|hey|hola|namaste|good\s*(morning|afternoon|evening))/i.test(lower)) {
          appendBotMsg("Hello! 👋 I'm **Eyes Ah**, your 24/7 AI travel assistant. Where are you planning to travel next? You can type any destination (like *'Bangalore to Ooty'*), or select a quick option below:");
          appendQuickChips();
          return;
        }

        // 11. Appreciation
        if (/thank|thanks|awesome|cool|great|nice/i.test(lower)) {
          appendBotMsg("You're very welcome! 😊 Whenever you're ready to hit the road, Pickmi is here to ensure a comfortable and safe journey. Have a wonderful trip!");
          return;
        }

        // 12. Smart Fallback with guidance
        appendBotMsg(
          `I'm Eyes Ah, your personal Pickmi travel assistant. 🤖\n\nI can help you with:\n• **Booking Cabs**: Type your route (e.g., *"Book cab to Mysore"* or *"Chennai to Pondicherry"*)\n• **Fares & Pricing**: Ask *"What are hatchback rates?"*\n• **Travel Planning**: Ask for beaches, palaces, hill stations, or honeymoon spots\n• **Customer Support**: Call us 24/7 at **+91 8867791805**`,
          `<div style="margin-top:10px;"><button class="chat-book-action-btn" onclick="goToBooking('Bengaluru','Mysuru')">🚕 Quick Ride: Bengaluru ➔ Mysuru</button></div>`
        );
        appendQuickChips();

      }, 600);
    }

    // Expose global sendSuggestion for cards
    window.sendSuggestion = function (text) {
      showChat();
      appendUserMsg(text);
      processUserMessage(text);
    };

    // Form submit handler
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input ? input.value.trim() : '';
        if (!text) return;
        if (input) input.value = '';

        appendUserMsg(text);
        processUserMessage(text);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }
})();
