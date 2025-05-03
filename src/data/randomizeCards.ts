import { CARDS_LIBRARY } from './cards';
import { CardProps } from '../types/Card';

/**
 * Retorna um array de CardProps com `count` cartas aleatórias sem repetição.
 * @param count Número de cartas a serem retornadas (padrão: 5)
 */
export function getRandomCards(count = 5): CardProps[] {
  return getRandomCardsFromDeck([...CARDS_LIBRARY], count);
}

/**
 * Gera as mãos de dois jogadores com 5 cartas cada.
 */
export function dealHands(): { player1: CardProps[]; player2: CardProps[] } {
  const deck = [...CARDS_LIBRARY];
  const player1 = getRandomCardsFromDeck(deck, 5);
  const player2 = getRandomCardsFromDeck(deck, 5);
  return { player1, player2 };
}

/**
 * Função auxiliar para sortear `count` cartas de um deck dado.
 */
function getRandomCardsFromDeck(deck: CardProps[], count: number): CardProps[] {
  const selected: CardProps[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    selected.push(deck.splice(randomIndex, 1)[0]);
  }

  return selected;
}
