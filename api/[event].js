import { google } from 'googleapis';

class CalendarEvent {
    constructor(title, location, start, end) {
        this.title = title;
        this.location = location;
        this.start = start;
        this.end = end;
    }
}

function convertToCalendarEvent(events) {
    let calendarEvents = []

    for (let i = 0; i < events.length; i++) {
        let e = events[i]
        let o = new CalendarEvent(e.summary, e.location, new Date(e.start.dateTime), new Date(e.end.dateTime))
        calendarEvents.push(o)
    }

    console.log(calendarEvents)
    return calendarEvents;
}

const API_KEY = process.env.API_KEY;

// Set up the Google Calendar API client
const calendar = google.calendar({
    version: 'v3',
    auth: API_KEY,
});

export default async function handler(req, res) {
    // Parse the list of calendar IDs from the request URL
    const calendarIds = req.query.event.split(',');

    // Use the Google Calendar API to get a list of events for each calendar
    const promises = calendarIds.map(calendarId => {
        let start = new Date();
        start.setUTCHours(0, 0, 0, 0);
        let end = new Date(start.getTime());
        end.setUTCHours(23, 59, 59, 999);

        return calendar.events.list({
            calendarId,
            timeMin: start.toISOString(),
            timeMax: end.toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
    });

    // Wait for all API requests to complete, then combine the results
    const results = await Promise.all(promises);
    const events = results.reduce((acc, result) => acc.concat(convertToCalendarEvent(result.data.items)), []);

    // Send the list of events as the response
    res.json(events);
}