import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './default/theme';

import AppRoutes from './Routes';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
