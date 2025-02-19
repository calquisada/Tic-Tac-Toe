"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GameOver({ winner, onRestart }) {
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>{winner} It is a draw!</p>}
        <p><button onClick={onRestart}>Rematch!</button></p>
    </div>;
}
exports.default = GameOver;
