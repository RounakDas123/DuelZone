import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import GameLobby from './pages/GameLobby';
import Leaderboards from './pages/Leaderboards';
import NavBar from './navbar/NavBar';
import ViewProfile from './pages/ViewProfile';
import GameSolo from './pages/GameSolo';

const RoutesConfig = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/';

  return(
    <>
    {!isAuthPage && <NavBar />}
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/lobby" element={<GameLobby />} />
      <Route path="/leaderboards" element={<Leaderboards />} />
      <Route path="/profile" element={<ViewProfile />} />
      <Route path="/solo" element={<GameSolo />} />
    </Routes>
    </>
  );
  
};

export default RoutesConfig;
