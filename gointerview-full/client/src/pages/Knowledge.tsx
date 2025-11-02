import React from 'react'

export default function Knowledge() {
  const [file, setFile] = React.useState<File | null>(null)
  const [items, setItems] = React.useState<any[]>([])

  const refresh = async () => {
    const r = await fetch('/api/knowledge')
    const j = await r.json()
    setItems(j.items || [])
  }
  React.useEffect(()=>{ refresh() }, [])

  const upload = async () => {
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    const r = await fetch('/api/knowledge/upload', { method:'POST', body: fd })
    if (r.ok) { setFile(null); refresh() }
  }

  return (
    <div>
      <h2>Knowledge</h2>
      <input type='file' onChange={e=>setFile(e.target.files?.[0] || null)} />
      <button onClick={upload} disabled={!file}>Upload</button>
      <ul style={{ marginTop:12 }}>
        {items.map((k:any) => (
          <li key={k.id}>{k.filename} — {Math.round(k.size/1024)} KB — {new Date(k.uploadedAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  )
}
