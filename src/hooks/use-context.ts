import { createContext, useContext } from 'react';

import { AppContextType } from '@/types/context';

const defaultState: AppContextType = {
    user: {},
    setUser: () => {},
};

export const AppContext = createContext<AppContextType>(defaultState);

export const useAppContext = () => useContext(AppContext);
