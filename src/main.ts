import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Load environment variables
  dotenv.config();
  
  const app = await NestFactory.create(AppModule);
  
  // Optional: Configure global validation pipe, CORS, or other middlewares here
  // Example: Enable CORS
  app.enableCors();
  
  // Listen on the configured port or default to 3000
  await app.listen(process.env.PORT).catch(error => {
    console.error('Error during Nest application startup', error);
  });
}

bootstrap();
