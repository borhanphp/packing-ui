import { safeString } from './safe'

function escapeCsvCell(value) {
  const s = safeString(value)
  if (/[",\r\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

export function rowsToCsv(columns, rows) {
  const visible = columns.filter((c) => !c.hidden)
  const header = visible.map((c) => escapeCsvCell(c.header)).join(',')
  const body = rows
    .map((row) =>
      visible
        .map((col) => {
          try {
            const value = col.valueGetter ? col.valueGetter(row) : row[col.key]
            return escapeCsvCell(value)
          } catch {
            return ''
          }
        })
        .join(','),
    )
    .join('\r\n')
  return `${header}\r\n${body}`
}

export function downloadCsv(filename, csv) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const safe = filename.replace(/[^a-z0-9._-]+/gi, '_') || 'export'
  const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = safe.endsWith('.csv') ? safe : `${safe}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
