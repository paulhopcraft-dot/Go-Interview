export interface CalendarProvider {
  createMeeting(opts: { title: string, start: string, durationMins: number, attendees: string[] }): Promise<{ joinUrl: string, calendarEventId?: string }>;
}
export interface AvatarProvider { renderVideo(opts: { script: string, voiceId?: string }): Promise<{ videoUrl: string, jobId?: string }>; }
export interface VoiceProvider { synthesize(opts: { text: string, voiceId?: string }): Promise<{ audioUrl: string }>; }
