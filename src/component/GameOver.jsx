import React from 'react'

export default function GameOver({winner,Restart}){
  return (
    <div id="game-over">
        <h2>Game Over!</h2>
        {winner?<p>{winner} won!</p>:<p>it's a DRAW!</p>}
        <p>
            <button onClick={Restart}>Rematch!</button>
        </p>
    </div>
  )
}
