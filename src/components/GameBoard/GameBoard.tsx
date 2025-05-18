import { useEffect, useState } from 'react';
import { CardProps } from '../../types/Card';
import { PlayerProps } from '../../types/Player';
import './style.css';

interface GameBoardProps {
  cards: CardProps[];
  handleOpenModal: (index: number) => void;
  playerOne: PlayerProps;
}

export function GameBoard({
  cards,
  handleOpenModal,
  playerOne,
}: GameBoardProps) {
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
      {board.map((slot, idx) => {
        const slotClass = slot
          ? slot.owner.name === playerOne.name
            ? 'green-slot'
            : 'red-slot'
          : 'empty';

        return (
          <li
            key={idx}
            className={slotClass}
            onClick={() => !slot && handleOpenModal(idx)}
          >
            {slot ? (
              <>
                <span className="power-up">
                  {slot.powers.up === 10 ? 'A' : slot.powers.up}
                </span>
                <span className="power-left">
                  {slot.powers.left === 10 ? 'A' : slot.powers.left}
                </span>
                <h2 className="card-name">{slot.name}</h2>
                <span className="power-right">
                  {slot.powers.right === 10 ? 'A' : slot.powers.right}
                </span>
                <span className="power-down">
                  {slot.powers.down === 10 ? 'A' : slot.powers.down}
                </span>
              </>
            ) : (
              <h2>Empty Place</h2>
            )}
          </li>
        );
      })}
    </ul>
  );
}
