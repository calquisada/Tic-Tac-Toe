"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Player_1 = __importDefault(require("./components/Player"));
const GameBoard_1 = __importDefault(require("./components/GameBoard"));
const Log_1 = __importDefault(require("./components/Log"));
const winning_combinations_1 = require("./winning-combinations");
const GameOver_1 = __importDefault(require("./components/GameOver"));
const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2'
};
const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}
function deriveWinner(gameBoard, players) {
    let winner;
    for (const combination of winning_combinations_1.WINNING_COMBINATIONS) {
        const firstSquareSymbole = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbole = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbole = gameBoard[combination[2].row][combination[2].column];
        if (firstSquareSymbole && firstSquareSymbole === secondSquareSymbole && secondSquareSymbole === thirdSquareSymbole) {
            winner = players[firstSquareSymbole];
        }
    }
    return winner;
}
function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
    return gameBoard;
}
function App() {
    // const [activePlayer, setActivePlayer] = useState('X')
    const [players, setPlayers] = (0, react_1.useState)(PLAYERS);
    const [gameTurns, setGameTurns] = (0, react_1.useState)([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;
    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer((currentPlayer) => curActivePlayer === 'X' ? 'O' : 'X')
        setGameTurns(prevTurns => {
            let currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns];
            return updatedTurns;
        });
    }
    function handleRestart() {
        setGameTurns([]);
    }
    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => { return Object.assign(Object.assign({}, prevPlayers), { [symbol]: newName }); });
    }
    return (<main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <Player_1.default initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player_1.default initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver_1.default winner={winner} onRestart={handleRestart}/>}
        <GameBoard_1.default onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log_1.default turns={gameTurns}/>
    </main>);
}
exports.default = App;
