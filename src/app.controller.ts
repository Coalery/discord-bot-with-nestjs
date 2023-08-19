import { DiscordController } from './handler/discord-controller';
import { DiscordHandler } from './handler/discord-handler';
import { AppService } from './app.service';
import { SomeGuard } from './app.guard';
import { UseGuards } from '@nestjs/common';
import { Sender } from './sender.decorator';
import { RandomNumberService } from './random-number.service';

@DiscordController()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly randomNumberService: RandomNumberService,
  ) {}

  @DiscordHandler({ name: 'hello' })
  @UseGuards(new SomeGuard())
  getHello(@Sender('globalName') senderName: string): string {
    return this.appService.getHello(senderName);
  }

  @DiscordHandler({ name: 'random' })
  generateRandomNumber(): number {
    return this.randomNumberService.generateRandomNumber();
  }
}
