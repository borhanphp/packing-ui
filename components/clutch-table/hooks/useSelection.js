import { useCallback, useEffect, useMemo, useState } from 'react'

export function useSelection({ rows, getRowId, onChange }) {
  const [selected, setSelected] = useState(new Set())

  const rowIdMap = useMemo(() => {
    const map = new Map()
    for (const row of rows) {
      try {
        const id = getRowId(row)
        if (id == null) continue
        map.set(id, row)
      } catch {
        // skip invalid rows
      }
    }
    return map
  }, [rows, getRowId])

  useEffect(() => {
    setSelected((prev) => {
      if (prev.size === 0) return prev
      const next = new Set()
      for (const id of prev) {
        if (rowIdMap.has(id)) next.add(id)
      }
      if (next.size === prev.size) return prev
      return next
    })
  }, [rowIdMap])

  const selectedRows = useMemo(() => {
    const result = []
    for (const id of selected) {
      const row = rowIdMap.get(id)
      if (row) result.push(row)
    }
    return result
  }, [selected, rowIdMap])

  useEffect(() => {
    if (onChange) onChange(selectedRows)
  }, [selectedRows, onChange])

  const toggleRow = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleMany = useCallback((ids, shouldSelect) => {
    setSelected((prev) => {
      const next = new Set(prev)
      for (const id of ids) {
        if (shouldSelect) next.add(id)
        else next.delete(id)
      }
      return next
    })
  }, [])

  const clear = useCallback(() => setSelected(new Set()), [])
  const isSelected = useCallback((id) => selected.has(id), [selected])

  return {
    selected, selectedRows, toggleRow, toggleMany, clear, isSelected,
    count: selected.size,
  }
}
