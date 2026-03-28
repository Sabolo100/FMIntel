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
  short_name: string | null;
  service_types: ServiceType[];
  website: string | null;
  headquarters_city: string | null;
  headquarters_address: string | null;
  country: string | null;
  founded_year: number | null;
  employee_count_estimate: number | null;
  description: string | null;
  logo_url: string | null;
  is_active: boolean;
  confidence_score: number;
  data_source: string | null;
  source_urls: string[] | null;
  last_verified_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string | null;
  postal_code: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  building_type: BuildingType;
  building_class: BuildingClass | null;
  status: BuildingStatus;
  gla_sqm: number | null;
  floors_above: number | null;
  floors_below: number | null;
  year_built: number | null;
  year_renovated: number | null;
  parking_spaces: number | null;
  certifications: string[] | null;
  owner_company_id: string | null;
  developer_company_id: string | null;
  description: string | null;
  image_url: string | null;
  confidence_score: number;
  data_source: string | null;
  source_urls: string[] | null;
  last_verified_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Person {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
  current_company_id: string | null;
  current_position: string | null;
  position_category: PositionCategory | null;
  bio: string | null;
  is_active: boolean;
  confidence_score: number;
  data_source: string | null;
  source_urls: string[] | null;
  last_verified_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  person_id: string;
  company_id: string;
  position_title: string;
  position_category: PositionCategory | null;
  department: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  confidence_score: number;
  data_source: string | null;
  source_urls: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BuildingManagement {
  id: string;
  building_id: string;
  company_id: string;
  management_role: ManagementRole;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  contract_type: string | null;
  confidence_score: number;
  data_source: string | null;
  source_urls: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompanyRelation {
  id: string;
  parent_company_id: string;
  child_company_id: string;
  relation_type: string;
  ownership_percentage: number | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  confidence_score: number;
  data_source: string | null;
  source_urls: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Change {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  change_type: ChangeType;
  field_name: string | null;
  old_value: string | null;
  new_value: string | null;
  change_summary: string | null;
  detected_at: string;
  source_url: string | null;
  data_source: string | null;
  confidence_score: number;
  is_reviewed: boolean;
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
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
