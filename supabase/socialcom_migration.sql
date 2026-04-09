-- ============================================
-- SOCIALCOM — Communication Output Module
-- Additive migration: creates 3 new tables
-- Safe to run on existing schema
-- ============================================

-- ── ENUMS ──────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE comm_event_type AS ENUM (
    'new_entity',        -- új cég/épület/személy
    'data_update',       -- meglévő adat frissülés
    'feature_launch',    -- új webapp funkció
    'milestone',         -- mérföldkő (pl. 100. cég)
    'weekly_digest',     -- heti összefoglaló
    'monthly_digest',    -- havi összefoglaló
    'data_enrichment'    -- adatbázis bővülés
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE comm_priority AS ENUM ('high', 'medium', 'low');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE comm_channel_mode AS ENUM ('auto', 'approval', 'draft');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE comm_event_status AS ENUM (
    'pending',       -- detektálva, tartalom generálásra vár
    'generating',    -- tartalom generálás folyamatban
    'ready',         -- tartalom kész, publikálásra vár
    'published',     -- minden csatornán kiment
    'partial',       -- egyes csatornákon kiment
    'skipped',       -- nem kommunikálható
    'failed'         -- hiba történt
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE comm_output_status AS ENUM (
    'draft',              -- generálva, nem végleges
    'pending_approval',   -- jóváhagyásra vár
    'approved',           -- jóváhagyva, publikálásra kész
    'scheduled',          -- ütemezve
    'publishing',         -- publikálás folyamatban
    'published',          -- sikeresen publikálva
    'failed',             -- hiba
    'skipped'             -- kihagyva (pl. csatorna kikapcsolva)
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── COMM_EVENTS ────────────────────────────────────────────────────
-- Minden kommunikálható esemény. A changes táblából detektálva.

CREATE TABLE IF NOT EXISTS comm_events (
  id TEXT PRIMARY KEY DEFAULT 'cevt_' || substr(md5(random()::text), 1, 12),
  change_id BIGINT REFERENCES changes(id) ON DELETE SET NULL,
  event_type comm_event_type NOT NULL DEFAULT 'data_update',
  title TEXT NOT NULL,
  summary TEXT,
  priority comm_priority NOT NULL DEFAULT 'medium',
  target_channels TEXT[] DEFAULT '{}',
  payload JSONB DEFAULT '{}',
  status comm_event_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comm_events_status ON comm_events (status);
CREATE INDEX IF NOT EXISTS idx_comm_events_created ON comm_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comm_events_change ON comm_events (change_id);
CREATE INDEX IF NOT EXISTS idx_comm_events_type ON comm_events (event_type);

-- ── COMM_CHANNELS ──────────────────────────────────────────────────
-- Csatornák konfigurációja és hitelesítési adatai.

CREATE TABLE IF NOT EXISTS comm_channels (
  id TEXT PRIMARY KEY DEFAULT 'cch_' || substr(md5(random()::text), 1, 12),
  channel_name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT FALSE,
  auth_config JSONB DEFAULT '{}',
  auth_status TEXT DEFAULT 'not_configured',
  default_mode comm_channel_mode DEFAULT 'draft',
  tone TEXT,
  prompt_template TEXT,
  char_limit_title INTEGER,
  char_limit_body INTEGER,
  posting_rules JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── COMM_OUTPUTS ───────────────────────────────────────────────────
-- Generált tartalmak csatornánként. Ez a publikálási feladat is egyben.

CREATE TABLE IF NOT EXISTS comm_outputs (
  id TEXT PRIMARY KEY DEFAULT 'cout_' || substr(md5(random()::text), 1, 12),
  event_id TEXT NOT NULL REFERENCES comm_events(id) ON DELETE CASCADE,
  channel_id TEXT NOT NULL REFERENCES comm_channels(id) ON DELETE CASCADE,
  title TEXT,
  body TEXT,
  cta TEXT,
  hashtags TEXT[] DEFAULT '{}',
  assets JSONB DEFAULT '{}',
  status comm_output_status NOT NULL DEFAULT 'draft',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  external_id TEXT,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comm_outputs_event ON comm_outputs (event_id);
CREATE INDEX IF NOT EXISTS idx_comm_outputs_channel ON comm_outputs (channel_id);
CREATE INDEX IF NOT EXISTS idx_comm_outputs_status ON comm_outputs (status);
CREATE INDEX IF NOT EXISTS idx_comm_outputs_scheduled ON comm_outputs (scheduled_at)
  WHERE scheduled_at IS NOT NULL AND status = 'scheduled';

-- ── RLS ────────────────────────────────────────────────────────────

ALTER TABLE comm_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE comm_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE comm_outputs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read comm_events" ON comm_events FOR SELECT USING (true);
CREATE POLICY "Public read comm_channels" ON comm_channels FOR SELECT USING (true);
CREATE POLICY "Public read comm_outputs" ON comm_outputs FOR SELECT USING (true);

CREATE POLICY "Service write comm_events" ON comm_events FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write comm_channels" ON comm_channels FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write comm_outputs" ON comm_outputs FOR ALL USING (auth.role() = 'service_role');

-- ── SEED: Default channel configs ──────────────────────────────────

INSERT INTO comm_channels (id, channel_name, display_name, is_enabled, default_mode, tone, char_limit_title, char_limit_body)
VALUES
  ('cch_linkedin', 'linkedin', 'LinkedIn', false, 'approval',
   'Szakmai, üzleti hangvétel. Gondolatébresztő, erős felütéssel. Magyar nyelven.',
   NULL, 3000),
  ('cch_mailchimp', 'mailchimp', 'Mailchimp EDM', false, 'approval',
   'Professzionális hírlevél stílus. Tárgysor + rövid összefoglaló + CTA. Magyar nyelven.',
   150, 2000),
  ('cch_email', 'email', 'E-mail', false, 'draft',
   'Közvetlen, személyes hangvétel. Rövid, lényegre törő. Magyar nyelven.',
   100, 1500),
  ('cch_facebook', 'facebook', 'Facebook', false, 'approval',
   'Könnyed, emberközeli stílus. Rövid, befogadható. Magyar nyelven.',
   NULL, 1000)
ON CONFLICT (channel_name) DO NOTHING;
