import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DiscordRequest } from './adapter/discord-bot.adapter';

@Injectable()
export class SomeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: DiscordRequest = context.getArgByIndex(0);

    // if (req.sender.globalName === '러리') {
    //   throw new ForbiddenException('러리 님은 사용할 수 없어요.');
    // }

    return true;
  }
}
