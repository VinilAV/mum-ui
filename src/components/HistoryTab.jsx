import React from 'react'

export default function HistoryTab({ env }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Update History</h3>
      <div className="mt-2 text-sm text-gray-600">Showing update status and agent logs per update.</div>
      <ul className="mt-3">
        {env.history.length===0 && <li className="py-2 text-gray-500">No history yet</li>}
        {env.history.map(h => (
          <li key={h.id} className="border p-3 my-2 rounded">
            <div className="flex justify-between"><div className="font-medium">{h.title}</div><div className="text-sm text-gray-500">{h.status}</div></div>
            <div className="mt-2 text-xs">
              {h.agentLogs?.map(al => (
                <div key={al.agentId} className="py-1 border-t">
                  <div className="text-sm">{al.agentName} — <span className="text-gray-500">{al.status}</span></div>
                  <pre className="text-xs text-gray-600">{al.logs.join('\n')}</pre>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
