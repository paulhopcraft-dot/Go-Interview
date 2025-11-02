export async function api(path:string, init?:RequestInit){ const r=await fetch(path, init); if(!r.ok) throw new Error(await r.text()); return r.json(); }
