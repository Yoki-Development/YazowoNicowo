import { Command } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { Message } from 'discord.js';

class MuteCommand extends Command {
  constructor() {
    super('game-mute', {
        channel: 'guild',
        args: [ {
            "id": "person",
            "type": "string"
        }]
    });
  }
    async exec( message: Message, { person }: { person: string; } ) {
        if ( !message.member?.voice.channel ) return message.channel.send( "You are not in a voice channel idiot" );
        const serializedPerson = this.serialize( person );
        const toMute: GuildMember | undefined | null = message.member.voice.channel.members.find( ( x: GuildMember ) => this.serialize( x.displayName ) === serializedPerson || this.serialize( x.user.username ) === serializedPerson ) || message.member.voice.channel.members.get( serializedPerson );
        if ( !toMute ) return message.channel.send( "Sorry, I couldn't find anyone with that nickname, name, or id (please don't mention so that we don't keep pinging them" );
        if ( toMute.voice.serverMute ) {
            await toMute.voice.setMute(false);
            this.client.config.mutedPeople.filter( ( x: string ) => x !== toMute.id );
            return message.channel.send(
              `I have successfully unmuted ${toMute.user.tag}`
            );
        } else {
            await toMute.voice.setMute(true);
            this.client.config.mutedPeople.push( toMute.id );
            return message.channel.send( `I have successfully muted ${toMute.user.tag}` );
        }
  }
    private serialize( input: string ) {
        return input.toLowerCase().replace( " ", "" );
    } 
}

export default MuteCommand;
