import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsOptios = {
  origin: ['http://localhost:4200'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept, Authorization',
  credentials: true,
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptios)
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
