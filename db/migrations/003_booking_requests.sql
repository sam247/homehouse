CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'pending',
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  guests text,
  message text,
  internal_notes text,
  start_date date,
  end_date date,
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT booking_requests_status CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  CONSTRAINT booking_requests_dates CHECK (
    (start_date IS NULL AND end_date IS NULL) OR
    (start_date IS NOT NULL AND end_date IS NOT NULL AND end_date >= start_date)
  )
);

CREATE INDEX IF NOT EXISTS booking_requests_status_idx ON booking_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS booking_requests_dates_idx ON booking_requests (start_date, end_date);

