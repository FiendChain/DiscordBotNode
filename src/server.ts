import * as  Discord  from 'discord.io';
import * as auth from './auth';

import { Router } from './TestBot/Router';

var logger: Console = console;
var server = new Discord.Client({
   token: auth.token,
   autorun: true
});
var router: Router = new Router(server);

server.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(server.username + ' - (' + server.id + ')');
});

server.on('message', router.routes.bind(router));
// server.on('message', routes);

function routes(user: string, userID: string, channelID: string, 
                message: string, event: WebSocketEventMap): void {
    setInterval(() => {
        server.sendMessage({
            to: channelID,
            message: `<@${userID}> Dicks out for ${user}!`,
        });
    }, 1000);
}