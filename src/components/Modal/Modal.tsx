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
          {playerOnTurn.cards.map((card) => (
            <div
              key={card.name}
              className="card-slot usable"
              onClick={() => onCardClick(card)}
            >
              <span className="power-up">
                {card.powers.up === 10 ? 'A' : card.powers.up}
              </span>
              <span className="power-left">
                {card.powers.left === 10 ? 'A' : card.powers.left}
              </span>
              <h4 className="card-name">{card.name}</h4>
              <span className="power-right">
                {card.powers.right === 10 ? 'A' : card.powers.right}
              </span>
              <span className="power-down">
                {card.powers.down === 10 ? 'A' : card.powers.down}
              </span>
            </div>
          ))}
        </div>

        <h3>Opponent: {playerOpponent.name}</h3>
        <div className="hand opponent">
          {playerOpponent.cards.map((card) => (
            <div key={card.name} className="card-slot small">
              <span className="power-up">{card.powers.up}</span>
              <span className="power-left">{card.powers.left}</span>
              <h4 className="card-name">{card.name}</h4>
              <span className="power-right">{card.powers.right}</span>
              <span className="power-down">{card.powers.down}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
