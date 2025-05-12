import { useEffect, useState } from 'react';
import { CardProps } from '../../types/Card';

import './style.css';
import { PlayerProps } from '../../App';

interface GameBoardProps {
  cards: CardProps[];
  onCardSelected: (card: CardProps) => void;
  onCardPlaced: (index: number) => void;
  playerOne: PlayerProps;
  playerTwo: PlayerProps;
  selectedCard: CardProps | null;
  handleOpenModal: () => void;
}

export function GameBoard({
  cards,
  onCardSelected,
  onCardPlaced,
  playerOne,
  playerTwo,
  selectedCard,
  handleOpenModal,
}: GameBoardProps) {
  const [board, setBoard] = useState<(CardProps | null)[]>([]);

  useEffect(() => {
    const newBoard: (CardProps | null)[] = Array(9).fill(null);
    for (const card of cards) {
      if (card.index !== undefined) newBoard[card.index] = card;
    }
    setBoard(newBoard);
  }, [cards]);

  function handleClickOnSpaceEmpty() {
    handleOpenModal();
  }

  return (
    <ul id="gameboard">
      {board.map((card, index) => {
        if (card === null) {
          return (
            <li className="empty" key={index} onClick={handleClickOnSpaceEmpty}>
              <h2>Empty Place</h2>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <h2>Name: {card.name}</h2>
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
