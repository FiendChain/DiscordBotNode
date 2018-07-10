import { TestBot } from './TestBot';

interface BotList {
    [channelID: string]: TestBot;
}

export class Router {
    private botList: BotList = {};
    

    constructor() {}

    private fetchBot(channelID: string): TestBot {
        if(this.botList[channelID] === undefined) {
            this.botList[channelID] = new TestBot(channelID);
            console.log(`Created bot for ${channelID}`);
        }
        return this.botList[channelID];
    }

    public routes(user: string, userID: string, channelID: string, 
                  message: string, event: WebSocketEventMap): void 
    {
        var bot: TestBot = this.fetchBot(channelID);
        if(message.substring(0, 1) == '!') {
            var args: string[] = message.substring(1).split(" ");
            bot.commands(user, userID, args, event);
        }
    }
}