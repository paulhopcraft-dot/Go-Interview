import React from 'react'
import { api } from '../api'

export default function Scheduler() {
  const [title, setTitle] = React.useState('GoInterview: Candidate Screen')
  const [start, setStart] = React.useState(new Date(Date.now()+3600_000).toISOString().slice(0,16))
  const [duration, setDuration] = React.useState(30)
  const [emails, setEmails] = React.useState('candidate@example.com, hiring@company.com')
  const [provider, setProvider] = React.useState<'google'|'zoom'>('google')
  const [result, setResult] = React.useState<any>(null)

  const submit = async () => {
    const attendees = emails.split(',').map(e=>e.trim()).filter(Boolean)
    const payload = { title, start: new Date(start).toISOString(), durationMins: Number(duration), attendees, provider }
    const d = await api('/api/schedule', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
    setResult(d)
  }

  return (
    <div>
      <h2>Scheduler</h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, maxWidth:700 }}>
        <input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
        <input type='datetime-local' value={start} onChange={e=>setStart(e.target.value)} />
        <input type='number' value={duration} onChange={e=>setDuration(Number(e.target.value))} />
        <select value={provider} onChange={e=>setProvider(e.target.value as any)}>
          <option value='google'>Google (Meet)</option>
          <option value='zoom'>Zoom</option>
        </select>
        <input style={{ gridColumn:'1 / span 2' }} placeholder='Attendee emails, comma-separated' value={emails} onChange={e=>setEmails(e.target.value)} />
      </div>
      <div style={{ marginTop:10 }}><button onClick={submit}>Create Meeting</button></div>
      {result && <pre style={{ background:'#f7f7f7', padding:12, marginTop:12 }}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
