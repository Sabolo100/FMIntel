-- ============================================
-- FM/PM/AM Piaci Intelligencia Platform
-- Supabase Schema - Phase 1
-- CLEAN INSTALL: drops everything first
-- ============================================

-- Drop functions (CASCADE removes dependent triggers automatically)
DROP FUNCTION IF EXISTS log_entity_change() CASCADE;
DROP FUNCTION IF EXISTS log_management_change() CASCADE;
DROP FUNCTION IF EXISTS log_job_change() CASCADE;

-- Drop all tables (CASCADE removes FKs, triggers, etc.)
DROP TABLE IF EXISTS pending_matches CASCADE;
DROP TABLE IF EXISTS sources CASCADE;
DROP TABLE IF EXISTS news_mentions CASCADE;
DROP TABLE IF EXISTS changes CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS building_management CASCADE;
DROP TABLE IF EXISTS company_relations CASCADE;
DROP TABLE IF EXISTS buildings CASCADE;
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS articles CASCADE;

-- Drop all enums
DROP TYPE IF EXISTS match_status CASCADE;
DROP TYPE IF EXISTS change_type CASCADE;
DROP TYPE IF EXISTS entity_type CASCADE;
DROP TYPE IF EXISTS position_category CASCADE;
DROP TYPE IF EXISTS relation_type CASCADE;
DROP TYPE IF EXISTS management_role CASCADE;
DROP TYPE IF EXISTS building_status CASCADE;
DROP TYPE IF EXISTS building_class CASCADE;
DROP TYPE IF EXISTS building_type CASCADE;
DROP TYPE IF EXISTS service_type CASCADE;

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE service_type AS ENUM ('fm', 'pm', 'am');
CREATE TYPE building_type AS ENUM ('iroda', 'raktar', 'logisztikai', 'vegyes');
CREATE TYPE building_class AS ENUM ('A+', 'A', 'B+', 'B', 'C');
CREATE TYPE building_status AS ENUM ('mukodo', 'fejlesztes_alatt', 'tervezett', 'felujitas_alatt', 'ures');
CREATE TYPE management_role AS ENUM ('fm', 'pm', 'am');
CREATE TYPE relation_type AS ENUM ('parent', 'subsidiary', 'brand', 'merger', 'acquisition', 'joint_venture');
CREATE TYPE position_category AS ENUM (
  'ceo', 'coo', 'cfo', 'cto',
  'fm_director', 'pm_director', 'am_director',
  'fm_manager', 'pm_manager', 'am_manager',
  'regional_director', 'country_manager',
  'head_of_operations', 'head_of_technical',
  'board_member', 'partner',
  'business_development', 'leasing_manager',
  'other'
);
CREATE TYPE entity_type AS ENUM ('company', 'building', 'person');
CREATE TYPE change_type AS ENUM (
  'new_entity', 'updated_entity',
  'new_management', 'ended_management',
  'personnel_move', 'company_relation',
  'data_correction'
);
CREATE TYPE match_status AS ENUM ('pending', 'approved', 'rejected', 'merged');

-- ============================================
-- COMPANIES
-- ============================================
CREATE TABLE companies (
  id TEXT PRIMARY KEY DEFAULT 'comp_' || substr(md5(random()::text), 1, 12),
  name TEXT NOT NULL,
  name_aliases TEXT[] DEFAULT '{}',
  service_types service_type[] DEFAULT '{}',
  description TEXT,
  website TEXT,
  headquarters_city TEXT,
  headquarters_address TEXT,
  founded_year INTEGER,
  employee_count_estimate INTEGER,
  is_international BOOLEAN DEFAULT FALSE,
  parent_company_id TEXT REFERENCES companies(id),
  logo_url TEXT,
  confidence REAL DEFAULT 0.5,
  source_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  last_confirmed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_service_types ON companies USING GIN (service_types);
CREATE INDEX idx_companies_name ON companies (name);
CREATE INDEX idx_companies_status ON companies (status);

-- ============================================
-- COMPANY RELATIONS
-- ============================================
CREATE TABLE company_relations (
  id TEXT PRIMARY KEY DEFAULT 'crel_' || substr(md5(random()::text), 1, 12),
  parent_company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  child_company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  relation relation_type NOT NULL,
  effective_from DATE,
  effective_to DATE,
  confidence REAL DEFAULT 0.5,
  source_urls TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_company_relations_parent ON company_relations (parent_company_id);
CREATE INDEX idx_company_relations_child ON company_relations (child_company_id);

-- ============================================
-- BUILDINGS
-- ============================================
CREATE TABLE buildings (
  id TEXT PRIMARY KEY DEFAULT 'bldg_' || substr(md5(random()::text), 1, 12),
  name TEXT NOT NULL,
  name_aliases TEXT[] DEFAULT '{}',
  building_type building_type NOT NULL DEFAULT 'iroda',
  building_class building_class,
  status building_status DEFAULT 'mukodo',
  address TEXT,
  city TEXT DEFAULT 'Budapest',
  district TEXT,
  zip_code TEXT,
  latitude REAL,
  longitude REAL,
  total_area_sqm INTEGER,
  leasable_area_sqm INTEGER,
  floors INTEGER,
  year_built INTEGER,
  year_renovated INTEGER,
  owner_company_id TEXT REFERENCES companies(id),
  developer_company_id TEXT REFERENCES companies(id),
  description TEXT,
  image_url TEXT,
  confidence REAL DEFAULT 0.5,
  source_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  last_confirmed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_buildings_type ON buildings (building_type);
CREATE INDEX idx_buildings_city ON buildings (city);
CREATE INDEX idx_buildings_class ON buildings (building_class);
CREATE INDEX idx_buildings_status ON buildings (status);
CREATE INDEX idx_buildings_owner ON buildings (owner_company_id);

-- ============================================
-- BUILDING MANAGEMENT (time-stamped FM/PM/AM)
-- ============================================
CREATE TABLE building_management (
  id TEXT PRIMARY KEY DEFAULT 'bmgmt_' || substr(md5(random()::text), 1, 12),
  building_id TEXT NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role management_role NOT NULL,
  started_at DATE,
  ended_at DATE,
  contract_type TEXT,
  confidence REAL DEFAULT 0.5,
  source_urls TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_building_mgmt_building ON building_management (building_id);
CREATE INDEX idx_building_mgmt_company ON building_management (company_id);
CREATE INDEX idx_building_mgmt_role ON building_management (role);
CREATE INDEX idx_building_mgmt_active ON building_management (ended_at) WHERE ended_at IS NULL;

-- ============================================
-- PEOPLE
-- ============================================
CREATE TABLE people (
  id TEXT PRIMARY KEY DEFAULT 'pers_' || substr(md5(random()::text), 1, 12),
  name TEXT NOT NULL,
  name_normalized TEXT,
  title TEXT,
  current_company_id TEXT REFERENCES companies(id),
  linkedin_url TEXT,
  email TEXT,
  phone TEXT,
  photo_url TEXT,
  bio TEXT,
  confidence REAL DEFAULT 0.5,
  source_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  last_confirmed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_people_name ON people (name);
CREATE INDEX idx_people_name_normalized ON people (name_normalized);
CREATE INDEX idx_people_company ON people (current_company_id);

-- ============================================
-- JOBS (career connections)
-- ============================================
CREATE TABLE jobs (
  id TEXT PRIMARY KEY DEFAULT 'job_' || substr(md5(random()::text), 1, 12),
  person_id TEXT NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  position_title TEXT NOT NULL,
  position_category position_category DEFAULT 'other',
  started_at DATE,
  ended_at DATE,
  is_current BOOLEAN DEFAULT TRUE,
  confidence REAL DEFAULT 0.5,
  source_urls TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jobs_person ON jobs (person_id);
CREATE INDEX idx_jobs_company ON jobs (company_id);
CREATE INDEX idx_jobs_current ON jobs (is_current) WHERE is_current = TRUE;
CREATE INDEX idx_jobs_category ON jobs (position_category);

-- ============================================
-- CHANGES (auto-generated change feed)
-- ============================================
CREATE TABLE changes (
  id BIGSERIAL PRIMARY KEY,
  change_type change_type NOT NULL,
  entity_type entity_type NOT NULL,
  entity_id TEXT NOT NULL,
  entity_name TEXT,
  summary TEXT NOT NULL,
  details JSONB,
  related_entity_type entity_type,
  related_entity_id TEXT,
  related_entity_name TEXT,
  confidence REAL DEFAULT 0.5,
  source_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_changes_entity ON changes (entity_type, entity_id);
CREATE INDEX idx_changes_type ON changes (change_type);
CREATE INDEX idx_changes_created ON changes (created_at DESC);

-- ============================================
-- NEWS MENTIONS
-- ============================================
CREATE TABLE news_mentions (
  id TEXT PRIMARY KEY DEFAULT 'news_' || substr(md5(random()::text), 1, 12),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  source_domain TEXT,
  published_at DATE,
  summary TEXT,
  entity_type entity_type NOT NULL,
  entity_id TEXT,
  entity_name TEXT,
  sentiment TEXT DEFAULT 'neutral',
  confidence REAL DEFAULT 0.5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_news_entity ON news_mentions (entity_type, entity_id);
CREATE INDEX idx_news_published ON news_mentions (published_at DESC);

-- ============================================
-- SOURCES
-- ============================================
CREATE TABLE sources (
  id TEXT PRIMARY KEY DEFAULT 'src_' || substr(md5(random()::text), 1, 12),
  url TEXT NOT NULL UNIQUE,
  domain TEXT,
  title TEXT,
  trust_score REAL DEFAULT 0.5,
  language TEXT DEFAULT 'hu',
  last_fetched_at TIMESTAMPTZ,
  fetch_count INTEGER DEFAULT 0,
  entity_type entity_type,
  entity_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sources_domain ON sources (domain);

-- ============================================
-- PENDING MATCHES (review queue)
-- ============================================
CREATE TABLE pending_matches (
  id BIGSERIAL PRIMARY KEY,
  entity_type entity_type NOT NULL,
  candidate_data JSONB NOT NULL,
  potential_match_id TEXT,
  potential_match_name TEXT,
  similarity_score REAL,
  match_status match_status DEFAULT 'pending',
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  resolution_notes TEXT,
  source_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pending_status ON pending_matches (match_status);
CREATE INDEX idx_pending_entity ON pending_matches (entity_type);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE building_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_matches ENABLE ROW LEVEL SECURITY;

-- Public read for data tables
CREATE POLICY "Public read companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Public read company_relations" ON company_relations FOR SELECT USING (true);
CREATE POLICY "Public read buildings" ON buildings FOR SELECT USING (true);
CREATE POLICY "Public read building_management" ON building_management FOR SELECT USING (true);
CREATE POLICY "Public read people" ON people FOR SELECT USING (true);
CREATE POLICY "Public read jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public read changes" ON changes FOR SELECT USING (true);
CREATE POLICY "Public read news_mentions" ON news_mentions FOR SELECT USING (true);
CREATE POLICY "Public read sources" ON sources FOR SELECT USING (true);

-- Admin-only read for pending_matches
CREATE POLICY "Admin read pending_matches" ON pending_matches FOR SELECT USING (auth.role() = 'authenticated');

-- Service role full access (research pipeline writes via service key)
CREATE POLICY "Service write companies" ON companies FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write company_relations" ON company_relations FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write buildings" ON buildings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write building_management" ON building_management FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write people" ON people FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write jobs" ON jobs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write changes" ON changes FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write news_mentions" ON news_mentions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write sources" ON sources FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write pending_matches" ON pending_matches FOR ALL USING (auth.role() = 'service_role');

-- Authenticated admin write for pending_matches
CREATE POLICY "Admin write pending_matches" ON pending_matches FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- TRIGGERS: Auto-log changes
-- ============================================

-- Entity change trigger (companies, buildings, people)
CREATE OR REPLACE FUNCTION log_entity_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO changes (change_type, entity_type, entity_id, entity_name, summary, confidence, source_urls)
    VALUES (
      'new_entity'::change_type,
      TG_ARGV[0]::entity_type,
      NEW.id,
      NEW.name,
      'Új ' || TG_ARGV[1] || ': ' || NEW.name,
      NEW.confidence,
      NEW.source_urls
    );
  ELSIF TG_OP = 'UPDATE' AND OLD.name IS DISTINCT FROM NEW.name THEN
    INSERT INTO changes (change_type, entity_type, entity_id, entity_name, summary, confidence, source_urls)
    VALUES (
      'updated_entity'::change_type,
      TG_ARGV[0]::entity_type,
      NEW.id,
      NEW.name,
      TG_ARGV[1] || ' frissítve: ' || NEW.name,
      NEW.confidence,
      NEW.source_urls
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER companies_change_log
  AFTER INSERT OR UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION log_entity_change('company', 'Cég');

CREATE TRIGGER buildings_change_log
  AFTER INSERT OR UPDATE ON buildings
  FOR EACH ROW EXECUTE FUNCTION log_entity_change('building', 'Ingatlan');

CREATE TRIGGER people_change_log
  AFTER INSERT OR UPDATE ON people
  FOR EACH ROW EXECUTE FUNCTION log_entity_change('person', 'Személy');

-- Management change trigger
CREATE OR REPLACE FUNCTION log_management_change()
RETURNS TRIGGER AS $$
DECLARE
  v_building_name TEXT;
  v_company_name TEXT;
BEGIN
  SELECT name INTO v_building_name FROM buildings WHERE id = NEW.building_id;
  SELECT name INTO v_company_name FROM companies WHERE id = NEW.company_id;

  INSERT INTO changes (
    change_type, entity_type, entity_id, entity_name, summary,
    related_entity_type, related_entity_id, related_entity_name,
    confidence, source_urls
  ) VALUES (
    (CASE WHEN NEW.ended_at IS NULL THEN 'new_management' ELSE 'ended_management' END)::change_type,
    'building'::entity_type,
    NEW.building_id,
    v_building_name,
    v_company_name || ' - ' || NEW.role::text || ' ' ||
      CASE WHEN NEW.ended_at IS NULL THEN 'megbízás' ELSE 'megbízás vége' END ||
      ': ' || v_building_name,
    'company'::entity_type,
    NEW.company_id,
    v_company_name,
    NEW.confidence,
    NEW.source_urls
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER management_change_log
  AFTER INSERT OR UPDATE ON building_management
  FOR EACH ROW EXECUTE FUNCTION log_management_change();

-- Job change trigger
CREATE OR REPLACE FUNCTION log_job_change()
RETURNS TRIGGER AS $$
DECLARE
  v_person_name TEXT;
  v_company_name TEXT;
BEGIN
  SELECT name INTO v_person_name FROM people WHERE id = NEW.person_id;
  SELECT name INTO v_company_name FROM companies WHERE id = NEW.company_id;

  INSERT INTO changes (
    change_type, entity_type, entity_id, entity_name, summary,
    related_entity_type, related_entity_id, related_entity_name,
    confidence, source_urls
  ) VALUES (
    'personnel_move'::change_type,
    'person'::entity_type,
    NEW.person_id,
    v_person_name,
    v_person_name || ' → ' || NEW.position_title || ' @ ' || v_company_name,
    'company'::entity_type,
    NEW.company_id,
    v_company_name,
    NEW.confidence,
    NEW.source_urls
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER job_change_log
  AFTER INSERT ON jobs
  FOR EACH ROW EXECUTE FUNCTION log_job_change();

-- ============================================
-- SEED DATA (for testing)
-- ============================================
INSERT INTO companies (id, name, service_types, description, website, headquarters_city, is_international, confidence)
VALUES
  ('comp_cbre_hu', 'CBRE Hungary', '{fm,pm,am}'::service_type[], 'A világ legnagyobb kereskedelmi ingatlan-tanácsadó és szolgáltató cége.', 'https://cbre.hu', 'Budapest', true, 0.95),
  ('comp_jll_hu', 'JLL Hungary', '{fm,pm,am}'::service_type[], 'Globális ingatlan-szolgáltató és befektetéskezelő cég magyar leányvállalata.', 'https://jll.hu', 'Budapest', true, 0.95),
  ('comp_cushwake_hu', 'Cushman & Wakefield Hungary', '{fm,pm}'::service_type[], 'Nemzetközi ingatlan-tanácsadó cég magyar irodája.', 'https://cushmanwakefield.com/hu-hu', 'Budapest', true, 0.9);

INSERT INTO buildings (id, name, building_type, building_class, status, address, city, district, total_area_sqm, year_built, confidence)
VALUES
  ('bldg_millen_tower', 'Millennium Tower', 'iroda'::building_type, 'A'::building_class, 'mukodo'::building_status, 'Váci út 1-3.', 'Budapest', 'XIII. kerület', 28000, 1999, 0.9),
  ('bldg_eiffel_palace', 'Eiffel Palace', 'iroda'::building_type, 'A+'::building_class, 'mukodo'::building_status, 'Bajcsy-Zsilinszky út 78.', 'Budapest', 'VI. kerület', 22000, 2011, 0.9),
  ('bldg_harbor_park', 'Harbor Park', 'logisztikai'::building_type, 'A'::building_class, 'mukodo'::building_status, 'Csepeli átjáró', 'Budapest', 'XXI. kerület', 45000, 2019, 0.85);

INSERT INTO people (id, name, title, current_company_id, confidence)
VALUES
  ('pers_teszt_janos', 'Teszt János', 'Country Manager', 'comp_cbre_hu', 0.8),
  ('pers_minta_eva', 'Minta Éva', 'Head of Property Management', 'comp_jll_hu', 0.8);

INSERT INTO building_management (building_id, company_id, role, started_at, confidence)
VALUES
  ('bldg_millen_tower', 'comp_cbre_hu', 'fm'::management_role, '2020-01-01', 0.85),
  ('bldg_millen_tower', 'comp_jll_hu', 'pm'::management_role, '2021-06-01', 0.8),
  ('bldg_eiffel_palace', 'comp_cushwake_hu', 'pm'::management_role, '2019-03-01', 0.8),
  ('bldg_harbor_park', 'comp_cbre_hu', 'am'::management_role, '2022-01-01', 0.75);

INSERT INTO jobs (person_id, company_id, position_title, position_category, started_at, is_current, confidence)
VALUES
  ('pers_teszt_janos', 'comp_cbre_hu', 'Country Manager', 'country_manager'::position_category, '2018-03-01', true, 0.85),
  ('pers_minta_eva', 'comp_jll_hu', 'Head of Property Management', 'pm_director'::position_category, '2020-09-01', true, 0.8),
  ('pers_minta_eva', 'comp_cbre_hu', 'Senior Property Manager', 'pm_manager'::position_category, '2016-01-01', false, 0.75);
