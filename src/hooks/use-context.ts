import { createContext, useContext } from 'react';

import { AppContextType } from '@/types/context';

const defaultState: AppContextType = {
    user: {},
    setUser: () => {},
};

/**
 * AppContext mit einem Standardzustand.
 */
export const AppContext = createContext<AppContextType>(defaultState);

/**
 * Hook um auf aktuellen AppContext zuzugreifen.
 * 
 * @returns AppContext
 */
export const useAppContext = () => useContext(AppContext);
