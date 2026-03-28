import { supabase } from '../supabase';
import type { Change, EntityType, ChangeType } from '../types';

export const revalidate = 0;

export async function getRecentChanges(limit: number = 20): Promise<Change[]> {
  try {
    const { data, error } = await supabase
      .from('changes')
      .select('*')
      .order('detected_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent changes:', error);
      return [];
    }

    return (data as Change[]) || [];
  } catch (err) {
    console.error('Error fetching recent changes:', err);
    return [];
  }
}

export async function getChangesByEntity(
  entityType: EntityType,
  entityId: string
): Promise<Change[]> {
  try {
    const { data, error } = await supabase
      .from('changes')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('detected_at', { ascending: false });

    if (error) {
      console.error('Error fetching changes by entity:', error);
      return [];
    }

    return (data as Change[]) || [];
  } catch (err) {
    console.error('Error fetching changes by entity:', err);
    return [];
  }
}

export async function getChangesByType(
  changeType: ChangeType,
  limit: number = 20
): Promise<Change[]> {
  try {
    const { data, error } = await supabase
      .from('changes')
      .select('*')
      .eq('change_type', changeType)
      .order('detected_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching changes by type:', error);
      return [];
    }

    return (data as Change[]) || [];
  } catch (err) {
    console.error('Error fetching changes by type:', err);
    return [];
  }
}
