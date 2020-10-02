import { Command } from 'discord-akairo';
import { Listener } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { Message } from 'discord.js';

export default class missingPermissions extends Listener {
  constructor() {
    super('missingPermissions', {
      emitter: 'commandHandler',
      event: 'missingPermissions',
    });
  }

  async exec(
    message: Message,
    _command: Command,
    type: 'client' | 'user',
    missing: any[]
  ) {
    return type === 'user'
      ? await this.userMissingPermissions(message, missing)
      : await this.clientMissingPermissions(message, missing);
  }
  private async userMissingPermissions(message: Message, missing: any[]) {
    return message.channel.send(
      new MessageEmbed()
        .setTitle('You are missing permissions!')
        .setColor('RED')
        .setDescription(
          `You are missing the following permissions: ${
            missing instanceof Array && missing.length > 0
              ? missing.map((x: string) => `\`${x}\``).join(', ')
              : `\`${missing}\``
          }`
        )
    );
  }
  private async clientMissingPermissions(message: Message, missing: any[]) {
    if (!message.guild) return;
    return message.channel.send(
      new MessageEmbed()
        .setTitle('I am missing permissions!')
        .setColor('RED')
        .setDescription(
          `I am missing the following permissions: ${
            missing instanceof Array && missing.length > 0
              ? missing.map((x: string) => `\`${x}\``).join(', ')
              : 'NONE'
          }`
        )
    );
  }
}
