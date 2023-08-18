import {
  BaseInteraction,
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { EmptyAdapter } from '../core/empty.adapter';
import { RequestHandler } from '@nestjs/common/interfaces';
import { DiscordBotAdapterConfig } from './discord-bot-adapter.config';

type ListenFnCallback = (...args: unknown[]) => void;

type DiscordBulkApplicationCommand = {
  name: string;
  description: string;
};

export class DiscordBotAdapter extends EmptyAdapter {
  private readonly discordClient: Client;
  private readonly config: DiscordBotAdapterConfig;

  private readonly commands: Record<string, RequestHandler>;

  constructor(config: DiscordBotAdapterConfig) {
    super('discord');
    this.discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.config = config;
    this.commands = {};

    this.discordClient.on(
      'interactionCreate',
      (interaction: BaseInteraction) => {
        if (!interaction.isChatInputCommand()) return;
        interaction.reply('Hello World!');
      },
    );
  }

  public get(handler: RequestHandler);
  public get(path: any, handler: RequestHandler);
  public get(rawPath: unknown, rawHandler?: unknown) {
    if (!rawHandler) {
      return;
    }

    const path = rawPath as string;
    const handler = rawHandler as RequestHandler;

    const command = this.removeLeadingSlash(path);

    this.commands[command] = handler;
  }

  public listen(port: string | number, callback?: () => void);
  public listen(port: string | number, hostname: string, callback?: () => void);
  public listen(port: unknown, hostname?: unknown, rawCallback?: unknown): any {
    const callback = this.extract<ListenFnCallback>(hostname, rawCallback);
    this.startDiscordClient()
      .then(() => callback())
      .catch((e) => callback(e));
  }

  private async startDiscordClient(): Promise<void> {
    const { token, clientId, guildId } = this.config;

    const restClient = new REST().setToken(token);
    await restClient.put(
      guildId
        ? Routes.applicationGuildCommands(clientId, guildId)
        : Routes.applicationCommands(clientId),
      {
        body: Object.keys(this.commands).map<DiscordBulkApplicationCommand>(
          (command) => ({
            name: command,
            description: 'some-description',
          }),
        ),
      },
    );

    await this.discordClient.login(this.config.token);
  }

  private removeLeadingSlash(path: string): string {
    return path[0] === '/' ? path.substring(1) : path;
  }

  private extract<T>(a?: any, b?: any): T | undefined {
    return a ?? b;
  }
}
