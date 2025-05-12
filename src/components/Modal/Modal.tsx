import { PlayerProps } from '../../App';

interface ModaLProps {
  isOpen: boolean;
  player: PlayerProps;
}

export function Modal({ isOpen, player }: ModaLProps) {
  if (isOpen) {
    return <div>Oi</div>;
  }
}
