import { ReactNode, useMemo, useState } from 'react';

import { AppContext } from '@/hooks/use-context';
import { UserData } from '@/types/context';
import { getUserData } from '@/lib/utils/token-handling';

/**
 * Rendert eine AppProvider Komponente.
 * Diese erlaubt es den state *user* als Kontext in jeder Komponente die von AppProvider gewrappt wird zu verwenden.
 * 
 * @param props React Props mit Attribut `children`  
 * `children` ReactNode die von einem AppContext.Provider gewrappt wird
 * @returns Einen AppContext.Provider
 */
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
