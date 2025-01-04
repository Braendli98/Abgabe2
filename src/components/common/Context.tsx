import { AppContextType, UserData } from '@/types/context';
import { ReactNode, createContext, useContext, useState } from 'react';

import { getUserData } from '@/lib/token-handling';

const defaultState: AppContextType = {
    user: {},
    setUser: () => {},
};

const AppContext = createContext<AppContextType>(defaultState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData>(getUserData());
    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
