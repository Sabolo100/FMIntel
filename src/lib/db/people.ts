import { supabase } from '../supabase';
import type { Person, Job, Company, PositionCategory } from '../types';

export const revalidate = 0;

export async function getPeople(filters?: {
  positionCategory?: PositionCategory;
  companyId?: string;
  search?: string;
}): Promise<Person[]> {
  try {
    let query = supabase.from('people').select('*');

    if (filters?.companyId) {
      query = query.eq('current_company_id', filters.companyId);
    }
    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, error } = await query.order('name');

    if (error) {
      console.error('Error fetching people:', error);
      return [];
    }

    return (data as Person[]) || [];
  } catch (err) {
    console.error('Error fetching people:', err);
    return [];
  }
}

export async function getPersonById(id: string): Promise<Person | null> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching person:', error);
      return null;
    }

    return data as Person;
  } catch (err) {
    console.error('Error fetching person:', err);
    return null;
  }
}

export async function getPersonJobs(
  personId: string
): Promise<(Job & { company: Company })[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, company:companies(*)')
      .eq('person_id', personId)
      .order('is_current', { ascending: false })
      .order('started_at', { ascending: false });

    if (error) {
      console.error('Error fetching person jobs:', error);
      return [];
    }

    return (data as (Job & { company: Company })[]) || [];
  } catch (err) {
    console.error('Error fetching person jobs:', err);
    return [];
  }
}

export async function searchPeople(query: string): Promise<Person[]> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .or(`name.ilike.%${query}%,title.ilike.%${query}%`)
      .order('name')
      .limit(50);

    if (error) {
      console.error('Error searching people:', error);
      return [];
    }

    return (data as Person[]) || [];
  } catch (err) {
    console.error('Error searching people:', err);
    return [];
  }
}
