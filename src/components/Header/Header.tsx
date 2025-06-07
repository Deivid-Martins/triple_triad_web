import "./style.css";
import logo from "../../assets/logo.svg";
import { useState } from "react";

export function Header() {
  const [helpIsOpen, setHelpIsOpen] = useState(false);

  function handleModalToggle() {
    setHelpIsOpen(!helpIsOpen);
  }

  if (helpIsOpen) {
    return (
      <header>
        <a href="#">
          <img src={logo} alt="" />
          <h1>Triple Triad</h1>
        </a>
        <button id="help" onClick={handleModalToggle}>
          How To Play
        </button>
        <HelpModal handleModalToggle={handleModalToggle} />
      </header>
    );
  }

  return (
    <header>
      <a href="#">
        <img src={logo} alt="" />
        <h1>Triple Triad</h1>
      </a>
      <button id="help" onClick={handleModalToggle}>
        How To Play
      </button>
    </header>
  );
}

interface HelpModalProps {
  handleModalToggle: () => void;
}

function HelpModal({ handleModalToggle }: HelpModalProps) {
  return (
    <div className="help-backdrop" onClick={handleModalToggle}>
      <main>
        <h2>Basic Rules</h2>
        <p>
          Triple Triad is played on a three-by-three (3x3) square grid of blank
          spaces where the cards will be placed. Each card has four numbers
          (known as ranks) placed in the top left corner; each number
          corresponds to one of the four sides of the card. The ranks range from
          one to ten, with the letter A representing ten. Cards have numbers on
          their sides, and placing a card adjacent to another can flip that card
          if the number on the placed card is higher than the adjacent card. The
          player with the most cards at the end wins.
        </p>
        <h2>Same Rule</h2>
        <p>
          This rule will be applied if your card matches the numbers on two or
          more cards on each side, you will capture those cards.
        </p>
        <h2>All Open</h2>
        <p className="last-line">all cards will be visible to all players</p>
      </main>
    </div>
  );
}
