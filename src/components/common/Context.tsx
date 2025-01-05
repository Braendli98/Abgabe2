import { ReactNode, useState } from 'react';

import { AppContext } from '@/hooks/use-context';
import { UserData } from '@/types/context';

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData>({});
    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};
