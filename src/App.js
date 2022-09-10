import React from 'react';
import AppLayout from './layouts';
import { GameProvider } from './game/GameContext';
import Game from './game/Game';

const App = () => (
  <GameProvider>
    <AppLayout className='mainLayout' >
      <Game />
    </AppLayout>
  </GameProvider>
);

export default App;
