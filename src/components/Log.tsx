import React from "react";

export default function Log({turns}: any): React.JSX.Element
{
    return (
        <ol id="log"> 
        {turns.map((turn: any) => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected square {turn.square.row}, {turn.square.col} </li>)}
        </ol>
    );
}