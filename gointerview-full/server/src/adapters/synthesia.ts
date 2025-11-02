import type { AvatarProvider } from './providers.js';
export const SynthesiaProvider: AvatarProvider = {
  async renderVideo({ script, voiceId }) {
    const videoUrl = `https://cdn.example.com/synthesia/${encodeURIComponent(script.slice(0,20))}.mp4`;
    return { videoUrl, jobId: 'mock-synthesia-job' };
  }
};
