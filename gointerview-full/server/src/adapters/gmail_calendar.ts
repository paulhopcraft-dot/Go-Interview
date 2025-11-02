import type { CalendarProvider } from './providers.js';
export const GmailCalendarProvider: CalendarProvider = {
  async createMeeting({ title, start, durationMins, attendees }) {
    const joinUrl = `https://meet.google.com/mock-${Math.random().toString(36).slice(2,8)}`;
    return { joinUrl, calendarEventId: 'mock-event-id' };
  }
};
