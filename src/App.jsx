import GameBoard from "./component/GameBoard";
import Log from "./component/Log";
import Player from "./component/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./component/GameOver";

const PLAYERS = {
  X: "Player1",
  O: "Player2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareValue =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareValue =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareValue =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareValue &&
      firstSquareValue === secondSquareValue &&
      firstSquareValue === thirdSquareValue
    ) {
      winner = players[firstSquareValue];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  const gameBoard = deriveGameBoard(gameTurn);
  function derivedActivePlayer(gameTurn) {
    let currentPlayer = "X";
    if (gameTurn.length > 0 && gameTurn[0].player === "X") {
      currentPlayer = "O";
    }
    return currentPlayer;
  }

  const activePlayer = derivedActivePlayer(gameTurn);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurn.length === 9 && !winner;

  function handelSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      let currentPlayer = derivedActivePlayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }
  function handelRestart() {
    setGameTurn([]);
  }

  function handelPlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        {/* player */}
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O" ? "active" : undefined}
            onChangeName={handelPlayerNameChange}
          />
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X" ? "active" : undefined}
            onChangeName={handelPlayerNameChange}
          />
        </ol>
        {/* Game board */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} Restart={handelRestart} />
        )}
        <GameBoard onSelectSquare={handelSelectSquare} board={gameBoard} />
      </div>
      {/* Log */}
      <Log gameTurnValue={gameTurn} />
    </main>
  );
}
export default App;
