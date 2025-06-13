import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './routes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="colored"
      />
        <BrowserRouter>
            <RoutesConfig />
        </BrowserRouter>
    </div>
  );
}

export default App;
