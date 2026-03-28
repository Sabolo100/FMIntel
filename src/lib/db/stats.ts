import { supabase } from '../supabase';

export const revalidate = 0;

export interface DashboardStats {
  companiesCount: number;
  buildingsCount: number;
  peopleCount: number;
  changesThisMonth: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const defaultStats: DashboardStats = {
    companiesCount: 0,
    buildingsCount: 0,
    peopleCount: 0,
    changesThisMonth: 0,
  };

  try {
    const [companiesRes, buildingsRes, peopleRes, changesRes] = await Promise.all([
      supabase.from('companies').select('id', { count: 'exact', head: true }),
      supabase.from('buildings').select('id', { count: 'exact', head: true }),
      supabase.from('people').select('id', { count: 'exact', head: true }),
      supabase
        .from('changes')
        .select('id', { count: 'exact', head: true })
        .gte(
          'detected_at',
          new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
        ),
    ]);

    if (companiesRes.error) {
      console.error('Error fetching companies count:', companiesRes.error);
    }
    if (buildingsRes.error) {
      console.error('Error fetching buildings count:', buildingsRes.error);
    }
    if (peopleRes.error) {
      console.error('Error fetching people count:', peopleRes.error);
    }
    if (changesRes.error) {
      console.error('Error fetching changes count:', changesRes.error);
    }

    return {
      companiesCount: companiesRes.count ?? 0,
      buildingsCount: buildingsRes.count ?? 0,
      peopleCount: peopleRes.count ?? 0,
      changesThisMonth: changesRes.count ?? 0,
    };
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    return defaultStats;
  }
}
