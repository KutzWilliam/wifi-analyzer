import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  const address = await app.getUrl();
  console.log(`Aplicação está rodando em: http://localhost:3001`);
}
bootstrap();
