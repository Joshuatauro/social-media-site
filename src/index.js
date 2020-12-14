import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './Components/Context/AuthContext';
import { ThemeProvider } from './Components/Context/GeneralContext';

ReactDOM.render(
  // <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  // </React.StrictMode>,
  ,document.getElementById('root')
);
