import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function setOpenAPI(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Weather')
    .setDescription('The Weather API routes')
    .setVersion('1.0')
    .addTag('Weather')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  setOpenAPI(app);
  await app.listen(3001);
}

bootstrap();
