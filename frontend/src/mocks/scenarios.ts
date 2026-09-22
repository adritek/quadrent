import { http, HttpResponse, delay } from 'msw';

export const coldStartScenario = [
  http.get('http://localhost:3001/health', async () => {
    await delay(8000);
    return HttpResponse.json({ status: 'ok', message: 'Server is running' });
  }),

  http.get('http://localhost:3001/tasks', async () => {
    await delay(5000);
    return HttpResponse.json([]);
  }),
];

export const serverDownScenario = [
  http.get('http://localhost:3001/health', () => {
    return HttpResponse.error();
  }),

  http.get('http://localhost:3001/tasks', () => {
    return HttpResponse.error();
  }),
];

export const slowNetworkScenario = [
  http.get('http://localhost:3001/tasks', async () => {
    await delay(3000);
    return HttpResponse.json([]);
  }),
];
