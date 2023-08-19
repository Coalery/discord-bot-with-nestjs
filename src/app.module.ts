import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformExceptionMessageFilter } from './transform-exception-message.filter';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TransformExceptionMessageFilter,
    },
    AppService,
  ],
})
export class AppModule {}
