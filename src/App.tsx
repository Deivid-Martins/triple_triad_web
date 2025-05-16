import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { GameBoard } from './components/GameBoard/GameBoard';
import { CardProps } from './types/Card';
import { getRandomCards } from './data/randomizeCards';
import { Modal } from './components/Modal/Modal';

export interface PlayerProps {
  name: string;
  points: number;
  cards: CardProps[];
}

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
  const [cards, setCards] = useState<CardProps[]>([]);
  const [playerOne, setPlayerOne] = useState<PlayerProps>(PlayerOneDefault);
  const [playerTwo, setPlayerTwo] = useState<PlayerProps>(PlayerTwoDefault);
  const [playerOnTurn, setPlayerOnTurn] = useState<PlayerProps>(playerOne);
  const [playerOponent, setPlayerOponent] = useState<PlayerProps>(playerTwo);
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  function handleOpenModal() {
    console.log('Abrir modal!');
    setModalIsOpen((prev) => !prev);
  }

  const handleCardSelected = (card: CardProps) => {
    setSelectedCard(card);
  };

  const handleCardPlaced = (index: number) => {
    if (!selectedCard) return;

    const placedCard: CardProps = {
      ...selectedCard,
      index,
      owner: playerOne,
    };

    setCards((prev) => [...prev, placedCard]);

    if (playerOnTurn === playerOne) {
      setPlayerOne((prev) => ({
        ...prev,
        cards: prev.cards.filter((c) => c.name !== selectedCard.name),
      }));
      setPlayerOnTurn(playerTwo);
      setPlayerOponent(playerOne);
    } else {
      setPlayerTwo((prev) => ({
        ...prev,
        cards: prev.cards.filter((c) => c.name !== selectedCard.name),
      }));
      setPlayerOnTurn(playerOne);
      setPlayerOponent(playerTwo);
    }

    setSelectedCard(null);
  };

  useEffect(() => {
    playerOne.cards.map((card) => (card.owner = playerOne));
    playerTwo.cards.map((card) => (card.owner = playerTwo));
    console.log(playerOne);
    console.log(playerTwo);
  }, [playerOne, playerTwo]);

  return (
    <>
      <Header />
      <GameBoard
        cards={cards}
        onCardSelected={handleCardSelected}
        onCardPlaced={handleCardPlaced}
        playerOne={playerOne}
        playerTwo={playerOne}
        selectedCard={selectedCard}
        handleOpenModal={handleOpenModal}
      />
      <Modal
        isOpen={modalIsOpen}
        playerOnTurn={playerOnTurn}
        playerOponent={playerOponent}
      />
    </>
  );
}
