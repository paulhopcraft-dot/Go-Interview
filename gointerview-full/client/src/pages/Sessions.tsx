import React from 'react'
import { api } from '../api'
import SessionCard from '../components/SessionCard'

export default function Sessions() {
  const [items, setItems] = React.useState<any[]>([])
  const [title, setTitle] = React.useState('Senior Vet Interview')
  const [candidate, setCandidate] = React.useState('Jane Worker')
  const [position, setPosition] = React.useState('Veterinarian')

  const refresh = async () => {
    const d = await api('/api/interviews')
    setItems(d.items)
  }
  React.useEffect(() => { refresh() }, [])

  const create = async () => {
    await api('/api/interviews', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ title, candidateName:candidate, position, tags:['CAB0'] })
    })
    await refresh()
  }
  const start = async (id:string) => { await api(`/api/interviews/${id}/start`, { method:'POST' }); await refresh() }
  const send = async (id:string, text:string) => {
    await api(`/api/interviews/${id}/message`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ text }) })
    await refresh()
  }

  return (
    <div>
      <h2>Sessions</h2>
      <div style={{ display:'flex', gap:8, margin:'8px 0 16px' }}>
        <input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder='Candidate' value={candidate} onChange={e=>setCandidate(e.target.value)} />
        <input placeholder='Position' value={position} onChange={e=>setPosition(e.target.value)} />
        <button onClick={create}>Create</button>
      </div>
      <div>
        {items.map(s => (
          <div key={s.id}>
            <SessionCard s={s} onSend={send} />
            {s.status !== 'running' && <button onClick={()=>start(s.id)}>Start</button>}
          </div>
        ))}
      </div>
    </div>
  )
}
