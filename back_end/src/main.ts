import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const allowedOriginsListTxt = process.env.ALLOWED_ORIGINS_LIST
export const allowedOriginsList: string[] = allowedOriginsListTxt.split(',').map((text) => text.trim())

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: allowedOriginsList,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
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
}
bootstrap();
