import { ReactNode, useState, useMemo } from 'react';

import { AppContext } from '@/hooks/use-context';
import { UserData } from '@/types/context';
import { getUserData } from '@/lib/token-handling';

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData>(getUserData());

    return (
        <AppContext.Provider
            value={useMemo(() => ({ user, setUser }), [user, setUser])}
        >
            {children}
        </AppContext.Provider>
    );
};
