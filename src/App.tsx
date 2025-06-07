import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { Modal } from "./components/Modal/Modal";
import { CardProps } from "./types/Card.ts";
import { PlayerProps } from "./types/Player.ts";
import { getRandomCards } from "./data/randomizeCards";
import {
  placeCard as logicPlaceCard,
  getWinner,
  isGameOver,
} from "./gameLogic";
import { PlayersInfo } from "./components/PlayersInfo/PlayersInfo";
import { Congratulations } from "./components/Congratulations/Congratulations";

const PlayerOneDefault: PlayerProps = {
  name: "Deivid",
  points: 3,
  cards: getRandomCards(),
  yourTurn: true,
};

const PlayerTwoDefault: PlayerProps = {
  name: "Kayke",
  points: 3,
  cards: getRandomCards(),
  yourTurn: false,
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

    let newP1: PlayerProps;
    let newP2: PlayerProps;

    if (playerOnTurn.name === playerOne.name) {
      newP1 = {
        ...playerOne,
        points: playerOne.points + captures,
        cards: playerOne.cards.filter((c: CardProps) => c.name !== card.name),
      };
      newP2 = {
        ...playerTwo,
        points: playerTwo.points - captures,
      };
    } else {
      newP2 = {
        ...playerTwo,
        points: playerTwo.points + captures,
        cards: playerTwo.cards.filter((c: CardProps) => c.name !== card.name),
      };
      newP1 = {
        ...playerOne,
        points: playerOne.points - captures,
      };
    }

    setPlayerOne(newP1);
    setPlayerTwo(newP2);

    if (playerOnTurn.name === playerOne.name) {
      setPlayerOne((prev) => {
        return {
          ...prev,
          yourTurn: false,
        };
      });

      setPlayerTwo((prev) => {
        return {
          ...prev,
          yourTurn: true,
        };
      });

      setPlayerOnTurn(newP2);
      setPlayerOpponent(newP1);
    } else {
      setPlayerTwo((prev) => {
        return {
          ...prev,
          yourTurn: false,
        };
      });

      setPlayerOne((prev) => {
        return {
          ...prev,
          yourTurn: true,
        };
      });

      setPlayerOnTurn(newP1);
      setPlayerOpponent(newP2);
    }

    if (isGameOver(newBoard)) {
      const winner = getWinner(newP1, newP2);
      if (winner?.name === newP1.name) setGameWinner(newP1);
      else if (winner?.name === newP2.name) setGameWinner(newP2);
    }

    setModalOpen(false);
    setSelectedIndex(null);
  };

  useEffect(() => {
    playerOne.cards.forEach((c: CardProps) => (c.owner = playerOne));
    playerTwo.cards.forEach((c: CardProps) => (c.owner = playerTwo));
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
