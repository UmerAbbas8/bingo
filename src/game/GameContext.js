import React, { useState, useContext } from 'react';
import { defaultGameSettings } from '../config';

const GameContext = React.createContext();
const GameContextUpdate = React.createContext();

export const useGameContext = () => useContext(GameContext);
export const useGameContextUpdate = () => useContext(GameContextUpdate);

export const GameProvider = ({ children }) => {
  const [gameSettings, setGameSettings] = useState({
    visible: false,
    winnerNames: [],
    settings: defaultGameSettings
  });

  const updateSettings = (val) => {
    setGameSettings({ ...val });
  }

  return (
    <GameContext.Provider value={gameSettings}>
      <GameContextUpdate.Provider value={updateSettings}>
        {children}
      </GameContextUpdate.Provider>
    </GameContext.Provider>
  );
}