import React from 'react'
import { Nav } from './components/Nav'
import Sessions from './pages/Sessions'
import Scheduler from './pages/Scheduler'
import Knowledge from './pages/Knowledge'
import CAB from './pages/CAB'
import Settings from './pages/Settings'

type Tab = 'sessions'|'scheduler'|'knowledge'|'cab'|'settings'

export default function App() {
  const [tab, setTab] = React.useState<Tab>('sessions')
  return (
    <div style={{ fontFamily:'system-ui, sans-serif', padding: 24, maxWidth: 1100, margin:'0 auto' }}>
      <h1>GoInterview</h1>
      <Nav tab={tab} onChange={setTab} />
      {tab === 'sessions' && <Sessions />}
      {tab === 'scheduler' && <Scheduler />}
      {tab === 'knowledge' && <Knowledge />}
      {tab === 'cab' && <CAB />}
      {tab === 'settings' && <Settings />}
    </div>
  )
}
