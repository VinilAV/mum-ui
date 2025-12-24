import React, { useState, useEffect } from 'react'
import EnvList from './components/EnvList'
import EnvDetails from './components/EnvDetails'
import { loadEnvs, saveEnvs } from './storage'

const initialEnvs = [
  {
    id: 'env-1',
    name: 'Staging',
    agents: [
      { id: 'a1', name: 'agent-1', status: 'healthy', logs: ['Started', 'OK'] },
      { id: 'a2', name: 'agent-2', status: 'degraded', logs: ['Error connecting'] }
    ],
    history: [],
    versions: [{ v: '1.2.0', notes: 'Minor fixes' }]
  },
  {
    id: 'env-2',
    name: 'Production',
    agents: [{ id: 'a3', name: 'agent-3', status: 'healthy', logs: ['Running OK'] }],
    history: [],
    versions: [{ v: '1.1.0', notes: 'Initial release' }]
  }
]

export default function App() {
  const [envs, setEnvs] = useState(() => loadEnvs() || initialEnvs)
  const [selectedId, setSelectedId] = useState(() => {
    const saved = localStorage.getItem('dashboard:selected')
    return saved || (loadEnvs()?.[0]?.id) || (initialEnvs[0] && initialEnvs[0].id)
  })

  useEffect(() => {
    if (!envs.find(e => e.id === selectedId)) setSelectedId(envs[0]?.id)
  }, [envs, selectedId])

  useEffect(() => saveEnvs(envs), [envs])
  useEffect(() => { try{ localStorage.setItem('dashboard:selected', selectedId) }catch(e){} }, [selectedId])

  function addEnvironment(name) {
    const id = 'env-' + Date.now()
    setEnvs(prev => [...prev, { id, name, agents: [], history: [], versions: [] }])
    setSelectedId(id)
  }

  function updateEnv(updated) {
    setEnvs(prev => prev.map(e => (e.id === updated.id ? updated : e)))
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <aside className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold">Environments</h1>
        </div>
        <EnvList envs={envs} onSelect={setSelectedId} onAdd={addEnvironment} selectedId={selectedId} />
      </aside>
      <main className="flex-1 p-6">
        {selectedId ? (
          <EnvDetails env={envs.find(e => e.id === selectedId)} onUpdate={updateEnv} />
        ) : (
          <div>Select an environment</div>
        )}
      </main>
    </div>
  )
}
