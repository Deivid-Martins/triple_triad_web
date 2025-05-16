import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { GameBoard } from './components/GameBoard/GameBoard';
import { Modal } from './components/Modal/Modal';
import { CardProps } from './types/Card';
import { PlayerProps } from './types/player';
import { getRandomCards } from './data/randomizeCards';

const PlayerOneDefault: PlayerProps = {
  name: 'Deivid',
  points: 3,
  cards: getRandomCards(),
};

const PlayerTwoDefault: PlayerProps = {
  name: 'Kayke',
  points: 3,
  cards: getRandomCards(),
};

export function App() {
  const [cardsOnBoard, setCardsOnBoard] = useState<CardProps[]>([]);
  const [playerOne, setPlayerOne] = useState<PlayerProps>(PlayerOneDefault);
  const [playerTwo, setPlayerTwo] = useState<PlayerProps>(PlayerTwoDefault);
  const [playerOnTurn, setPlayerOnTurn] = useState<PlayerProps>(playerOne);
  const [playerOpponent, setPlayerOpponent] = useState<PlayerProps>(playerTwo);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const placeCard = (card: CardProps) => {
    if (selectedIndex === null) return;
    const placed: CardProps = { ...card, index: selectedIndex };
    setCardsOnBoard((prev) => [...prev, placed]);

    if (playerOnTurn === playerOne) {
      setPlayerOne((prev: PlayerProps) => ({
        ...prev,
        cards: prev.cards.filter((c: CardProps) => c.name !== card.name),
      }));
      setPlayerOnTurn(playerTwo);
      setPlayerOpponent(playerOne);
    } else {
      setPlayerTwo((prev: PlayerProps) => ({
        ...prev,
        cards: prev.cards.filter((c: CardProps) => c.name !== card.name),
      }));
      setPlayerOnTurn(playerOne);
      setPlayerOpponent(playerTwo);
    }
    setModalOpen(false);
    setSelectedIndex(null);
  };

  useEffect(() => {
    playerOne.cards.forEach((c: CardProps) => (c.owner = playerOne));
    playerTwo.cards.forEach((c: CardProps) => (c.owner = playerTwo));
  }, [playerOne, playerTwo]);

  return (
    <>
      <Header />
      <GameBoard
        cards={cardsOnBoard}
        playerOne={playerOne}
        handleOpenModal={openModal}
      />
      <Modal
        isOpen={modalOpen}
        playerOnTurn={playerOnTurn}
        playerOpponent={playerOpponent}
        onCardClick={placeCard}
      />
    </>
  );
}
