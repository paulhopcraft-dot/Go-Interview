import React from 'react'
export default function SessionCard({ s, onSend }:{ s:any, onSend:(id:string, text:string)=>void }) {
  const [text, setText] = React.useState('Tell me about your last role.')
  return (
    <div style={{ border:'1px solid #ddd', borderRadius:12, padding:12, marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <strong>{s.title}</strong>
        <span>{s.status}</span>
      </div>
      <div style={{ fontSize:12, opacity:0.7, marginTop:4 }}>{s.candidateName} - {s.position} - tags: {(s.tags||[]).join(', ')}</div>
      <div style={{ marginTop:10 }}>
        {s.messages?.slice(-4).map((m:any, i:number)=>(
          <div key={i} style={{ fontFamily:'monospace', margin:'4px 0' }}>
            <b>{m.role}</b>: {m.text} {typeof m.sentiment==='number' ? <em> (sent {m.sentiment.toFixed(2)})</em> : null}
          </div>
        ))}
      </div>
      <div style={{ marginTop:10, display:'flex', gap:8 }}>
        <input value={text} onChange={e=>setText(e.target.value)} style={{ flex:1 }} />
        <button onClick={()=>onSend(s.id, text)}>Send</button>
      </div>
    </div>
  )
}
