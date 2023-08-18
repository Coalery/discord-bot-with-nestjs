import { DiscordController } from './handler/discord-controller';
import { DiscordHandler } from './handler/discord-handler';
import { AppService } from './app.service';

@DiscordController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @DiscordHandler({
    name: 'hello',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
