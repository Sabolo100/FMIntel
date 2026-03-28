import { supabase } from '../supabase';
import type { Building, BuildingManagement, BuildingType, BuildingClass, BuildingStatus, Company } from '../types';

export const revalidate = 0;

export async function getBuildings(filters?: {
  buildingType?: BuildingType;
  buildingClass?: BuildingClass;
  status?: BuildingStatus;
  city?: string;
}): Promise<Building[]> {
  try {
    let query = supabase.from('buildings').select('*');

    if (filters?.buildingType) {
      query = query.eq('building_type', filters.buildingType);
    }
    if (filters?.buildingClass) {
      query = query.eq('building_class', filters.buildingClass);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }

    const { data, error } = await query.order('name');

    if (error) {
      console.error('Error fetching buildings:', error);
      return [];
    }

    return (data as Building[]) || [];
  } catch (err) {
    console.error('Error fetching buildings:', err);
    return [];
  }
}

export async function getBuildingById(id: string): Promise<Building | null> {
  try {
    const { data, error } = await supabase
      .from('buildings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching building:', error);
      return null;
    }

    return data as Building;
  } catch (err) {
    console.error('Error fetching building:', err);
    return null;
  }
}

export async function getBuildingsByType(type: BuildingType): Promise<Building[]> {
  try {
    const { data, error } = await supabase
      .from('buildings')
      .select('*')
      .eq('building_type', type)
      .order('name');

    if (error) {
      console.error('Error fetching buildings by type:', error);
      return [];
    }

    return (data as Building[]) || [];
  } catch (err) {
    console.error('Error fetching buildings by type:', err);
    return [];
  }
}

export async function getBuildingManagement(
  buildingId: string
): Promise<(BuildingManagement & { company: Company })[]> {
  try {
    const { data, error } = await supabase
      .from('building_management')
      .select('*, company:companies(*)')
      .eq('building_id', buildingId)
      .order('is_current', { ascending: false });

    if (error) {
      console.error('Error fetching building management:', error);
      return [];
    }

    return (data as (BuildingManagement & { company: Company })[]) || [];
  } catch (err) {
    console.error('Error fetching building management:', err);
    return [];
  }
}

export async function searchBuildings(query: string): Promise<Building[]> {
  try {
    const { data, error } = await supabase
      .from('buildings')
      .select('*')
      .or(
        `name.ilike.%${query}%,address.ilike.%${query}%,city.ilike.%${query}%`
      )
      .order('name')
      .limit(50);

    if (error) {
      console.error('Error searching buildings:', error);
      return [];
    }

    return (data as Building[]) || [];
  } catch (err) {
    console.error('Error searching buildings:', err);
    return [];
  }
}
