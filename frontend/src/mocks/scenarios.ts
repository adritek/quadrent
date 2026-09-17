import { http, HttpResponse, delay } from 'msw';

const DB_ENDPOINT = 'https://couch-3-5-2.onrender.com';

export const coldStartScenario = [
  http.get(DB_ENDPOINT, async () => {
    await delay(8000);
    return HttpResponse.json({ couchdb: 'Welcome', version: '3.5.2' });
  }),

  http.get('*/health', async () => {
    await delay(5000);
    return HttpResponse.json({ status: 'ok', message: 'Server is running' });
  }),
];

export const serverDownScenario = [
  http.get(DB_ENDPOINT, () => {
    return HttpResponse.error();
  }),

  http.get('*/health', () => {
    return HttpResponse.error();
  }),
];

export const slowNetworkScenario = [
  http.get('*/tasks', async () => {
    await delay(3000);
    return HttpResponse.json([]);
  }),
];
