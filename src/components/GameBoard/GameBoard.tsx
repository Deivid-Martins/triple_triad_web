import { useEffect, useState } from 'react';
import { CardProps } from '../../types/Card';

interface GameBoardProps {
  cards: CardProps[];
}

export function GameBoard({ cards }: GameBoardProps) {
  const [board, setBoard] = useState<(CardProps | null)[]>([]);

  useEffect(() => {
    const cardsOnBoard = cards.filter((card) => card.index !== undefined);
    setBoard(Array(9).fill(null));

    const newBoard: (CardProps | null)[] = Array(9).fill(null);

    for (const card of cardsOnBoard) {
      newBoard[card.index as number] = card;
    }
    setBoard(newBoard);
  }, [cards]);

  return (
    <ul>
      {board.map((card, index) => {
        if (card === null) {
          return (
            <li key={index}>
              <h2>Empty Place</h2>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <h2>Name: {card.name}</h2>
              <h2>Image: {card.image}</h2>
              <h2>up: {card.powers.up === 10 ? 'A' : card.powers.up}</h2>
              <h2>down: {card.powers.down === 10 ? 'A' : card.powers.down}</h2>
              <h2>left: {card.powers.left === 10 ? 'A' : card.powers.left}</h2>
              <h2>
                right: {card.powers.right === 10 ? 'A' : card.powers.right}
              </h2>
            </li>
          );
        }
      })}
    </ul>
  );
}
