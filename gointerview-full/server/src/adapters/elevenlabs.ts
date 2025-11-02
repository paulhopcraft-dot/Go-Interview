import type { VoiceProvider } from './providers.js';
export const ElevenLabsProvider: VoiceProvider = {
  async synthesize({ text, voiceId }) {
    const audioUrl = `https://cdn.example.com/elevenlabs/${encodeURIComponent(text.slice(0,20))}.mp3`;
    return { audioUrl };
  }
};
