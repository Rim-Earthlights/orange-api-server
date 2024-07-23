import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { RouterModule } from './modules/router.module';
import * as path from 'path';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(RouterModule);

  const config = new DocumentBuilder()
    .setTitle('Orange API')
    .setDescription('API of Discord Bot for Orange-Server.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync(
    path.resolve(process.cwd(), 'docs/openapi.yaml'),
    dump(document, {}),
    { encoding: 'utf8' },
  );
  writeFileSync(
    path.resolve(process.cwd(), 'docs/openapi.json'),
    JSON.stringify(document, null, 2),
    { encoding: 'utf8' },
  );

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
