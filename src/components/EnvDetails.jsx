import React, { useState } from 'react'
import HistoryTab from './HistoryTab'
import HealthTab from './HealthTab'
import UpdatePackage from './UpdatePackage'
import VersionHistory from './VersionHistory'
import AddAgentModal from './AddAgentModal'

export default function EnvDetails({ env, onUpdate }) {
  const [tab, setTab] = useState('details')
  const [showAddAgent, setShowAddAgent] = useState(false)

  if (!env) return null

  function addAgent(agent) {
    const updated = { ...env, agents: [...env.agents, agent] }
    onUpdate(updated)
    setShowAddAgent(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{env.name}</h2>
          <div className="text-sm text-gray-500">{env.agents.length} agents</div>
        </div>
        <div>
          <button className="mr-2 px-3 py-1 bg-green-600 text-white rounded">Create Update</button>
          <button onClick={()=>setShowAddAgent(true)} className="px-3 py-1 bg-indigo-600 text-white rounded">Add Agent</button>
        </div>
      </div>

      <nav className="mt-4 border-b">
        <ul className="flex gap-4">
          <li className={`pb-2 ${tab==='details'?'border-b-2 border-blue-600':''}`}><button onClick={()=>setTab('details')}>Overview</button></li>
          <li className={`pb-2 ${tab==='history'?'border-b-2 border-blue-600':''}`}><button onClick={()=>setTab('history')}>History</button></li>
          <li className={`pb-2 ${tab==='health'?'border-b-2 border-blue-600':''}`}><button onClick={()=>setTab('health')}>Health</button></li>
          <li className={`pb-2 ${tab==='updates'?'border-b-2 border-blue-600':''}`}><button onClick={()=>setTab('updates')}>Updates</button></li>
          <li className={`pb-2 ${tab==='versions'?'border-b-2 border-blue-600':''}`}><button onClick={()=>setTab('versions')}>Versions</button></li>
        </ul>
      </nav>

      <section className="mt-4">
        {tab==='details' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Agents</h3>
              <ul className="mt-2">
                {env.agents.map(a=> (
                  <li key={a.id} className="py-2 border-b">
                    <div className="flex justify-between"><div>{a.name}</div><div className="text-sm text-gray-500">{a.status}</div></div>
                    <div className="text-xs text-gray-400">{a.logs[a.logs.length-1]}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Quick Actions</h3>
              <div className="mt-2 text-sm text-gray-600">Create or trigger update packages, view version history, and add agents.</div>
            </div>
          </div>
        )}

        {tab==='history' && <HistoryTab env={env} />}
        {tab==='health' && <HealthTab env={env} onUpdate={onUpdate} />}
        {tab==='updates' && <UpdatePackage env={env} onUpdate={onUpdate} />}
        {tab==='versions' && <VersionHistory env={env} onUpdate={onUpdate} />}
      </section>

      {showAddAgent && <AddAgentModal onClose={()=>setShowAddAgent(false)} onAdd={addAgent} />}
    </div>
  )
}
