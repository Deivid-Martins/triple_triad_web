import { PlayerProps } from '../../types/Player.ts';
import './style.css';

interface PlayersInfoProps {
  playerOne: PlayerProps;
  playerTwo: PlayerProps;
}

export function PlayersInfo({ playerOne, playerTwo }: PlayersInfoProps) {
  return (
    <main className="players-container">
      <PlayerInfo player={playerOne} />
      <PlayerInfo player={playerTwo} />
    </main>
  );
}

interface PlayerInfoProps {
  player: PlayerProps;
}

function PlayerInfo({ player }: PlayerInfoProps) {
  return (
    <div className="player">
      <h2>{player.name}</h2>
      <p>Points: {player.points}</p>
    </div>
  );
}
