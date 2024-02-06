import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Apis')
    .setDescription('Apis')
    .setVersion('1.0')
    .addTag('APi')
    .addBearerAuth(
      {
        description: 'Enter token',
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
      },
      'Authorization', //이 부분과
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

// {
//   "itemId": "858bf49f-ca5a-4f03-a8be-c070e8623951",
//   "optionIds": [
//     "673d1080-f13e-4e2b-af64-c030ce19ac68",
// "f0e50833-6bac-49af-86c2-52eb8f82f67e"
//   ],
//   "quantity": 0,
//   "color": "string"
// }
