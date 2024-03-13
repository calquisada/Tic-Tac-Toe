

export default function GameBoard({ onSelectSquare, board } ): any {

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
            {board.map((row: any, rowIndex: any) => (<li key={rowIndex}>
                <ol> {row.map((playerSymbol: any, colIndex: any) => <li key={colIndex}><button onClick={ () => onSelectSquare(rowIndex, colIndex)} disabled={ playerSymbol!== null }> {playerSymbol}</button></li>)} </ol>
            </li>)
            )}
        </ol>
    )
}