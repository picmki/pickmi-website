/**
 * Pickmi Website - Supabase Client Integration
 * Project URL: https://awwrbgwpzgtbunrvsmyu.supabase.co
 */

(function () {
  const SUPABASE_URL = 'https://awwrbgwpzgtbunrvsmyu.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_MVv7fXTjS6R79oXLOHuCLA_ij0lDSRE';

  let client = null;

  function getClient() {
    if (!client && window.supabase && window.supabase.createClient) {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return client;
  }

  window.PickmiSupabase = {
    getClient: getClient,

    // 1. Create Web Booking
    createBooking: async function (bookingData) {
      try {
        const sb = getClient();
        if (!sb) {
          console.warn('Supabase client unavailable, using offline fallback.');
          return { success: false, error: 'Client not initialized' };
        }

        const payload = {
          customer_name: bookingData.customer_name || 'Guest User',
          customer_phone: bookingData.customer_phone || 'N/A',
          customer_email: bookingData.customer_email || null,
          pickup_location: bookingData.pickup_location,
          drop_location: bookingData.drop_location,
          pickup_date: bookingData.pickup_date || 'Today',
          pickup_time: bookingData.pickup_time || 'Now',
          trip_type: bookingData.trip_type || 'One-way',
          vehicle_type: bookingData.vehicle_type || 'Sedan',
          estimated_fare: parseFloat(bookingData.estimated_fare) || 0,
          distance_km: parseFloat(bookingData.distance_km) || 0,
          status: 'PENDING'
        };

        const { data, error } = await sb
          .from('website_bookings')
          .insert([payload])
          .select();

        if (error) {
          console.error('Supabase createBooking error:', error.message);
          return { success: false, error: error.message };
        }

        console.log('✅ Booking successfully saved to Supabase:', data);
        return { success: true, data: data ? data[0] : null };
      } catch (err) {
        console.error('Supabase createBooking exception:', err);
        return { success: false, error: err.message };
      }
    },

    // 2. Submit Driver Partner Application
    submitDriverApplication: async function (driverData) {
      try {
        const sb = getClient();
        if (!sb) return { success: false, error: 'Client not initialized' };

        const payload = {
          full_name: driverData.full_name,
          phone_number: driverData.phone_number,
          email: driverData.email || null,
          city: driverData.city || 'Bangalore',
          vehicle_type: driverData.vehicle_type || 'Sedan',
          vehicle_number: driverData.vehicle_number || null,
          license_number: driverData.license_number || null,
          status: 'PENDING'
        };

        const { data, error } = await sb
          .from('website_driver_applications')
          .insert([payload])
          .select();

        if (error) {
          console.error('Supabase submitDriverApplication error:', error.message);
          return { success: false, error: error.message };
        }

        console.log('✅ Driver application saved to Supabase:', data);
        return { success: true, data: data ? data[0] : null };
      } catch (err) {
        console.error('Supabase submitDriverApplication exception:', err);
        return { success: false, error: err.message };
      }
    },

    // 3. Contact Submission / Inquiry
    submitContactInquiry: async function (contactData) {
      try {
        const sb = getClient();
        if (!sb) return { success: false, error: 'Client not initialized' };

        const payload = {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone || null,
          topic: contactData.topic || 'General Inquiry',
          message: contactData.message,
          status: 'NEW'
        };

        const { data, error } = await sb
          .from('website_contact_submissions')
          .insert([payload])
          .select();

        if (error) {
          console.error('Supabase submitContactInquiry error:', error.message);
          return { success: false, error: error.message };
        }

        console.log('✅ Contact inquiry saved to Supabase:', data);
        return { success: true, data: data ? data[0] : null };
      } catch (err) {
        console.error('Supabase submitContactInquiry exception:', err);
        return { success: false, error: err.message };
      }
    },

    // 4. Sync User Profile
    
        // 5. Send Real SMS OTP via Local Server Proxy
    sendSmsOtp: async function (mobile) {
      try {
        const res = await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile: mobile })
        });
        const data = await res.json();
        if (data && data.success) {
          console.log('✅ Real SMS OTP sent successfully:', data.sessionId);
          return { success: true, sessionId: data.sessionId };
        } else {
          console.warn('SMS dispatch warning:', data);
          return { success: false, message: data.message || 'Failed to send SMS OTP' };
        }
      } catch (err) {
        console.error('sendSmsOtp exception:', err);
        return { success: false, message: 'Network error sending SMS' };
      }
    },

    // 6. Verify SMS OTP via Local Server Proxy
    verifySmsOtp: async function (sessionId, otpCode) {
      try {
        const res = await fetch('/api/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionId, otp: otpCode })
        });
        const data = await res.json();
        if (data && data.success) {
          return { success: true };
        } else {
          return { success: false, message: data.message || 'Invalid OTP code entered' };
        }
      } catch (err) {
        console.error('verifySmsOtp exception:', err);
        return { success: false, message: 'Network error verifying OTP' };
      }
    },

    syncUserAccount: async function (userData) {
      try {
        const sb = getClient();
        if (!sb) return { success: false, error: 'Client not initialized' };

        const payload = {
          mobile: userData.mobile,
          name: userData.name,
          email: userData.email,
          gender: userData.gender || null,
          updated_at: new Date().toISOString()
        };

        const { data, error } = await sb
          .from('website_users')
          .upsert([payload], { onConflict: 'mobile' })
          .select();

        if (error) {
          console.error('Supabase syncUserAccount error:', error.message);
          return { success: false, error: error.message };
        }

        console.log('✅ User account synced to Supabase:', data);
        return { success: true, data: data ? data[0] : null };
      } catch (err) {
        console.error('Supabase syncUserAccount exception:', err);
        return { success: false, error: err.message };
      }
    }
  };

  console.log('PickmiSupabase integration script loaded.');
})();
