/**
 * Date utility functions for formatting dates throughout the application
 */

// Helper function to parse date from various formats (same as in display.tsx)
export const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date(0);
  
  // Try DD/MM/YYYY format
  const dmyPattern = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/;
  const dmyMatch = dateStr.match(dmyPattern);
  if (dmyMatch) {
    return new Date(parseInt(dmyMatch[3]), parseInt(dmyMatch[2]) - 1, parseInt(dmyMatch[1]));
  }
  
  // Try YYYY-MM-DD format
  const ymdPattern = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;
  const ymdMatch = dateStr.match(ymdPattern);
  if (ymdMatch) {
    return new Date(parseInt(ymdMatch[1]), parseInt(ymdMatch[2]) - 1, parseInt(ymdMatch[3]));
  }
  
  // Default parse
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

/**
 * Format date for display in tables and cards
 * Converts: 2025-06-03 → June 3, 2025
 * @param dateStr - The date string to format
 * @returns Formatted date string or original if parsing fails
 */
export const formatDisplayDate = (dateStr: string): string => {
  const date = parseDate(dateStr);
  if (!date || isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format date as "Year Month Day" with short month name
 * Converts: 2025-06-03 → 2025 Jun 3
 * @param dateStr - The date string to format
 * @returns Formatted date string or original if parsing fails
 */
export const formatDisplayDateCompact = (dateStr: string): string => {
  const date = parseDate(dateStr);
  if (!date || isNaN(date.getTime())) return dateStr;

  return `${date.getFullYear()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getDate()}`;
};

/**
 * Format date for input[type="date"] value
 * @param date - The Date object to format
 * @returns Formatted date string as YYYY-MM-DD
 */
export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
