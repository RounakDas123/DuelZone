import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import Dashboard from './pages/Dashboard';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<AuthPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);

export default RoutesConfig;
