import { PlayerProps } from '../../App';

interface ModaLProps {
  isOpen: boolean;
  playerOnTurn: PlayerProps;
  playerOponent: PlayerProps;
}

export function Modal({ isOpen, playerOnTurn, playerOponent }: ModaLProps) {
  if (isOpen) {
    return <div>oi</div>;
  }
}
