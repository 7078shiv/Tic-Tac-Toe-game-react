import React, { useState } from "react";
export default function Player({ name, symbol,isActive,onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  return (
    <li className={isActive}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          ></input>
        ) : (
          <span className="player-name">{playerName}</span>
        )}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() =>{setIsEditing((editing) => !editing)
     {isEditing && onChangeName(symbol,playerName)}}
      }>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
