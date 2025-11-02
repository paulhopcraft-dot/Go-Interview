import React from 'react'
import { api } from '../api'

export default function CAB() {
  const [report, setReport] = React.useState<any>(null)
  const [sessionId, setSessionId] = React.useState('')
  const [cohort, setCohort] = React.useState('CAB0')

  const load = async () => { const d = await api('/api/cab/report'); setReport(d) }
  React.useEffect(()=>{ load() }, [])

  const assign = async () => {
    await api('/api/cab/assign', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ sessionId, cohort }) })
    await load()
  }

  return (
    <div>
      <h2>CAB Cohorts</h2>
      {report && <pre style={{ background:'#f7f7f7', padding:12 }}>{JSON.stringify(report, null, 2)}</pre>}
      <div style={{ display:'flex', gap:8 }}>
        <input placeholder='Session ID' value={sessionId} onChange={e=>setSessionId(e.target.value)} />
        <select value={cohort} onChange={e=>setCohort(e.target.value)}>
          <option value='CAB0'>CAB0</option>
          <option value='CAB1'>CAB1</option>
          <option value='CAB2'>CAB2</option>
        </select>
        <button onClick={assign}>Assign</button>
      </div>
    </div>
  )
}
