import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/health', () => {
    return HttpResponse.json({ status: 'ok', message: 'Server is running' });
  }),

  http.get('*/tasks', () => {
    console.log('DEFAULT handler fired');
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
