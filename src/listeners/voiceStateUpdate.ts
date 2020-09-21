import { Listener } from 'discord-akairo';
import { VoiceState } from 'discord.js';

class ReadyListener extends Listener {
  constructor() {
    super('voiceStateUpdate', {
      emitter: 'client',
      event: 'voiceStateUpdate',
    });
  }

  async exec( oldState: VoiceState, newState: VoiceState ) {
    const channel = oldState.channel;
    if ( channel ) {
      if ( oldState.member?.hasPermission( "MUTE_MEMBERS" ) ) {
        if (!oldState.serverMute && newState.serverMute) {
          for (const member of channel.members.values()) {
            await member.voice.setMute(true);
          }
          return;
        }
        if (oldState.serverMute && !newState.serverMute) {
          for (const member of channel.members.values()) {
            await member.voice.setMute(false);
          }
          return;
        }
      }
    }
  }
}

export default ReadyListener;