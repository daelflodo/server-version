import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { CORS } from './common/constants';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Crea una instancia de la aplicación Nest.js
  const configService = app.get(ConfigService); // Obtiene el servicio de configuración de la aplicación
  const PORT = configService.get('PORT'); // Obtiene el valor de configuración del puerto en el que se ejecutará la aplicación
  const reflector = app.get(Reflector);
  app.use(morgan('dev')); //Registra las solicitudes HTTP en la aplicación Nest.js.

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector)); // Excluye la password de las solicitudes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors(CORS);

  app.setGlobalPrefix('api'); // para manejar las versiones

  await app.listen(PORT, '0.0.0.0', async () => {
    console.log('Listening in port:' + `${await app.getUrl()}`);
  });
}
bootstrap();
