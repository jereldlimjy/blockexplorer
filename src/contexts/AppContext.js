import React, { createContext, useContext } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

const AppContext = createContext(null);

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
};

export const AppProvider = ({ children }) => {
  const alchemy = new Alchemy(settings);

  return (
    <AppContext.Provider value={{ alchemy }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
