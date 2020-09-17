import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
    inhibitorHandler: InhibitorHandler;
    config: Record<any, any>;
  }
}

class YazowoNicowo extends AkairoClient {
  constructor(config: Record<any, string>) {
    super(
      {
        ownerID: '500765481788112916',
      },
      {
        disableMentions: 'everyone',
      }
    );

    this.config = config;
    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, 'commands/'),
      prefix: this.config.prefix ? this.config.prefix : 'nico!',
      allowMention: true,
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, 'listeners/'),
    });

    /*
    this.inhibitorHandler = new InhibitorHandler(this, {
      // Options for the command handler goes here.
    });
    */
  }

  private async _init() {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  async login(token: string): Promise<string> {
    await this._init();
    return super.login(token);
  }
}

export default YazowoNicowo;
