import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { DiscordResponse } from './adapter/discord-bot.adapter';

@Catch(HttpException)
export class TransformExceptionMessageFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: DiscordResponse = host.getArgByIndex(1);
    response.reply(exception.message);
  }
}
