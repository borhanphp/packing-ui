import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { devWarn } from '../utils/safe'

const PREFIX = 'clutch-grid:'
const VIEWS_SUFFIX = ':views'
const VERSION = 1

const newId = () => 'v_' + Math.random().toString(36).slice(2, 10)

function storageKey(key) {
  return PREFIX + key + VIEWS_SUFFIX
}

export function loadViewsCollection(persistKey) {
  if (!persistKey) return null
  if (typeof window === 'undefined' || !window.localStorage) return null
  try {
    const raw = window.localStorage.getItem(storageKey(persistKey))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || parsed.version !== VERSION) return null
    if (!parsed.views || typeof parsed.views !== 'object') return null
    return parsed
  } catch (err) {
    devWarn('Failed to load saved views', err)
    return null
  }
}

function saveViewsCollection(persistKey, collection) {
  if (!persistKey) return
  if (typeof window === 'undefined' || !window.localStorage) return
  try {
    window.localStorage.setItem(storageKey(persistKey), JSON.stringify(collection))
  } catch (err) {
    devWarn('Failed to persist saved views', err)
  }
}

export function useSavedViews(persistKey, legacySnapshot) {
  const [state, setState] = useState(() => {
    const existing = loadViewsCollection(persistKey)
    if (existing && Object.keys(existing.views).length > 0) return existing
    if (legacySnapshot) {
      const id = newId()
      return {
        version: VERSION,
        views: { [id]: { id, name: 'Default', snapshot: legacySnapshot } },
        currentId: id, defaultId: id,
      }
    }
    return { version: VERSION, views: {}, currentId: null, defaultId: null }
  })

  useEffect(() => { saveViewsCollection(persistKey, state) }, [persistKey, state])

  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])

  const saveCurrent = useCallback((snapshot) => {
    setState((prev) => {
      if (!prev.currentId || !prev.views[prev.currentId]) {
        const id = newId()
        return {
          ...prev,
          views: { ...prev.views, [id]: { id, name: 'Default', snapshot } },
          currentId: id, defaultId: prev.defaultId ?? id,
        }
      }
      return {
        ...prev,
        views: { ...prev.views, [prev.currentId]: { ...prev.views[prev.currentId], snapshot } },
      }
    })
  }, [])

  const saveAs = useCallback((name, snapshot) => {
    const trimmed = name.trim() || 'Untitled view'
    const id = newId()
    setState((prev) => ({
      ...prev,
      views: { ...prev.views, [id]: { id, name: trimmed, snapshot } },
      currentId: id, defaultId: prev.defaultId ?? id,
    }))
    return id
  }, [])

  const rename = useCallback((id, name) => {
    const trimmed = name.trim()
    if (!trimmed) return
    setState((prev) => {
      if (!prev.views[id]) return prev
      return { ...prev, views: { ...prev.views, [id]: { ...prev.views[id], name: trimmed } } }
    })
  }, [])

  const remove = useCallback((id) => {
    setState((prev) => {
      if (!prev.views[id]) return prev
      const remaining = { ...prev.views }
      delete remaining[id]
      const remainingIds = Object.keys(remaining)
      if (remainingIds.length === 0) {
        return { ...prev, views: {}, currentId: null, defaultId: null }
      }
      return {
        ...prev, views: remaining,
        currentId: prev.currentId === id ? remainingIds[0] : prev.currentId,
        defaultId: prev.defaultId === id ? remainingIds[0] : prev.defaultId,
      }
    })
  }, [])

  const setCurrent = useCallback((id) => {
    const view = stateRef.current.views[id]
    if (!view) return null
    setState((prev) => (prev.currentId === id ? prev : { ...prev, currentId: id }))
    return view
  }, [])

  const setDefault = useCallback((id) => {
    setState((prev) => {
      if (id != null && !prev.views[id]) return prev
      return { ...prev, defaultId: id }
    })
  }, [])

  const viewsList = useMemo(
    () => Object.values(state.views).sort((a, b) => a.name.localeCompare(b.name)),
    [state.views],
  )

  const currentView = state.currentId ? state.views[state.currentId] ?? null : null
  const defaultView = state.defaultId ? state.views[state.defaultId] ?? null : null

  return {
    viewsList, currentId: state.currentId, defaultId: state.defaultId,
    currentView, defaultView, saveCurrent, saveAs, rename, remove, setCurrent, setDefault,
  }
}
