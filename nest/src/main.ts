import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const scon = new DocumentBuilder()
    .setTitle('lsyhaha')
    .setDescription('The lsyhaha API description')
    .setVersion('1.0')
    .addTag('lsyhaha')
    .build();
  const document = SwaggerModule.createDocument(app, scon, {});
  SwaggerModule.setup('api-doc', app, document, {});

  const port = process.env.SERVER_PORT
  await app.listen(port);
  Logger.log(`runnin on port ${port}`)
} 
bootstrap();
