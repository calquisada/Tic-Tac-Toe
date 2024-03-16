import React from 'react'
import { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onChangeName }: any): React.JSX.Element {

    const [isEditing, setIsEditing]: any = useState(false)
    const [playerName, setPlayerName]: any = useState(initialName)

    function handleEditClick(): any {
        setIsEditing((editing: any) => !editing)

        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }
    function handleChange(event: any): any {
        setPlayerName(event.target.value)
    }
    let editablePlayerName: any = <span className='player-name'>{playerName}</span>;
    let btnCaption: any = 'Edit'

    if (isEditing) {
        editablePlayerName = <input type='text' required defaultValue={playerName} onChange={handleChange}></input>;
        btnCaption = 'Save'

    }
    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick()}>{btnCaption}</button>
        </li>
    )
}