import { describe, expect, it } from 'bun:test';
import { app } from '@/server';

describe('Elysia', () => {
  it('return a response', async () => {
    const res = await app.handle(new Request('http://localhost/'));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toContainKey('message');
  });
});
