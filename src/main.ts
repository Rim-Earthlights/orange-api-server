import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import { RouterModule } from './modules/router.module';
import * as path from 'path';
import { writeFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';

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

  const prisma = new PrismaClient();
  await prisma.$connect().then(() => {
  }).catch((error) => {
    console.error('Failed to connect to database', error);
    process.exit(1);
  });

  await app.listen(3000);
}
bootstrap();
