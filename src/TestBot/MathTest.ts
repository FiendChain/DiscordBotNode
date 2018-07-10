import { server } from "../server";
import { BADQUERY } from "dns";

export class MathTest {
    private question: string;
    private answer: string;
    private timeout: NodeJS.Timer;
    private running: boolean = false;

    public start(channelID: string, difficulty: number = 5): string {
        if(!this.running) {
            var difficulty: number = this.generateQuestion();
            this.timeout = setTimeout(() => this.end(channelID), (difficulty^2)*1000);
            this.running = true;
            return this.question;
        } else {
            return "Game is currently in session!";
        }
    }

    public sendAnswer(answer: string): string {
        if(!this.running) {
            return `Use !math to start a test`;
        }
        if(answer != this.answer) {
            return `${answer} is not the correct answer!`;
        } else {
            this.stop();
            return `Congratulations, you got the correct answer!`;
        }
    }

    private end(channelID: string): void {
        server.sendMessage({
            to: channelID,
            message: `Time is up\nAnswer was ${this.question} = ${this.answer}`,
        });
        this.stop();
    }

    private stop(): void {
        clearTimeout(this.timeout);
        this.running = false;
    }

    private generateQuestion(): number {
        function getExpression(a?: string | number, b?: string | number): string {
            const operands = ["*", "+", "/", "-"];
            function setVariable(variable: string | number): string | number {
                if(!variable) return Math.floor(Math.random() * 10) + 1;
                else          return `(${variable})`;
            }
            a = setVariable(a);
            b = setVariable(b);
            var op: string = operands[Math.floor(Math.random()*operands.length)];
            return `${a} ${op} ${b}`;
        }

        // var difficulty = Math.floor(Math.random()*3);
        var difficulty = 5;
        var question: string = getExpression();
        for(var i = 0; i < difficulty; i++) {
            question = getExpression(getExpression(), question);
        }

        this.question = question;
        this.answer = eval(question);

        return difficulty;
    }
}