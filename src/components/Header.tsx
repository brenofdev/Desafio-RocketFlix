import imgButton from '../assets/shuffle.svg';

import '../styles/header.css'

export function Header() {
  return (
    <div className="header-container">
      <img src={imgButton} alt="RocketFlix" />
      <h1>Não sabe o que assistir?</h1>
      
    </div>
  );
}