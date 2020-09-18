import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class InGameCommand extends Command {
  constructor() {
    super('game-ingame', {
      channel: 'guild',
      args: [
        {
          id: 'unmuteAll',
        type: 'flag',
          flag: "--unmute"
          },
          {
              id: "over",
              type: "flag",
              flag: "--over"
          }
      ],
    });
  }
    async exec( message: Message, { unmuteAll, over }: { unmuteAll: boolean; over: boolean; } ) {
        if (!message.member?.voice.channel)
            return message.channel.send(
            'Bruh, you need to be in a voice channel for this to work'
            );
        const channel = message.member.voice.channel;
        if ( over ) {
            this.client.config.mutedPeople = [];
            for (const member of channel.members.values()) {
                await member.voice.setMute( false );
            }
            return message.channel.send( "Game has ended, onto the next hopefully!" );
        } else {
            for ( const member of channel.members.values() ) {
                unmuteAll
                  ? !this.client.config.mutedPeople.includes(member.id)
                    ? await member.voice.setMute(false)
                    : null
                  : await member.voice.setMute(true);
            }
            return message.channel.send( `All members have been ${unmuteAll ? "unmuted" : "muted"}` );
        }
    }
}

export default InGameCommand;
