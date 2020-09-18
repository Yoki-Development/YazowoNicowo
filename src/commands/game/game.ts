import { Command, Flag } from 'discord-akairo';

class GameCommand extends Command {
  constructor() {
    super('game', {
      aliases: ['game'],
      description: {
        usage: '<subcommand> [...args]',
      },
      channel: 'guild',
    });
  }

  *args() {
    const method = yield {
      type: [
        ['game-notify', 'notify'],
        [ 'game-play', 'play' ],
        [ 'game-mute', 'mute' ],
        ['game-ingame', 'ingame']
      ],
      otherwise: `\`giv a pwoper subcommand\``,
    };

    return Flag.continue(method);
  }
}

export default GameCommand;
