import { ReactNode, useMemo, useState } from 'react';

import { AppContext } from '@/hooks/use-context';
import { UserData } from '@/types/context';
import { getUserData } from '@/lib/token-handling';

/**
 * Rendert eine AppProvider Komponente.
 * Diese erlaubt es den state *user* als Kontext in jeder Komponente die von AppProvider gewrappt wird zu verwenden.
 * 
 * @param { children }: React Props deren einziges Attribut *children* eine ReactNode ist. Dieses wird von einem AppContext.Provider gewrappt.
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
