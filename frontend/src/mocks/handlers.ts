import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://couchdb-3-5-2.onrender.com', () => {
    return HttpResponse.json({ couchdb: 'Welcome', version: '3.5.2' });
  }),

  http.get('*/health', () => {
    return HttpResponse.json({ status: 'ok', message: 'Server is running' });
  }),

  http.post('*/tasks', () => {
    return HttpResponse.json([]);
  }),

  http.post('*/tasks', async ({ request }) => {
    const body = (await request.json()) as { title: string };
    return HttpResponse.json(
      {
        _id: crypto.randomUUID(),
        _rev: '1-abc',
        type: 'task',
        title: body.title,
        quadrant: null,
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),
];
