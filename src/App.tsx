import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { GameBoard } from './components/GameBoard/GameBoard';
import { Modal } from './components/Modal/Modal';
import { CardProps } from './types/Card';
import { PlayerProps } from './types/Player';
import { getRandomCards } from './data/randomizeCards';
import {
  placeCard as logicPlaceCard,
  getWinner,
  isGameOver,
} from './gameLogic';
import { PlayersInfo } from './components/PlayersInfo/PlayersInfo';
import { Congratulations } from './components/Congratulations/Congratulations';

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
  const [board, setBoard] = useState<(CardProps | null)[]>(Array(9).fill(null));
  const [playerOne, setPlayerOne] = useState<PlayerProps>(PlayerOneDefault);
  const [playerTwo, setPlayerTwo] = useState<PlayerProps>(PlayerTwoDefault);
  const [playerOnTurn, setPlayerOnTurn] = useState<PlayerProps>(playerOne);
  const [playerOpponent, setPlayerOpponent] = useState<PlayerProps>(playerTwo);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameWinner, setGameWinner] = useState<PlayerProps | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const placeCard = (card: CardProps) => {
    if (selectedIndex === null) return;

    const { board: newBoard, captures } = logicPlaceCard(board, selectedIndex, {
      ...card,
      index: selectedIndex,
    });
    setBoard(newBoard);

    if (playerOnTurn.name === playerOne.name) {
      setPlayerOne((p) => ({ ...p, points: p.points + captures }));
      setPlayerTwo((p) => ({ ...p, points: p.points - captures }));
    } else {
      setPlayerTwo((p) => ({ ...p, points: p.points + captures }));
      setPlayerOne((p) => ({ ...p, points: p.points - captures }));
    }

    if (playerOnTurn.name === playerOne.name) {
      setPlayerOne((p) => ({
        ...p,
        cards: p.cards.filter((c) => c.name !== card.name),
      }));
    } else {
      setPlayerTwo((p) => ({
        ...p,
        cards: p.cards.filter((c) => c.name !== card.name),
      }));
    }

    const nextPlayer =
      playerOnTurn.name === playerOne.name ? playerTwo : playerOne;
    const nextOpponent =
      playerOnTurn.name === playerOne.name ? playerOne : playerTwo;
    setPlayerOnTurn(nextPlayer);
    setPlayerOpponent(nextOpponent);

    if (isGameOver(newBoard)) {
      const winner = getWinner(newBoard, playerOne, playerTwo);
      if (winner) {
        if (winner.name === playerOne.name) {
          setGameWinner(playerOne);
        } else {
          setGameWinner(playerTwo);
        }
      }
    }

    setModalOpen(false);
    setSelectedIndex(null);
  };

  useEffect(() => {
    playerOne.cards.forEach((c) => (c.owner = playerOne));
    playerTwo.cards.forEach((c) => (c.owner = playerTwo));
  }, [playerOne, playerTwo]);

  if (gameWinner === null) {
    return (
      <>
        <Header />
        <PlayersInfo playerOne={playerOne} playerTwo={playerTwo} />
        <GameBoard
          cards={board.filter((c): c is CardProps => c !== null)}
          playerOne={playerOne}
          handleOpenModal={openModal}
        />
        <Modal
          isOpen={modalOpen}
          playerOnTurn={playerOnTurn}
          playerOpponent={playerOpponent}
          onCardClick={placeCard}
          handleCloseModal={closeModal}
        />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Congratulations winner={gameWinner} />
      </>
    );
  }
}
