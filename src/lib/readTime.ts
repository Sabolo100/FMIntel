/**
 * Calculates estimated reading time based on word count.
 * Uses an average reading speed of 200 words per minute,
 * which is appropriate for the 45-60 age group target audience.
 *
 * @param wordCount - Number of words in the article
 * @param wordsPerMinute - Reading speed (default: 200 wpm)
 * @returns Formatted Hungarian string, e.g. "8 perc"
 */
export function calculateReadTime(
  wordCount: number,
  wordsPerMinute: number = 200
): string {
  if (wordCount <= 0) return "1 perc";
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} perc`;
}
