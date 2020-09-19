import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class InGameCommand extends Command {
  constructor() {
    super('game-ingame', {
      channel: 'guild',
      args: [
          {
              id: "over",
              type: "flag",
              flag: "--over"
          }
      ],
    });
  }
    async exec( message: Message, { over }: { over: boolean; } ) {
      if (!message.member?.voice.channel)
          return message.channel.send(
          'Bruh, you need to be in a voice channel for this to work'
      );
      const channel = message.member.voice.channel;
      if ( over ) {
        for (const member of channel.members.values()) {
          await member.voice.setMute(false);
        }
      } else {
        for ( const member of channel.members.values() ) {
          await member.voice.setMute( true );
        }
      }
      return message.channel.send(
        `All members have been ${over ? 'unmuted' : 'muted'}`
      );
    }
}

export default InGameCommand;
