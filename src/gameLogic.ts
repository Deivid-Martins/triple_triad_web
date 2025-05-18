import { CardProps } from './types/Card';
import { PlayerProps } from './types/Player';

/**
 * Retorna se o jogo acabou (quando 9 cartas já foram usadas)
 */
export function isGameOver(board: (CardProps | null)[]): boolean {
  return board.filter((slot) => slot != null).length >= 9;
}

/**
 * Conta cartas de cada jogador e declara vencedor (ou null se empate)
 */
export function getWinner(
  board: (CardProps | null)[],
  playerOne: PlayerProps,
  playerTwo: PlayerProps,
): PlayerProps | null {
  let count1 = 0;
  let count2 = 0;
  for (const slot of board) {
    if (!slot) continue;
    if (slot.owner!.name === playerOne.name) count1++;
    else count2++;
  }
  if (count1 > count2) return playerOne;
  if (count2 > count1) return playerTwo;
  return null;
}

/**
 * Insere uma carta no tabuleiro, aplica regras de captura (comum + Same)
 * e retorna o novo board junto com a quantidade de cartas capturadas.
 * @param board atual (array 9 slots)
 * @param index posição 0-8 onde colocar
 * @param card carta a inserir
 * @returns novo board e número de captures para pontuação
 */
export function placeCard(
  board: (CardProps | null)[],
  index: number,
  card: CardProps,
): { board: (CardProps | null)[]; captures: number } {
  // clone do board
  const newBoard = board.slice();
  newBoard[index] = { ...card, index };

  // check common flips
  const commonCaptures = checkCommon(newBoard, index);
  // check same rule flips
  const sameCaptures = checkSameRule(newBoard, index);

  // combina e aplica flips
  const allFlips = Array.from(new Set([...commonCaptures, ...sameCaptures]));
  for (const flipIdx of allFlips) {
    if (newBoard[flipIdx]) newBoard[flipIdx]!.owner = { ...card.owner! };
  }

  return { board: newBoard, captures: allFlips.length };
}

// Deltas para vizinhança: deslocamento no array e direção oposta para comparar
const deltas: Record<
  keyof CardProps['powers'],
  { idx: number; opp: keyof CardProps['powers'] }
> = {
  up: { idx: -3, opp: 'down' },
  down: { idx: 3, opp: 'up' },
  left: { idx: -1, opp: 'right' },
  right: { idx: 1, opp: 'left' },
};

/**
 * Aplica regra comum: sempre que valor maior que vizinho, captura
 */
function checkCommon(board: (CardProps | null)[], index: number): number[] {
  const flips: number[] = [];
  const placed = board[index]!;

  for (const dir of Object.keys(deltas) as (keyof typeof deltas)[]) {
    const { idx, opp } = deltas[dir];
    const ni = index + idx;
    // validação de bordas
    if (ni < 0 || ni > 8) continue;
    if (
      (dir === 'left' && index % 3 === 0) ||
      (dir === 'right' && index % 3 === 2)
    )
      continue;
    const neighbor = board[ni];
    if (!neighbor) continue;
    if (neighbor.owner!.name === placed.owner!.name) continue;
    const mine = placed.powers[dir];
    const theirs = neighbor.powers[opp];
    if (mine > theirs) flips.push(ni);
  }
  return flips;
}

/**
 * Aplica regra "Same": se duas bordas iguais, captura vizinhos nas duas direções
 */
function checkSameRule(board: (CardProps | null)[], index: number): number[] {
  type Dir = keyof typeof deltas;
  const matches: Dir[] = [];
  const placed = board[index]!;

  for (const dir of Object.keys(deltas) as Dir[]) {
    const { idx, opp } = deltas[dir];
    const ni = index + idx;
    if (ni < 0 || ni > 8) continue;
    if (
      (dir === 'left' && index % 3 === 0) ||
      (dir === 'right' && index % 3 === 2)
    )
      continue;
    const neighbor = board[ni];
    if (!neighbor) continue;
    if (placed.powers[dir] === neighbor.powers[opp]) {
      matches.push(dir);
    }
  }

  const flips: number[] = [];
  for (let i = 0; i < matches.length; i++) {
    for (let j = i + 1; j < matches.length; j++) {
      const dirs: Dir[] = [matches[i], matches[j]];
      for (const d of dirs) {
        const ni = index + deltas[d].idx;
        if (board[ni]) flips.push(ni);
      }
    }
  }
  return flips;
}
