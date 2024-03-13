"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function Player({ initialName, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [playerName, setPlayerName] = (0, react_1.useState)(initialName);
    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    let btnCaption = 'Edit';
    if (isEditing) {
        editablePlayerName = <input type='text' required defaultValue={playerName} onChange={handleChange}></input>;
        btnCaption = 'Save';
    }
    return (<li className={isActive ? 'active' : ''}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick()}>{btnCaption}</button>
        </li>);
}
exports.default = Player;
