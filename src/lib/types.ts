export type ServiceType = 'fm' | 'pm' | 'am';
export type BuildingType = 'iroda' | 'raktar' | 'logisztikai' | 'vegyes';
export type BuildingClass = 'A+' | 'A' | 'B+' | 'B' | 'C';
export type BuildingStatus = 'mukodo' | 'fejlesztes_alatt' | 'tervezett' | 'felujitas_alatt' | 'ures';
export type ManagementRole = 'fm' | 'pm' | 'am';
export type EntityType = 'company' | 'building' | 'person';
export type ChangeType = 'new_entity' | 'updated_entity' | 'new_management' | 'ended_management' | 'personnel_move' | 'company_relation' | 'data_correction';
export type PositionCategory =
  | 'ceo'
  | 'coo'
  | 'cfo'
  | 'cto'
  | 'fm_director'
  | 'pm_director'
  | 'am_director'
  | 'fm_manager'
  | 'pm_manager'
  | 'am_manager'
  | 'regional_director'
  | 'country_manager'
  | 'head_of_operations'
  | 'head_of_technical'
  | 'board_member'
  | 'partner'
  | 'business_development'
  | 'leasing_manager'
  | 'other';
export type MatchStatus = 'pending' | 'approved' | 'rejected' | 'merged';

export interface Company {
  id: string;
  name: string;
  name_aliases: string[];
  service_types: ServiceType[];
  description: string | null;
  website: string | null;
  headquarters_city: string | null;
  headquarters_address: string | null;
  founded_year: number | null;
  employee_count_estimate: number | null;
  is_international: boolean;
  parent_company_id: string | null;
  logo_url: string | null;
  confidence: number;
  source_urls: string[];
  status: string;
  created_at: string;
  updated_at: string;
  first_seen_at: string;
  last_confirmed_at: string;
}

export interface Building {
  id: string;
  name: string;
  name_aliases: string[];
  building_type: BuildingType;
  building_class: BuildingClass | null;
  status: BuildingStatus;
  address: string | null;
  city: string;
  district: string | null;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  total_area_sqm: number | null;
  leasable_area_sqm: number | null;
  floors: number | null;
  year_built: number | null;
  year_renovated: number | null;
  owner_company_id: string | null;
  developer_company_id: string | null;
  description: string | null;
  image_url: string | null;
  confidence: number;
  source_urls: string[];
  created_at: string;
  updated_at: string;
  first_seen_at: string;
  last_confirmed_at: string;
}

export interface Person {
  id: string;
  name: string;
  name_normalized: string | null;
  title: string | null;
  current_company_id: string | null;
  linkedin_url: string | null;
  email: string | null;
  phone: string | null;
  photo_url: string | null;
  bio: string | null;
  confidence: number;
  source_urls: string[];
  created_at: string;
  updated_at: string;
  first_seen_at: string;
  last_confirmed_at: string;
}

export interface Job {
  id: string;
  person_id: string;
  company_id: string;
  position_title: string;
  position_category: PositionCategory | null;
  started_at: string | null;
  ended_at: string | null;
  is_current: boolean;
  confidence: number;
  source_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface BuildingManagement {
  id: string;
  building_id: string;
  company_id: string;
  role: ManagementRole;
  started_at: string | null;
  ended_at: string | null;
  contract_type: string | null;
  confidence: number;
  source_urls: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyRelation {
  id: string;
  parent_company_id: string;
  child_company_id: string;
  relation_type: string;
  effective_from: string | null;
  effective_to: string | null;
  confidence: number;
  source_urls: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Change {
  id: number;
  change_type: ChangeType;
  entity_type: EntityType;
  entity_id: string;
  entity_name: string | null;
  summary: string | null;
  details: Record<string, unknown> | null;
  related_entity_type: EntityType | null;
  related_entity_id: string | null;
  related_entity_name: string | null;
  confidence: number;
  source_urls: string[];
  created_at: string;
}

export interface NewsMention {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  article_title: string;
  article_url: string;
  source_name: string | null;
  published_at: string | null;
  snippet: string | null;
  sentiment: string | null;
  relevance_score: number | null;
  match_status: MatchStatus;
  matched_by: string | null;
  matched_at: string | null;
  notes: string | null;
  created_at: string;
}
