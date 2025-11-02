import React from 'react'
export default function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <p>Set API keys via environment variables on your server (Replit Secrets):</p>
      <ul>
        <li>SYNTHESIA_API_KEY</li>
        <li>ELEVENLABS_API_KEY</li>
        <li>GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REDIRECT_URI / GOOGLE_REFRESH_TOKEN / SENDER_EMAIL</li>
        <li>ZOOM_ACCOUNT_ID / ZOOM_CLIENT_ID / ZOOM_CLIENT_SECRET / ZOOM_USER_EMAIL</li>
      </ul>
      <p>When set, replace the adapter stubs with real calls (see <code>server/src/adapters/*</code>).</p>
    </div>
  )
}
