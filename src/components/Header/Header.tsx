import './style.css';
import logo from '../../../public/logo.svg';

export function Header() {
  return (
    <header>
      <a href="#">
        <img src={logo} alt="" />
        <h1>Triple Triad</h1>
      </a>
    </header>
  );
}
