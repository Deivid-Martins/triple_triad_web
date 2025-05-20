import { PlayerProps } from '../../types/Player.ts';
import './style.css';

interface CongratulationsProps {
  winner: PlayerProps;
}

export function Congratulations({ winner }: CongratulationsProps) {
  return (
    <main className="winner-container">
      <h2>Congratulations!!!</h2>
      <div className="player-informations">
        <h3>Name: {winner.name}</h3>
        <p>Points: {winner.points}</p>
      </div>
    </main>
  );
}
