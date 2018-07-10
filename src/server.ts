import * as  Discord  from 'discord.io';
import * as auth from './auth';

import { Router } from './TestBot/Router';

export var server = new Discord.Client({
   token: auth.token,
   autorun: true
});

var router: Router = new Router();

try {
    server.on('ready', function (evt) {
        console.info('Connected');
        console.info('Logged in as: ');
        console.info(server.username + ' - (' + server.id + ')');
    });
    
    server.on('message', router.routes.bind(router));
    // server.on('message', (user: string, userID: string, channelID: string, message: string): void => {
    //     console.log(`${channelID}@${user}-${userID}: ${message}`);
    // });

    console.info('Initialised server!');
} 
catch(error) {
    console.error(error);
}
