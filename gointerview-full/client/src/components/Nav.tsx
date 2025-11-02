import React from 'react'
export function Nav({ tab, onChange }:{ tab:string, onChange:(t:any)=>void }) {
  const tabs = [['sessions','Sessions'],['scheduler','Scheduler'],['knowledge','Knowledge'],['cab','CAB'],['settings','Settings']] as const
  return (
    <div style={{ display:'flex', gap:12, margin:'12px 0 20px' }}>
      {tabs.map(([key,label]) => (
        <button key={key} onClick={()=>onChange(key)}
          style={{ padding:'8px 12px', borderRadius:10, border:'1px solid #ccc', background: tab===key ? '#eee' : 'white', cursor:'pointer' }}>
          {label}
        </button>
      ))}
    </div>
  )
}
