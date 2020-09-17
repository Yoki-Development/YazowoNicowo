import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class EmojiAddCommand extends Command {
  constructor() {
    super('emoji-add', {
      args: [
        {
          id: 'link',
          type: 'string',
        },
        {
          id: 'name',
          type: 'string',
        },
      ],
      userPermissions: ['MANAGE_EMOJIS'],
      channel: 'guild',
    });
  }

  async exec(message: Message, { link, name }: { link: string; name: string }) {
    if (!link || !name)
      return message.channel.send('Give me a emoji link and emoji name dummy');
    const emoji = await message.guild?.emojis
      .create(link, name)
      .catch(() =>
        message.channel.send('oopsie woopsie there was a fucky wucky.')
      );
    if (!emoji) return message.channel.send('bitch what');
    return message.channel.send(emoji.toString());
  }
}

export default EmojiAddCommand;
