import React, { useState } from 'react'

export default function AddAgentModal({ onClose, onAdd }) {
  const [name, setName] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ id: 'ag-' + Date.now(), name: name.trim(), status: 'healthy', logs: ['Created'] })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96">
        <h3 className="font-semibold">Add Agent</h3>
        <form onSubmit={submit} className="mt-3">
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full border px-2 py-1 rounded" placeholder="Agent name" />
          <div className="mt-3 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}
