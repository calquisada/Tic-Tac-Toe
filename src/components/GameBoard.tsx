import React from "react";


export default function GameBoard({ onSelectSquare, board }: any ): React.JSX.Element {

    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex)
    // {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })

    //     onSelectSquare();
    // }
    return (
        <ol id="game-board">
            {board.map((row: any, rowIndex: number) => (<li key={rowIndex}>
                <ol> {row.map((playerSymbol: string, colIndex: number) => <li key={colIndex}><button onClick={ () => onSelectSquare(rowIndex, colIndex)} disabled={ playerSymbol!== null }> {playerSymbol}</button></li>)} </ol>
            </li>)
            )}
        </ol>
    )
}