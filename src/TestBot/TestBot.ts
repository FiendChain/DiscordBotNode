import * as Discord from 'discord.io';
import { Pong } from './Pong';

export class TestBot {
    private pong: Pong;

    constructor(
        private channelID: string
    ) {}

    public commands(server: Discord.Client, user: string, userID: string, 
                    args: string[], event: WebSocketEventMap): void {
        if(!this.pong) {
            this.pong = new Pong([{
                name: user,
                id: userID,
                symbol: 'X',
            }])
        }
        try {
            if(args[0] == 'pong') {
                this.pong.placePiece(userID, args[1], args[2]);
                server.sendMessage({
                    to: this.channelID,
                    message: this.pong.getBoard(),
                });
            } else {
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