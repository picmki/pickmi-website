-- =====================================================================
-- PickMi Website - Supabase SQL Schema
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/awwrbgwpzgtbunrvsmyu/sql/new
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE: website_bookings (Cab Bookings from Website)
CREATE TABLE IF NOT EXISTS public.website_bookings (
  id TEXT PRIMARY KEY DEFAULT ('wb_' || substr(md5(random()::text), 1, 12)),
  booking_number TEXT UNIQUE DEFAULT ('PKM-' || floor(100000 + random() * 900000)::text),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  pickup_date TEXT NOT NULL DEFAULT 'Today',
  pickup_time TEXT NOT NULL DEFAULT 'Now',
  trip_type TEXT DEFAULT 'One-way', -- 'One-way', 'Round-trip', 'Airport Transfer', 'Outstation'
  vehicle_type TEXT DEFAULT 'Sedan', -- 'Hatchback', 'Sedan', 'SUV'
  estimated_fare NUMERIC(10, 2),
  distance_km NUMERIC(10, 2),
  status TEXT DEFAULT 'PENDING', -- 'PENDING', 'CONFIRMED', 'ASSIGNED', 'COMPLETED', 'CANCELLED'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE: website_driver_applications (Driver Registration from Website)
CREATE TABLE IF NOT EXISTS public.website_driver_applications (
  id TEXT PRIMARY KEY DEFAULT ('app_' || substr(md5(random()::text), 1, 12)),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  vehicle_number TEXT,
  license_number TEXT,
  status TEXT DEFAULT 'PENDING', -- 'PENDING', 'APPROVED', 'REJECTED'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE: website_contact_submissions (Help / Inquiries from Website)
CREATE TABLE IF NOT EXISTS public.website_contact_submissions (
  id TEXT PRIMARY KEY DEFAULT ('sub_' || substr(md5(random()::text), 1, 12)),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  topic TEXT DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'NEW', -- 'NEW', 'IN_PROGRESS', 'RESOLVED'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE: website_users (Website User Accounts / Auth Sync)
CREATE TABLE IF NOT EXISTS public.website_users (
  id TEXT PRIMARY KEY DEFAULT ('usr_' || substr(md5(random()::text), 1, 12)),
  mobile TEXT NOT NULL UNIQUE,
  name TEXT,
  email TEXT,
  gender TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.website_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_driver_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_users ENABLE ROW LEVEL SECURITY;

-- Allow public insert and read access for website interaction
DROP POLICY IF EXISTS "Allow public insert to website_bookings" ON public.website_bookings;
CREATE POLICY "Allow public insert to website_bookings" ON public.website_bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read website_bookings" ON public.website_bookings;
CREATE POLICY "Allow public read website_bookings" ON public.website_bookings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to website_driver_applications" ON public.website_driver_applications;
CREATE POLICY "Allow public insert to website_driver_applications" ON public.website_driver_applications FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read website_driver_applications" ON public.website_driver_applications;
CREATE POLICY "Allow public read website_driver_applications" ON public.website_driver_applications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to website_contact_submissions" ON public.website_contact_submissions;
CREATE POLICY "Allow public insert to website_contact_submissions" ON public.website_contact_submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read website_contact_submissions" ON public.website_contact_submissions;
CREATE POLICY "Allow public read website_contact_submissions" ON public.website_contact_submissions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert/update to website_users" ON public.website_users;
CREATE POLICY "Allow public insert/update to website_users" ON public.website_users FOR ALL USING (true) WITH CHECK (true);
