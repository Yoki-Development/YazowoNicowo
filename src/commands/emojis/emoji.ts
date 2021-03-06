import { Command, Flag } from 'discord-akairo';

class EmojiCommand extends Command {
  constructor() {
    super('emoji', {
      aliases: ['emoji'],
      description: {
        usage: '<subcommand> [...args]',
      },
      channel: 'guild',
    });
  }

  *args() {
    const method = yield {
      type: [
        ['emoji-add', 'add'],
        ['emoji-delete', 'delete'],
      ],
      otherwise: `\`giv a pwoper subcommand\``,
    };

    return Flag.continue(method);
  }
}

export default EmojiCommand;
