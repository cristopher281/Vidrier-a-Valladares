import React from 'react'

const DEFAULT_CATS = ['Todo', 'Vidrio templado', 'Vidrio laminado', 'Espejos', 'Mamparas', 'Vidrio y Herraje']

export default function CategoryFilter({ value, onChange, categories = DEFAULT_CATS }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: 8, borderRadius: 8 }} className="select">
      {categories.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  )
}
