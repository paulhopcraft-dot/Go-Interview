import type { CalendarProvider } from './providers.js';
export const ZoomProvider: CalendarProvider = {
  async createMeeting({ title, start, durationMins, attendees }) {
    const joinUrl = `https://zoom.us/j/${Math.floor(Math.random()*10**10)}`;
    return { joinUrl, calendarEventId: 'mock-zoom-id' };
  }
};
