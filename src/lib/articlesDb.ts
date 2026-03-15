import { supabase } from "./supabase";
import type { Article, ArticleType, ArticleStyle } from "@/data/articles";

// Supabase stores ASCII difficulty values; Article type uses Hungarian diacritics
const difficultyMap: Record<string, Article["difficulty"]> = {
  kezdo: "kezdő",
  kozephalado: "középhaladó",
  halado: "haladó",
};

/**
 * Map Supabase snake_case row to camelCase Article type.
 */
function mapRow(row: Record<string, unknown>): Article {
  const rawDifficulty = row.difficulty as string | undefined;
  return {
    id: row.id as string,
    type: row.type as ArticleType,
    style: row.style as ArticleStyle,
    category: row.category as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    wordCount: (row.word_count as number) || 0,
    date: row.date as string,
    categoryColor: (row.category_color as string) || "",
    badge: row.badge as { label: string; className: string } | null,
    priceBadge: row.price_badge as Article["priceBadge"],
    featured: (row.featured as boolean) || false,
    recoveryTime: row.recovery_time as Article["recoveryTime"],
    isNew: (row.is_new as boolean) || false,
    intensityZone: row.intensity_zone as Article["intensityZone"],
    ageBadge: row.age_badge as Article["ageBadge"],
    gearLevel: row.gear_level as Article["gearLevel"],
    content: row.content as string[] | undefined,
    weeksDuration: row.weeks_duration as number | undefined,
    sessionsPerWeek: row.sessions_per_week as number | undefined,
    difficulty: rawDifficulty ? (difficultyMap[rawDifficulty] ?? rawDifficulty as Article["difficulty"]) : undefined,
  };
}

/**
 * Fetch all articles from Supabase.
 */
export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
  return (data || []).map(mapRow);
}

/**
 * Fetch a single article by its ID (slug).
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch article:", error);
    return null;
  }
  return data ? mapRow(data) : null;
}

/**
 * Fetch articles by type (cikk, edzesterv, felszereles).
 */
export async function getArticlesByType(type: ArticleType): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("type", type)
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles by type:", error);
    return [];
  }
  return (data || []).map(mapRow);
}

/**
 * Fetch featured articles.
 */
export async function getFeaturedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("featured", true)
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to fetch featured articles:", error);
    return [];
  }
  return (data || []).map(mapRow);
}

/**
 * Fetch articles by style (orszaguti, mtb, ciklokrossz, altalanos).
 */
export async function getArticlesByStyle(style: ArticleStyle): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("style", style)
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles by style:", error);
    return [];
  }
  return (data || []).map(mapRow);
}
