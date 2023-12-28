import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  });*/

  app.enableCors({
    credentials: true,
    // origin: ['http://localhost:3000/'],
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}

bootstrap();
