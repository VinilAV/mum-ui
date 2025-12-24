import React, { useState } from 'react'

export default function VersionHistory({ env, onUpdate }) {
  const [note, setNote] = useState('')

  function addVersion() {
    if (!note.trim()) return
    const v = { v: 'v.' + Date.now(), notes: note }
    const updated = { ...env, versions: [v, ...env.versions] }
    onUpdate(updated)
    setNote('')
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Product Versions</h3>
      <div className="mt-2 flex gap-2">
        <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Release or patch notes" className="flex-1 border px-2 py-1 rounded" />
        <button onClick={addVersion} className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
      </div>
      <ul className="mt-3">
        {env.versions.map((ver, idx)=> (
          <li key={idx} className="py-2 border-b">
            <div className="font-medium">{ver.v}</div>
            <div className="text-sm text-gray-600">{ver.notes}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
