import React from 'react';
import styles from './GameLobby.module.css';
import { useNavigate } from 'react-router-dom';

const GameLobby = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.lobbyContainer}>
      <h1>DuelZone Lobby</h1>
      <p>Choose a mode to start the game:</p>
      <div className={styles.modeButtons}>
        <button>Play with Friend</button>
        <button onClick={() => navigate('/solo')}>Play vs AI</button>
      </div>
    </div>
  );
};

export default GameLobby;
