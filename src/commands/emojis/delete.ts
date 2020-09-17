import { Command } from 'discord-akairo';
import { Message, GuildEmoji } from 'discord.js';

class EmojiDeleteCommand extends Command {
  constructor() {
    super('emoji-delete', {
      args: [
        {
          id: 'emote',
          type: 'emoji',
        },
      ],
      userPermissions: ['MANAGE_EMOJIS'],
      channel: 'guild',
    });
  }

  async exec(message: Message, { emote }: { emote: GuildEmoji }) {
    if (!emote) return message.channel.send('Say the emote you dummy');
    await message.guild?.emojis.resolve(emote)?.delete();
    return message.channel.send(`Deleted the emote: \`${emote.name}\``);
  }
}

export default EmojiDeleteCommand;
