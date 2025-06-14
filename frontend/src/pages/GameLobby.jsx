import React from 'react';
import styles from './GameLobby.module.css';
import { useNavigate } from 'react-router-dom';

const GameLobby = () => {
  return (
    <div className={styles.lobbyContainer}>
      <h1>DuelZone Lobby</h1>
      <p>Choose a mode to start the game:</p>
      <div className={styles.modeButtons}>
        <button>Play with Friend</button>
        <button>Play vs AI</button>
      </div>
    </div>
  );
};

export default GameLobby;
