/**
 * Entity Admin Config - WEBAPP-SPECIFIC (change per project)
 * Defines which tables are editable and what columns to show/edit.
 */

export interface ColumnDef {
  key: string;
  label: string;
  type: "text" | "number" | "boolean" | "select" | "array" | "readonly" | "entity_lookup";
  options?: { value: string; label: string }[];
  // entity_lookup: fetch records from another table as a dropdown
  lookup?: {
    table: string;       // which table to fetch from
    labelField: string;  // field to show as display text
    valueField: string;  // field to save (usually "id")
  };
  searchable?: boolean;
  showInList?: boolean;
  showInEdit?: boolean;
  width?: string;
}

export interface TableConfig {
  table: string;
  label: string;
  labelPlural: string;
  nameField: string; // The field displayed as entity name
  columns: ColumnDef[];
}

export const tableConfigs: Record<string, TableConfig> = {
  companies: {
    table: "companies",
    label: "Cég",
    labelPlural: "Cégek",
    nameField: "name",
    columns: [
      { key: "id", label: "ID", type: "readonly", showInList: true, showInEdit: false, width: "w-32" },
      { key: "name", label: "Név", type: "text", searchable: true, showInList: true, showInEdit: true },
      { key: "description", label: "Leírás", type: "text", showInList: false, showInEdit: true },
      { key: "service_types", label: "Szolgáltatás típusok", type: "array", showInList: true, showInEdit: true },
      { key: "website", label: "Weboldal", type: "text", showInList: false, showInEdit: true },
      { key: "headquarters_city", label: "Város", type: "text", showInList: true, showInEdit: true },
      { key: "headquarters_address", label: "Cím", type: "text", showInList: false, showInEdit: true },
      { key: "founded_year", label: "Alapítás éve", type: "number", showInList: false, showInEdit: true },
      { key: "employee_count_estimate", label: "Létszám (becslés)", type: "number", showInList: false, showInEdit: true },
      { key: "is_international", label: "Nemzetközi", type: "boolean", showInList: true, showInEdit: true },
      {
        key: "status", label: "Státusz", type: "select", showInList: true, showInEdit: true,
        options: [
          { value: "active", label: "Aktív" },
          { value: "inactive", label: "Inaktív" },
          { value: "merged", label: "Összevonva" },
        ],
      },
      { key: "confidence", label: "Megbízhatóság", type: "number", showInList: true, showInEdit: true },
      { key: "created_at", label: "Létrehozva", type: "readonly", showInList: false, showInEdit: false },
    ],
  },

  buildings: {
    table: "buildings",
    label: "Ingatlan",
    labelPlural: "Ingatlanok",
    nameField: "name",
    columns: [
      { key: "id", label: "ID", type: "readonly", showInList: true, showInEdit: false, width: "w-32" },
      { key: "name", label: "Név", type: "text", searchable: true, showInList: true, showInEdit: true },
      { key: "description", label: "Leírás", type: "text", showInList: false, showInEdit: true },
      {
        key: "building_type", label: "Típus", type: "select", showInList: true, showInEdit: true,
        options: [
          { value: "iroda", label: "Iroda" },
          { value: "raktar", label: "Raktár" },
          { value: "logisztikai", label: "Logisztikai" },
          { value: "vegyes", label: "Vegyes" },
        ],
      },
      {
        key: "building_class", label: "Kategória", type: "select", showInList: true, showInEdit: true,
        options: [
          { value: "A+", label: "A+" },
          { value: "A", label: "A" },
          { value: "B+", label: "B+" },
          { value: "B", label: "B" },
          { value: "C", label: "C" },
        ],
      },
      {
        key: "status", label: "Státusz", type: "select", showInList: true, showInEdit: true,
        options: [
          { value: "mukodo", label: "Működő" },
          { value: "fejlesztes_alatt", label: "Fejlesztés alatt" },
          { value: "tervezett", label: "Tervezett" },
          { value: "felujitas_alatt", label: "Felújítás alatt" },
          { value: "ures", label: "Üres" },
        ],
      },
      { key: "address", label: "Cím", type: "text", showInList: true, showInEdit: true },
      { key: "city", label: "Város", type: "text", showInList: true, showInEdit: true },
      { key: "district", label: "Kerület", type: "text", showInList: false, showInEdit: true },
      { key: "zip_code", label: "Irányítószám", type: "text", showInList: false, showInEdit: true },
      { key: "total_area_sqm", label: "Összes terület (m2)", type: "number", showInList: false, showInEdit: true },
      { key: "leasable_area_sqm", label: "Bérelhető terület (m2)", type: "number", showInList: false, showInEdit: true },
      { key: "floors", label: "Szintek", type: "number", showInList: false, showInEdit: true },
      { key: "year_built", label: "Építési év", type: "number", showInList: false, showInEdit: true },
      { key: "year_renovated", label: "Felújítás éve", type: "number", showInList: false, showInEdit: true },
      { key: "confidence", label: "Megbízhatóság", type: "number", showInList: true, showInEdit: true },
    ],
  },

  people: {
    table: "people",
    label: "Személy",
    labelPlural: "Személyek",
    nameField: "name",
    columns: [
      { key: "id", label: "ID", type: "readonly", showInList: true, showInEdit: false, width: "w-32" },
      { key: "name", label: "Név", type: "text", searchable: true, showInList: true, showInEdit: true },
      { key: "title", label: "Pozíció", type: "text", showInList: true, showInEdit: true },
      {
        key: "current_company_id",
        label: "Munkáltató cég",
        type: "entity_lookup",
        showInList: true,
        showInEdit: true,
        lookup: { table: "companies", labelField: "name", valueField: "id" },
      },
      { key: "bio", label: "Bio", type: "text", showInList: false, showInEdit: true },
      { key: "linkedin_url", label: "LinkedIn", type: "text", showInList: false, showInEdit: true },
      { key: "email", label: "Email", type: "text", showInList: false, showInEdit: true },
      { key: "phone", label: "Telefon", type: "text", showInList: false, showInEdit: true },
      { key: "confidence", label: "Megbízhatóság", type: "number", showInList: true, showInEdit: true },
    ],
  },
};

export function getTableConfig(table: string): TableConfig | undefined {
  return tableConfigs[table];
}

export function getAvailableTables(): { value: string; label: string }[] {
  return Object.values(tableConfigs).map((c) => ({
    value: c.table,
    label: c.labelPlural,
  }));
}
