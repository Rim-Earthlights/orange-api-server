import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RouterModule } from './modules/router.module';

async function bootstrap() {
  const app = await NestFactory.create(RouterModule);

  const config = new DocumentBuilder()
  .setTitle('Orange API')
  .setDescription('API of Discord Bot for Orange-Server.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
