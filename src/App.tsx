import { useState } from "react";
import React from "react";

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const PLAYERS: any = {
  X: 'Player 1', 
  O: 'Player 2'
}
const INITIAL_GAME_BOARD: any = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns: any): any {
  let currentPlayer: string = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer
}

function deriveWinner(gameBoard: any, players: any): any{
  let winner: any;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbole: string = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbole: string = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbole: string = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbole && firstSquareSymbole === secondSquareSymbole && secondSquareSymbole === thirdSquareSymbole)
    {
      winner = players[firstSquareSymbole];
    }
  }
  return winner
}

function deriveGameBoard(gameTurns: any): any
{
  let gameBoard: any = [...INITIAL_GAME_BOARD.map((array: any) => [...array])];

  for(const turn of gameTurns) {
      const{ square, player }: any = turn
      const { row, col }: any = square
      gameBoard[row][col] = player
  }
  return gameBoard;
}

function App(): React.JSX.Element {
  // const [activePlayer, setActivePlayer] = useState('X')
  const  [players, setPlayers]: any = useState(PLAYERS);
  const [gameTurns, setGameTurns]: any = useState([])

  const activePlayer: string = deriveActivePlayer(gameTurns);
  const gameBoard: string = deriveGameBoard(gameTurns)
  const winner: string = deriveWinner(gameBoard, players)
  const hasDraw: any = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: any, colIndex: any): any {
    // setActivePlayer((currentPlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns: any) => {
      let currentPlayer: string = deriveActivePlayer(prevTurns);

      const updatedTurns: any = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns]
      return updatedTurns;
    })
  }

  function handleRestart(): any
  {
    setGameTurns([]);
  }

  function handlePlayerNameChange (symbol: string, newName: string): any {
    setPlayers((prevPlayers: any) => {return { ...prevPlayers, [symbol]: newName}; });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
