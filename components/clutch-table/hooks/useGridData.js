import { useMemo } from 'react'
import {
  coerceDate,
  coerceNumber,
  defaultCompare,
  escapeRegex,
  isFiniteNumber,
  safeString,
} from '../utils/safe'

function getCellValue(row, col) {
  try {
    if (col.valueGetter) return col.valueGetter(row)
    return row[col.key]
  } catch {
    return undefined
  }
}

function matchesFilter(value, filter, columnType) {
  const { operator, value: fv, value2 } = filter
  if (operator === 'empty') return value == null || value === ''
  if (operator === 'notEmpty') return value != null && value !== ''

  if (columnType === 'number') {
    const n = coerceNumber(value)
    const target = coerceNumber(fv)
    if (operator === 'between') {
      const target2 = coerceNumber(value2)
      if (n == null || target == null || target2 == null) return false
      return n >= Math.min(target, target2) && n <= Math.max(target, target2)
    }
    if (n == null || target == null) return false
    switch (operator) {
      case 'equals': return n === target
      case 'gt': return n > target
      case 'gte': return n >= target
      case 'lt': return n < target
      case 'lte': return n <= target
      default: return false
    }
  }

  if (columnType === 'date') {
    const d = coerceDate(value)
    const target = coerceDate(fv)
    if (operator === 'between') {
      const target2 = coerceDate(value2)
      if (!d || !target || !target2) return false
      const t = d.getTime()
      return t >= Math.min(target.getTime(), target2.getTime()) && t <= Math.max(target.getTime(), target2.getTime())
    }
    if (!d || !target) return false
    switch (operator) {
      case 'equals': return d.toDateString() === target.toDateString()
      case 'gt': return d.getTime() > target.getTime()
      case 'gte': return d.getTime() >= target.getTime()
      case 'lt': return d.getTime() < target.getTime()
      case 'lte': return d.getTime() <= target.getTime()
      default: return false
    }
  }

  if (columnType === 'boolean') {
    const v = typeof value === 'boolean' ? value : value == null ? null : Boolean(value)
    return operator === 'equals' ? v === fv : true
  }

  if (operator === 'in' && Array.isArray(fv)) {
    const s = safeString(value)
    return fv.some((candidate) => safeString(candidate) === s)
  }

  const haystack = safeString(value).toLowerCase()
  const needle = safeString(fv).toLowerCase()
  if (needle === '') return true
  switch (operator) {
    case 'equals': return haystack === needle
    case 'contains': return haystack.includes(needle)
    case 'startsWith': return haystack.startsWith(needle)
    case 'endsWith': return haystack.endsWith(needle)
    default: return haystack.includes(needle)
  }
}

export function useGridData({
  rows,
  columns,
  globalSearch,
  filters,
  sortModel,
}) {
  const safeRows = useMemo(() => (Array.isArray(rows) ? rows : []), [rows])

  const searched = useMemo(() => {
    const q = globalSearch.trim().toLowerCase()
    if (!q) return safeRows
    const escaped = escapeRegex(q)
    const re = new RegExp(escaped, 'i')
    return safeRows.filter((row) =>
      columns.some((col) => {
        const value = getCellValue(row, col)
        return re.test(safeString(value))
      }),
    )
  }, [safeRows, columns, globalSearch])

  const filtered = useMemo(() => {
    const active = Object.entries(filters).filter(([, f]) => {
      if (!f) return false
      if (f.operator === 'empty' || f.operator === 'notEmpty') return true
      if (f.operator === 'between') return f.value != null && f.value2 != null
      if (f.operator === 'in') return Array.isArray(f.value) && f.value.length > 0
      return f.value !== undefined && f.value !== null && f.value !== ''
    })
    if (active.length === 0) return searched
    const colMap = new Map(columns.map((c) => [c.key, c]))
    return searched.filter((row) =>
      active.every(([key, filter]) => {
        const col = colMap.get(key)
        if (!col) return true
        const value = getCellValue(row, col)
        try {
          return matchesFilter(value, filter, col.type)
        } catch {
          return true
        }
      }),
    )
  }, [searched, filters, columns])

  const sorted = useMemo(() => {
    if (sortModel.length === 0) return filtered
    const colMap = new Map(columns.map((c) => [c.key, c]))
    const copy = [...filtered]
    copy.sort((a, b) => {
      for (const item of sortModel) {
        const col = colMap.get(item.key)
        if (!col) continue
        const av = getCellValue(a, col)
        const bv = getCellValue(b, col)
        const cmp = col.comparator
          ? safeCompare(col.comparator, av, bv)
          : defaultCompare(av, bv)
        if (cmp !== 0) return item.dir === 'asc' ? cmp : -cmp
      }
      return 0
    })
    return copy
  }, [filtered, sortModel, columns])

  return { processed: sorted, filteredCount: filtered.length, totalCount: safeRows.length }
}

function safeCompare(fn, a, b) {
  try {
    const result = fn(a, b)
    return isFiniteNumber(result) ? result : 0
  } catch {
    return 0
  }
}
