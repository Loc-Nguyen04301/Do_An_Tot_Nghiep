import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];

  app.enableCors({
    origin: allowedOrigins, // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers if necessary
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
