import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';

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
      directory: './commands/',
      prefix: this.config.prefix ? this.config.prefix : 'nico!',
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/',
    });

    /*
    this.inhibitorHandler = new InhibitorHandler(this, {
      // Options for the command handler goes here.
    });
    */
  }
  async login(token: string): Promise<string> {
    return super.login(token);
  }
}

export default YazowoNicowo;
