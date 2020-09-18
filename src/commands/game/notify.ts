import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class PlayCommand extends Command {
  constructor() {
    super('game-notify', {
      channel: 'guild',
    });
  }
  async exec(message: Message) {
    if (!message.member || !message.guild) return;
    const notifyRole = this.client.config.notifyRole
      ? message.guild?.roles.cache.get(this.client.config.notifyRole)
      : null;
    if (!notifyRole)
      return message.channel.send('No proper role id provided in config');
    if (!message.member?.roles.cache.has(notifyRole.id)) {
      message.member?.roles.add(notifyRole);
      return message.channel.send(
        `You have been given the \`${notifyRole.name}\` role.`
      );
    }
    message.member.roles.remove(notifyRole);
    return message.channel.send(
      `The \`${notifyRole.name}\` role has been removed from you.`
    );
  }
}

export default PlayCommand;
