export interface PongUser {
    name: string;
    id: string;
    symbol: string;
}

export class Pong {
    private board: string[][];
    
    constructor(
        private users: PongUser[],
        private rowSize: number = 3,
        private colSize: number = 3,
    ) {
        this.initBoard(rowSize, colSize);
    }

    public placePiece(userID: string, rowString: string, colString: string): void {
        // check if args exist
        if(rowString == undefined || colString == undefined) {
            throw `Usage: !pong ${this.getValidPositions()}`;
        }
        // check user
        var user: PongUser = this.validateUser(userID);
        // check board index
        var row: number = rowString.charCodeAt(0)-"A".charCodeAt(0);
        var col: number = Number(colString);
        this.checkIndex(row, col)
        // add symbol
        this.board[row][col] = user.symbol;
    }

    public getBoard(): string {
        var board: string = "";
        for(var row = 0; row < this.rowSize; row++) {
            for(var col = 0; col < this.colSize; col++) {
                var symbol: string = this.board[row][col];
                if(symbol) board += `[${symbol}]`;
                else       board += "[]";
            }
            board += "\n";
        }
        return board;
    }

    private initBoard(rowSize: number, colSize: number): void {
        if(rowSize <= 1 || colSize <= 1) {
            throw `Invalid board size of ${rowSize} by ${colSize}`;
        }
        this.board = [];
        for(var row = 0; row < rowSize; row++) {
            this.board.push([]);
            for(var col = 0; col < colSize; col++) {
                this.board[row].push(null);
            }
        }
    }

    private validateUser(userID: string): PongUser {
        var user: PongUser = this.users.filter((user) => user.id == userID)[0];
        if(!user) {
            throw "You are not part of this game!";
        }
        return user;
    }

    private checkIndex(row: number, col: number): void {
        let validPositions = this.getValidPositions();
        if(row == undefined || col == undefined) {
            throw `Usage: !pong ${validPositions}`;
        }
        if(row >= this.rowSize || row < 0 || col >= this.colSize || col < 0) {
            throw `Valid positions are ${validPositions}`;
        }
        if(this.board[row][col] != null) {
            throw "Position has already been taken!";
        }
    }

    private getValidPositions(): string {
        var rowString: string = String.fromCharCode("A".charCodeAt(0) + this.rowSize-1);
        const validPositions: string = `[A..${rowString}] [0..${this.colSize-1}]`;
        return validPositions;
    }




}