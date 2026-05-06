'use client'

import { Component } from 'react'
import { devWarn } from '../utils/safe'

export class CellErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    devWarn(`Cell render error${this.props.context ? ` in ${this.props.context}` : ''}`, error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <span style={{ color: '#d32f2f' }}>—</span>
    }
    return this.props.children
  }
}
