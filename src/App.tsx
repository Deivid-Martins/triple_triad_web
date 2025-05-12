import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { GameBoard } from './components/GameBoard/GameBoard';
import { CardProps } from './types/Card';
import { getRandomCards } from './data/randomizeCards';

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

  useEffect(() => {
    console.log(playerOne);
    console.log(playerTwo);
  }, [playerOne, playerTwo]);

  return (
    <>
      <Header />
      <GameBoard cards={cards} />
    </>
  );
}
