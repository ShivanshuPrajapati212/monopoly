import { Game } from "./Game.js";
import { BUY, GET_BOARD, GET_PLAYERS, GET_SELF, INIT_GAME, ROLL, SELL } from "./messages.js";


export class GameManager{
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket)
    }

    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        // Remove any games that include this socket
        this.games = this.games.filter(g => !g.players.some(p => p.socket === socket));
        if (this.pendingUser === socket) this.pendingUser = null;
    }

    addHandler(socket){
       socket.on("message", (data) => {
            try {
                const message = JSON.parse(data.toString());
    
                if (message.type === INIT_GAME) {
                    if (this.pendingUser) {
                        const game = new Game(this.pendingUser, socket);
                        this.games.push(game);
                        this.pendingUser = null;
                    } else {
                        this.pendingUser = socket;
                    }
                }
    
                    if (message.type === ROLL) {
                        const game = this.games.find(g => g.players.some(p => p.socket === socket));
                        if (game) game.roll(socket);
                    }

                    if (message.type === BUY) {
                        // expect { type: BUY, noOfHouses: number }
                        if (typeof message.noOfHouses !== 'number') return;
                        const game = this.games.find(g => g.players.some(p => p.socket === socket));
                        if (game) game.buy(socket, message.noOfHouses);
                    }

                    if (message.type === SELL) {
                        // expect { type: SELL, idx: number, noOfHouses: number }
                        if (typeof message.idx !== 'number' || typeof message.noOfHouses !== 'number') return;
                        const game = this.games.find(g => g.players.some(p => p.socket === socket));
                        if (game) game.sell(socket, message.idx, message.noOfHouses);
                    }
                    if (message.type === GET_BOARD) {
                        const game = this.games.find(g => g.players.some(p => p.socket === socket));
                        if (game) game.getBoard(socket)
                    }
                    if (message.type === GET_PLAYERS) {
                        const game = this.games.find(g => g.players.some(p => p.socket === socket));
                        if (game) game.getPlayers(socket)
                    }
                    if (message.type === GET_SELF) {
                        const game = this.games.find(g => g.players.some(p => p.socket === socket));
                        if (game) game.getSelf(socket)
                    }
            } catch (error) {
                console.log(error)
            }
        }) 
    }
}
