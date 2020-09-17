import { Listener } from 'discord-akairo';

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    console.log(`logged in as ${this.client.user?.tag}`);
    if (!this.client.user) return;
    this.client.user.setPresence({
      status: 'dnd',
      activity: {
        name: `Among Us`,
        type: 'PLAYING',
      },
    });
  }
}

export default ReadyListener;
