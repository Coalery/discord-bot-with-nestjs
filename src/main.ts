import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DiscordBotAdapter } from './adapter/discord-bot.adapter';
import { ConsoleLogger, Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new DiscordBotAdapter({
      token: process.env.DISCORD_TOKEN,
      clientId: process.env.DISCORD_CLIENT_ID,
      guildId: process.env.DISCORD_GUILD_ID,
    }),
  );
  const logger = new Logger('DiscordBotWithNestjs', { timestamp: true });

  await app.listen(3000, () => {
    logger.log('Ready to listen the commands');
  });
}

bootstrap();
