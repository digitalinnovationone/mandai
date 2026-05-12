import Fastify from 'fastify';
import cors from '@fastify/cors';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from './shared/prisma';
import { buildOrderingModule } from './modules/ordering/ordering.module';
import { orderingRoutes } from './modules/ordering/http/ordering.routes';
import { isHttpError } from './shared/errors';

export async function buildApp() {
  const app = Fastify({ logger: true });

  // ── Zod type provider ─────────────────────────────────────────────────────
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // ── CORS ──────────────────────────────────────────────────────────────────
  const corsOrigin = process.env.CORS_ORIGIN || '*';
  if (corsOrigin === '*' && process.env.NODE_ENV === 'production') {
    app.log.warn(
      'CORS origin is set to "*" in production. ' +
      'Set the CORS_ORIGIN environment variable to the frontend URL (e.g. https://mandai.vercel.app).',
    );
  }
  await app.register(cors, {
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  // ── Global error handler ──────────────────────────────────────────────────
  app.setErrorHandler((err, _request, reply) => {
    if (isHttpError(err)) {
      reply.status(err.statusCode).send({
        error: err.code ?? 'ERROR',
        message: err.message,
        statusCode: err.statusCode,
      });
      return;
    }

    // Zod validation errors come from fastify-type-provider-zod as 400
    const fastifyErr = err as { statusCode?: number; message: string };
    if (fastifyErr.statusCode === 400) {
      reply.status(400).send({
        error: 'VALIDATION_ERROR',
        message: fastifyErr.message,
        statusCode: 400,
      });
      return;
    }

    app.log.error(err);
    reply.status(500).send({
      error: 'INTERNAL_ERROR',
      message: 'Ih, deu ruim aqui. Tenta de novo em instantes.',
      statusCode: 500,
    });
  });

  // ── Routes ────────────────────────────────────────────────────────────────
  const ordering = buildOrderingModule(prisma);

  await app.register(
    async (instance) => {
      await orderingRoutes(instance, ordering);
    },
    { prefix: '/api' },
  );

  // Health check
  app.get('/health', async () => ({ status: 'ok' }));

  return app;
}
