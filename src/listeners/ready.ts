import { Listener } from 'discord-akairo';

export default class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    console.log(`logged in as ${this.client.user!.tag}`);
    this.client.user!.setPresence({
      status: 'dnd',
      activity: {
        name: `Among Us`,
        type: 'PLAYING',
      },
    });
  }
}
