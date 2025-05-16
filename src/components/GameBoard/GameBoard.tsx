import { useEffect, useState } from 'react';
import { CardProps } from '../../types/Card';
import './style.css';

interface GameBoardProps {
  cards: CardProps[];
  handleOpenModal: (index: number) => void;
}

export function GameBoard({ cards, handleOpenModal }: GameBoardProps) {
  const [board, setBoard] = useState<(CardProps | null)[]>([]);

  useEffect(() => {
    const newBoard: (CardProps | null)[] = Array(9).fill(null);
    cards.forEach((c) => {
      if (c.index !== undefined) newBoard[c.index] = c;
    });
    setBoard(newBoard);
  }, [cards]);

  return (
    <ul id="gameboard">
      {board.map((slot, idx) => (
        <li
          key={idx}
          className={slot ? 'occupied' : 'empty'}
          onClick={() => !slot && handleOpenModal(idx)}
        >
          {slot ? (
            <>
              <h2>{slot.name}</h2>
              <div className="powers">
                <span>Up: {slot.powers.up}</span>
                <span>Down: {slot.powers.down}</span>
                <span>Left: {slot.powers.left}</span>
                <span>Right: {slot.powers.right}</span>
              </div>
            </>
          ) : (
            <h2>Empty Place</h2>
          )}
        </li>
      ))}
    </ul>
  );
}
