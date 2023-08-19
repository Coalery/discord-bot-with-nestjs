import { DiscordController } from './handler/discord-controller';
import { DiscordHandler } from './handler/discord-handler';
import { AppService } from './app.service';
import { SomeGuard } from './app.guard';
import { UseGuards } from '@nestjs/common';

@DiscordController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @DiscordHandler({ name: 'hello' })
  @UseGuards(new SomeGuard())
  getHello(): string {
    return this.appService.getHello();
  }
}
