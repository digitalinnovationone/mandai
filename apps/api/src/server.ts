import { buildApp } from './app';

const PORT = parseInt(process.env.PORT ?? '3001', 10);

async function start() {
  const app = await buildApp();
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Mandaí API running at http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
