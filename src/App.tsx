import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { CARDS_LIBRARY } from './data/cards';
import { CardProps } from './types/Card';

export function App() {
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    setCards(CARDS_LIBRARY);
  }, []);

  return (
    <>
      <Header />
    </>
  );
}
