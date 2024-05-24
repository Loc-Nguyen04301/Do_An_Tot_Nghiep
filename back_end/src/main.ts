import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://do-an-tot-nghiep-7dr3.vercel.app'];

  app.enableCors({
    origin: allowedOrigins, // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers if necessary
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Do an tot nghiep')
    .setDescription('Do an tot nghiep API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const port = process.env.PORT || 8000

  await app.listen(port);
  console.log("Server is running on port " + port)
}
bootstrap();
