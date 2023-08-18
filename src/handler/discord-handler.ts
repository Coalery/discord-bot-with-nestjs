import {
  Get,
  InternalServerErrorException,
  SetMetadata,
  applyDecorators,
} from '@nestjs/common';
import { DiscordHandlerOptions } from './discord-handler-options';

export const DISCORD_HANDLER_OPTIONS = 'DISCORD_HANDLER_OPTIONS';
export const DISCORD_NAME_REGEX = /^[a-zA-Z0-9-_]+$/;

export const DiscordHandler = (options: DiscordHandlerOptions) => {
  if (!DISCORD_NAME_REGEX.test(options.name)) {
    throw new InternalServerErrorException();
  }

  return applyDecorators(
    Get(options.name),
    SetMetadata(DISCORD_HANDLER_OPTIONS, options),
  );
};
