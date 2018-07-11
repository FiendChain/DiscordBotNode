import { server } from "../server";

export class MathTest {
    private question: string;
    private answer: string;
    private timeout: NodeJS.Timer;
    private running: boolean = false;

    public start(channelID: string, difficulty: number = 5): string {
        if(!this.running) {
            var difficulty: number = this.generateQuestion();
            var duration: number = Math.pow(difficulty+2, 3);
            this.timeout = setTimeout(() => this.end(channelID), duration*1000);
            this.running = true;
            return `\"${this.question}\" with ${duration} seconds`;
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
        var isJoke: boolean = Math.random() > 0.5;
        if(isJoke) return this.generateJokeQuestion();
        else       return this.generateNormalQuestion();
    }

    private generateNormalQuestion(): number {
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

        var difficulty = Math.floor(Math.random()*3);
        var question: string = getExpression();
        for(var i = 0; i < difficulty; i++) {
            question = getExpression(getExpression(), question);
        }

        this.question = question;
        this.answer = eval(question);

        return difficulty;
    }

    private generateJokeQuestion(): number {
        this.question = "9 + 10";
        this.answer = "21";
        return 1;
    }
}