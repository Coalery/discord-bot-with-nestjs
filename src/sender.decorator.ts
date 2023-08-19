import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { DiscordRequest } from './adapter/discord-bot.adapter';
import { User as DiscordUser } from 'discord.js';

export const Sender = createParamDecorator(
  (data: keyof DiscordUser | undefined, ctx: ExecutionContext) => {
    const request: DiscordRequest = ctx.getArgByIndex(0);
    return data ? request.sender[data] : request.sender;
  },
);
