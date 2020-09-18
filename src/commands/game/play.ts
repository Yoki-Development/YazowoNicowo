import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import YazowoNicowo from '../../yazowonico';

class PlayCommand extends Command {
  constructor() {
    super('game-play', {
      userPermissions: (message) => {
        if (
          this.client.config.notifyRole &&
          !message.member?.roles.cache.has(this.client.config.notifyRole)
        ) {
          return 'notify role';
        }
        return null;
      },
      cooldown: 1.8e6,
      channel: 'guild',
    });
  }
  async exec(message: Message) {
    const notifyRole = (message.client as YazowoNicowo).config.notifyRole
      ? await message.guild?.roles.fetch(
          (message.client as YazowoNicowo).config.notifyRole
        )
      : null;

    if (notifyRole)
      return message.channel.send(
        `${message.author} wants to play Among Us!\n\n${notifyRole}*(if you don't want to get pinged, ask for the ${notifyRole.name} role to be removed.)*`
      );
    return message.channel.send(
      "Couldn't find a proper notify role for this guild"
    );
  }
}

export default PlayCommand;
