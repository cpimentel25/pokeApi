import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // Global DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove undeclared fields in the DTO
      forbidNonWhitelisted: true, // Throw error if non-allowed fields are sent
      transform: true, // Convert data to expected types
    }),
  );
}
bootstrap();
