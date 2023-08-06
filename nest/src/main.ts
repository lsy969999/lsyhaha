import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
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

  const serverConfig = config.get('server');
  const port = serverConfig.port
  await app.listen(port);
  Logger.log(`runnin on port ${port}`)
} 
bootstrap();
