import { Listener } from 'discord-akairo';
import { VoiceState } from 'discord.js';

export default class voiceStateUpdateListener extends Listener {
  constructor() {
    super('voiceStateUpdate', {
      emitter: 'client',
      event: 'voiceStateUpdate',
    }); 
  }
 
  async exec(oldState: VoiceState, newState: VoiceState) {
    if (this.client.mutedCache.has(oldState.guild.id)) return;
    if (!oldState.member || !newState.member) return;
    if (!oldState.member.hasPermission("MUTE_MEMBERS")) return;

    if (!oldState.channel || !newState.channel) return;

    if (!oldState.serverMute && newState.serverMute) {
      const members = Array.from(newState.channel!.members.values()).filter(x => x.id !== oldState.member!.id);
      for (let i = 0; i < members.length; i++) {
        setTimeout(async () => {
          await members[ i ].voice.setMute(true);
        }, 250)
      }
      this.client.mutedCache.add(newState.guild.id);
      setTimeout(() => {
        this.client.mutedCache.delete(newState.guild.id);
      }, 7000);
    }

    if (oldState.serverMute && !newState.serverMute) {
      const members = Array.from(newState.channel!.members.values()).filter(x => x.id !== oldState.member!.id);
      for (let i = 0; i < members.length; i++) {
        setTimeout(async () => {
          await members[ i ].voice.setMute(false);
        }, 250)
      }
      this.client.mutedCache.add(newState.guild.id);
      setTimeout(() => {
        this.client.mutedCache.delete(newState.guild.id);
      }, 7000);
    }
  }
}