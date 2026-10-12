CREATE TABLE public.pro_codes (
  code text PRIMARY KEY,
  note text,
  active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.pro_codes TO service_role;
ALTER TABLE public.pro_codes ENABLE ROW LEVEL SECURITY;
-- No policies: only the backend (service role) can read codes.
INSERT INTO public.pro_codes (code, note) VALUES ('CHPRO-' || upper(substr(md5(random()::text), 1, 8)), 'First test code');