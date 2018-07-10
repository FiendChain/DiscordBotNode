import { Pong } from './Pong';
import { MathTest } from './MathTest';

import { server } from '../server';

export class TestBot {
    private pong = new Pong();
    private mathTest = new MathTest();

    constructor(
        private channelID: string
    ) {}

    public commands(user: string, userID: string, 
                    args: string[], event: WebSocketEventMap): void {
        try {
            switch(args[0]) {
            case 'pong':
                this.sendMessage(this.parsePong(args, user, userID));
                break;
            case 'insult':
                this.sendMessage(this.parseInsult(args, user, userID));
                break;
            case 'kms':
                this.sendMessage(this.parseKMS(userID));
                break;
            case 'gay':
                this.sendMessage(this.parseGay(userID));
                break;
            case 'recursion-crash':
                this.sendMessage("!recursion-crash");
                break;
            case 'math':
                this.sendMessage(this.parseMath(args[1], userID));
                break;
            default:
                throw "Not a valid command!";
            }
        } catch(err) {
            this.sendMessage(`<@${userID}> ${err}`);
        }
    }

    private parsePong(args: string[], user: string, userID: string): string {
        switch(args[1]) {
        case 'place':
            this.pong.placePiece(userID, args[2], args[3]);
            return this.pong.getBoard();
        case 'join':
            if(args[2] && args[2].length > 1) {
                this.pong.addUser({
                    name: user,
                    id: userID,
                    symbol: args[2],
                });
                return `<@${userID}> Joined game of pong`;
            } else {
                throw "Usage: !pong join <symbol>";
            }
        default:
            throw "Incorrect usage of pong";
        }
    }

    private parseInsult(args: string[], user: string, userID: string): string {
        if(args[1]) {
            return `${args[1]} You are retarded!`;
        } else {
            return `<@${userID}> You are retarded!`;
        }
    }

    private parseKMS(userID): string {
        return `<@${userID}> You have killed yourself!`;
    }

    private parseGay(userID: string): string {
        if(Math.random() > 0.5) {
            return `<@${userID}> You are gay`;
        } else {
            return `<@${userID}> You are not gay`;
        }
        
    }

    private parseMath(answer: string, userID: string): string {
        if(answer) {
            return this.mathTest.sendAnswer(answer);
        } else {
            return this.mathTest.start(this.channelID);
        }
    }

    private sendMessage(message: string): void {
        server.sendMessage({
            to: this.channelID,
            message: message,
        });
    }

}