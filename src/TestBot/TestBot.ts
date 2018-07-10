import * as Discord from 'discord.io';
import { Pong } from './Pong';

export class TestBot {
    private pong: Pong = new Pong();

    constructor(
        private channelID: string
    ) {}

    public commands(server: Discord.Client, user: string, userID: string, 
                    args: string[], event: WebSocketEventMap): void {
        
        try {
            switch(args[0]) {
            case 'pong':
                if(args[1] == 'place') {
                    this.pong.placePiece(userID, args[2], args[3]);
                    server.sendMessage({
                        to: this.channelID,
                        message: this.pong.getBoard(),
                    });
                    break;
                } else if(args[1] == 'join') {
                    if(args[2] && args[2].length > 1) {
                        this.pong.addUser({
                            name: user,
                            id: userID,
                            symbol: args[2],
                        });
                        server.sendMessage({
                            to: this.channelID,
                            message: `<@${userID}> Joined game of pong`,
                        });
                        break;
                    } else {
                        throw "Usage: !pong join <symbol>";
                    }
                }
            case 'insult':
                if(args[1]) {
                    server.sendMessage({
                        to: this.channelID,
                        message: `${args[1]} You are retarded!`,
                    });
                    break;
                } else {
                    server.sendMessage({
                        to: this.channelID,
                        message: `<@${userID}> You are retarded!`,
                    });
                    break;
                }
            default:
                throw "Not a valid command!";
            }
        } catch(err) {
            server.sendMessage({
                to: this.channelID,
                message: `<@${userID}> ${err}`,
            });
        }
    }
}