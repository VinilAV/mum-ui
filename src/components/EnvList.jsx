import React, { useState } from 'react'

export default function EnvList({ envs, onSelect, onAdd, selectedId }) {
  const [name, setName] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name.trim())
    setName('')
  }

  return (
    <div>
      <ul>
        {envs.map(env => (
          <li key={env.id} className={`p-3 cursor-pointer border-b ${env.id===selectedId? 'bg-gray-100':''}`} onClick={() => onSelect(env.id)}>
            <div className="font-medium">{env.name}</div>
            <div className="text-xs text-gray-500">{env.agents.length} agents</div>
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="p-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="New environment" className="w-full border px-2 py-1 rounded" />
        <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded">Add</button>
      </form>
    </div>
  )
}
