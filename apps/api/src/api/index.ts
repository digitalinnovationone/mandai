/**
 * Vercel serverless handler — warm-start pattern.
 *
 * Vercel reuses the same Node.js process between invocations in the same
 * region ("warm starts"). We build the Fastify app once and reuse it.
 * This avoids cold-start overhead on every request.
 */
import { IncomingMessage, ServerResponse } from 'http';
import { buildApp } from '../app';

type FastifyApp = Awaited<ReturnType<typeof buildApp>>;

let appPromise: Promise<FastifyApp> | null = null;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (!appPromise) {
    appPromise = buildApp();
  }
  const app = await appPromise;
  await app.ready();
  app.server.emit('request', req, res);
}
