import { http, HttpResponse } from 'msw';

export const handlers = [
  // DevPanel overrides specific enpoints when needed
  // Keep couchDB wakeup-handler for prod pings
  http.get('https://couchdb-3-5-2.onrender.com', () => {
    return HttpResponse.json({ couchdb: 'Welcome', version: '3.5.2' });
  }),
];
