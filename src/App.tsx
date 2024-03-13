import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const PLAYERS: any = {
  X: 'Player 1', 
  O: 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns: any) {
  let currentPlayer: any = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer
}

function deriveWinner(gameBoard: any, players: any){
  let winner: any;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbole: any = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbole: any = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbole: any = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbole && firstSquareSymbole === secondSquareSymbole && secondSquareSymbole === thirdSquareSymbole)
    {
      winner = players[firstSquareSymbole];
    }
  }
  return winner
}

function deriveGameBoard(gameTurns: any)
{
  let gameBoard: any = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns) {
      const{ square, player }: any = turn
      const { row, col }: any = square
      gameBoard[row][col] = player
  }
  return gameBoard;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X')
  const  [players, setPlayers]: any = useState(PLAYERS);
  const [gameTurns, setGameTurns]: any = useState([])

  const activePlayer: any = deriveActivePlayer(gameTurns);
  const gameBoard: any = deriveGameBoard(gameTurns)
  const winner: any = deriveWinner(gameBoard, players)
  const hasDraw: any = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: any, colIndex: any): any {
    // setActivePlayer((currentPlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      let currentPlayer: any = deriveActivePlayer(prevTurns);

      const updatedTurns: any = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns]
      return updatedTurns;
    })
  }

  function handleRestart()
  {
    setGameTurns([]);
  }

  function handlePlayerNameChange (symbol: any, newName: any): any {
    setPlayers(prevPlayers => {return { ...prevPlayers, [symbol]: newName}; });
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
