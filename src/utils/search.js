/** Lightweight case-insensitive search: every word in the query must appear somewhere in the fields. */
export function matchesQuery(query, fields) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return true
  const haystack = fields.filter(Boolean).join(' ').toLowerCase()
  return words.every((w) => haystack.includes(w))
}
