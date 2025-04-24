import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/_app/app.module';

async function exploreRoutes() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: Array<{ method: string; path: string }> = [];

  router.stack.forEach((layer: any) => {
    if (layer.route) {
      const path = layer.route?.path;
      const method = layer.route?.stack[0]?.method?.toUpperCase();

      availableRoutes.push({
        method,
        path,
      });
    }
  });

  console.log('\nAvailable Routes:');
  console.log('================\n');

  availableRoutes
    .sort((a, b) => a.path.localeCompare(b.path))
    .forEach((route) => {
      console.log(`${route.method.padEnd(8)} ${route.path}`);
    });

  await app.close();
  process.exit(0);
}

exploreRoutes();
