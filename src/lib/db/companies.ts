import { supabase } from '../supabase';
import type { Company, Building, BuildingManagement, Job, Person, ServiceType } from '../types';

export const revalidate = 0;

export async function getCompanies(filters?: {
  serviceType?: ServiceType;
  search?: string;
  status?: boolean;
}): Promise<Company[]> {
  try {
    let query = supabase.from('companies').select('*');

    if (filters?.serviceType) {
      query = query.contains('service_types', [filters.serviceType]);
    }
    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }
    if (filters?.status !== undefined) {
      query = query.eq('status', filters.status ? 'active' : 'inactive');
    }

    const { data, error } = await query.order('name');

    if (error) {
      console.error('Error fetching companies:', error);
      return [];
    }

    return (data as Company[]) || [];
  } catch (err) {
    console.error('Error fetching companies:', err);
    return [];
  }
}

export async function getCompanyById(id: string): Promise<Company | null> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching company:', error);
      return null;
    }

    return data as Company;
  } catch (err) {
    console.error('Error fetching company:', err);
    return null;
  }
}

export async function getCompaniesByServiceType(type: ServiceType): Promise<Company[]> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .contains('service_types', [type])
      .order('name');

    if (error) {
      console.error('Error fetching companies by service type:', error);
      return [];
    }

    return (data as Company[]) || [];
  } catch (err) {
    console.error('Error fetching companies by service type:', err);
    return [];
  }
}

export async function getCompanyBuildings(
  companyId: string
): Promise<(BuildingManagement & { building: Building })[]> {
  try {
    const { data, error } = await supabase
      .from('building_management')
      .select('*, building:buildings(*)')
      .eq('company_id', companyId)
      .order('ended_at', { ascending: true, nullsFirst: true });

    if (error) {
      console.error('Error fetching company buildings:', error);
      return [];
    }

    return (data as (BuildingManagement & { building: Building })[]) || [];
  } catch (err) {
    console.error('Error fetching company buildings:', err);
    return [];
  }
}

export async function getCompanyPeople(
  companyId: string
): Promise<(Job & { person: Person })[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, person:people(*)')
      .eq('company_id', companyId)
      .order('is_current', { ascending: false });

    if (error) {
      console.error('Error fetching company people:', error);
      return [];
    }

    return (data as (Job & { person: Person })[]) || [];
  } catch (err) {
    console.error('Error fetching company people:', err);
    return [];
  }
}

export async function searchCompanies(query: string): Promise<Company[]> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .or(
        `name.ilike.%${query}%,description.ilike.%${query}%`
      )
      .order('name')
      .limit(50);

    if (error) {
      console.error('Error searching companies:', error);
      return [];
    }

    return (data as Company[]) || [];
  } catch (err) {
    console.error('Error searching companies:', err);
    return [];
  }
}
