import React, { useState, useEffect } from 'react'

export default function UpdatePackage({ env, onUpdate }) {
  const [packages, setPackages] = useState([])
  const [creating, setCreating] = useState(false)

  function createPackage() {
    const p = { id: 'pkg-' + Date.now(), title: 'Update ' + Date.now(), status: 'pending', progress: 0 }
    setPackages(prev => [p, ...prev])
    setCreating(true)
  }

  useEffect(()=>{
    if (!creating) return
    const t = setInterval(()=>{
      setPackages(prev => prev.map(p=>{
        if (p.status==='done') return p
        const next = Math.min(100, p.progress + Math.floor(Math.random()*30))
        const status = next>=100? 'done' : 'running'
        return {...p, progress: next, status}
      }))
    }, 800)
    return ()=>clearInterval(t)
  }, [creating])

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Update Packages</h3>
        <button onClick={createPackage} className="px-3 py-1 bg-blue-600 text-white rounded">Create & Trigger</button>
      </div>
      <ul className="mt-3">
        {packages.length===0 && <li className="text-gray-500">No packages</li>}
        {packages.map(p=> (
          <li key={p.id} className="py-2 border-b">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-500">{p.status}</div>
              </div>
              <div className="w-1/3">
                <div className="h-2 bg-gray-200 rounded">
                  <div style={{width: p.progress + '%'}} className="h-2 bg-green-500 rounded" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
