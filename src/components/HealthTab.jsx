import React, { useState } from 'react'

export default function HealthTab({ env, onUpdate }) {
  const [refreshTick, setRefreshTick] = useState(0)

  function toggleAgent(agentId) {
    const updated = { ...env, agents: env.agents.map(a=> a.id===agentId? {...a, status: a.status==='healthy'?'degraded':'healthy'}:a) }
    onUpdate(updated)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Health</h3>
        <div>
          <button onClick={()=>setRefreshTick(t=>t+1)} className="px-2 py-1 border rounded mr-2">Refresh</button>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>
      <ul className="mt-3">
        {env.agents.map(a=> (
          <li key={a.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <div className="font-medium">{a.name}</div>
              <div className="text-xs text-gray-500">Status: {a.status}</div>
            </div>
            <div>
              <button onClick={()=>toggleAgent(a.id)} className="px-2 py-1 bg-yellow-500 rounded text-white text-sm">Toggle</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
