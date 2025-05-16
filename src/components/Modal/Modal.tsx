import './style.css';
import { PlayerProps } from '../../types/Player';
import { CardProps } from '../../types/Card';

interface ModalProps {
  isOpen: boolean;
  playerOnTurn: PlayerProps;
  playerOpponent: PlayerProps;
  onCardClick: (card: CardProps) => void;
}

export function Modal({
  isOpen,
  playerOnTurn,
  playerOpponent,
  onCardClick,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{playerOnTurn.name}'s Turn</h3>
        <div className="hand">
          {playerOnTurn.cards.map((card: CardProps) => (
            <div key={card.name} className="card">
              <h4>{card.name}</h4>
              <div className="powers">
                <span>U: {card.powers.up}</span>
                <span>D: {card.powers.down}</span>
                <span>L: {card.powers.left}</span>
                <span>R: {card.powers.right}</span>
              </div>
              <button onClick={() => onCardClick(card)}>Play</button>
            </div>
          ))}
        </div>
        <h3>Opponent: {playerOpponent.name}</h3>
        <div className="hand opponent">
          {playerOpponent.cards.map((card: CardProps) => (
            <div key={card.name} className="card small">
              <h4>{card.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
