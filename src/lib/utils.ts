import type {
  ServiceType,
  BuildingType,
  BuildingClass,
  BuildingStatus,
  PositionCategory,
  ChangeType,
} from './types';

export const serviceTypeLabels: Record<ServiceType, string> = {
  fm: 'Facility Management',
  pm: 'Property Management',
  am: 'Asset Management',
};

export const buildingTypeLabels: Record<BuildingType, string> = {
  iroda: 'Iroda',
  raktar: 'Raktár',
  logisztikai: 'Logisztikai',
  vegyes: 'Vegyes használatú',
};

export const buildingClassLabels: Record<BuildingClass, string> = {
  'A+': 'A+ kategória',
  'A': 'A kategória',
  'B+': 'B+ kategória',
  'B': 'B kategória',
  'C': 'C kategória',
};

export const buildingStatusLabels: Record<BuildingStatus, string> = {
  mukodo: 'Működő',
  fejlesztes_alatt: 'Fejlesztés alatt',
  tervezett: 'Tervezett',
  felujitas_alatt: 'Felújítás alatt',
  ures: 'Üres',
};

export const positionCategoryLabels: Record<PositionCategory, string> = {
  ceo: 'Vezérigazgató (CEO)',
  coo: 'Operatív igazgató (COO)',
  cfo: 'Pénzügyi igazgató (CFO)',
  cto: 'Technológiai igazgató (CTO)',
  fm_director: 'FM igazgató',
  pm_director: 'PM igazgató',
  am_director: 'AM igazgató',
  fm_manager: 'FM menedzser',
  pm_manager: 'PM menedzser',
  am_manager: 'AM menedzser',
  regional_director: 'Regionális igazgató',
  country_manager: 'Országigazgató',
  head_of_operations: 'Üzemeltetési vezető',
  head_of_technical: 'Műszaki vezető',
  board_member: 'Igazgatósági tag',
  partner: 'Partner',
  business_development: 'Üzletfejlesztés',
  leasing_manager: 'Bérbeadási menedzser',
  other: 'Egyéb',
};

export const changeTypeLabels: Record<ChangeType, string> = {
  new_entity: 'Új entitás',
  updated_entity: 'Frissített entitás',
  new_management: 'Új kezelési szerződés',
  ended_management: 'Megszűnt kezelés',
  personnel_move: 'Személyi változás',
  company_relation: 'Cégkapcsolat változás',
  data_correction: 'Adatjavítás',
};

export function confidenceLevel(score: number): { label: string; color: string } {
  if (score >= 0.9) {
    return { label: 'Nagyon magas', color: 'text-green-700 bg-green-100' };
  }
  if (score >= 0.7) {
    return { label: 'Magas', color: 'text-emerald-700 bg-emerald-100' };
  }
  if (score >= 0.5) {
    return { label: 'Közepes', color: 'text-yellow-700 bg-yellow-100' };
  }
  if (score >= 0.3) {
    return { label: 'Alacsony', color: 'text-orange-700 bg-orange-100' };
  }
  return { label: 'Nagyon alacsony', color: 'text-red-700 bg-red-100' };
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function formatArea(sqm: number | null): string {
  if (sqm === null || sqm === undefined) return '—';
  const formatted = sqm.toLocaleString('hu-HU');
  return `${formatted} m\u00B2`;
}
