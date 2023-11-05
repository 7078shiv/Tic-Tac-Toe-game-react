export default function Log({ gameTurnValue }) {
  return (
    <ol id="log">
      {gameTurnValue.map((gameTurnValueOneByOne) => (
        <li
          key={`${gameTurnValueOneByOne.square.row}${gameTurnValueOneByOne.square.col}`}
        >
          {gameTurnValueOneByOne.player} selected
          {gameTurnValueOneByOne.square.row},{gameTurnValueOneByOne.square.col}{" "}
          field
        </li>
      ))}
    </ol>
  );
}
