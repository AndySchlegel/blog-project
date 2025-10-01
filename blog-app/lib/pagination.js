// Hilfsfunktion zur Erzeugung konsistenter Pagination-Antworten
export function buildPagination ({ page = 1, limit = 10, total = 0 }) {
  const currentPage = Number(page)
  const perPage = Number(limit)
  const totalPages = Math.max(1, Math.ceil(total / perPage) || 1)

  return {
    page: currentPage,
    limit: perPage,
    total,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  }
}

export function parsePaginationParams (request, defaults = { page: 1, limit: 10 }) {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page')) || defaults.page
  const limit = Math.min(Number(url.searchParams.get('limit')) || defaults.limit, 100)

  return { page, limit }
}
