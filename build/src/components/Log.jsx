"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Log({ turns }) {
    return (<ol id="log"> 
        {turns.map((turn) => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected square {turn.square.row}, {turn.square.col} </li>)}
        </ol>);
}
exports.default = Log;
