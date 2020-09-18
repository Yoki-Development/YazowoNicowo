//fancy seeing you here, you come here often?
//red sus
//vote dd first
//i did medbay scan in front of you i swear bro

import YazowoNicowo from './src/yazowonico';
import { config } from 'dotenv';
config();

const options: any = {
  notifyRole: process.env.NOTIFYROLE,
  prefix: process.env.PREFIX,
  mutedPeople: []
};
const client = new YazowoNicowo(options);

if (!process.env.TOKEN) throw new Error('bruhe you need to give le token');
client.login(process.env.TOKEN);
