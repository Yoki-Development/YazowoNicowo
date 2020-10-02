import YazowoNicowo from './yazowonico';
import { config } from 'dotenv';
config();

const options: any = {
  notifyRole: process.env.NOTIFYROLE,
  prefix: process.env.PREFIX,
};
const client = new YazowoNicowo(options);

if (!process.env.TOKEN) throw new Error('bruhe you need to give le token');
client.login(process.env.TOKEN);