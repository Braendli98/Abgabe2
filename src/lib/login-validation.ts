import { AlertType, LoginData } from '@/types/login';
import { getUserDataFromToken, setToken } from './token-handling';

import { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router';
import { UserData } from '@/types/context';

export function handleSuccess(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any,
    setAlert: React.Dispatch<React.SetStateAction<AlertType>>,
    setUser: React.Dispatch<React.SetStateAction<UserData>>,
    setLogin: React.Dispatch<React.SetStateAction<LoginData>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
    navigate: NavigateFunction,
    callback: string,
) {
    const userData = getUserDataFromToken(content.access_token);
    if (userData === undefined) {
        setAlert('unexpected');
        return;
    }
    setToken(content.access_token);
    setUser(userData);
    setLogin({});
    setAlert('none');
    navigate(callback);
    toast({
        variant: 'success',
        description: `Du bist jetzt als ${userData.username} angemeldet.`,
    });
}

export function handleFailure(
    response: AxiosResponse,
    setAlert: React.Dispatch<React.SetStateAction<AlertType>>,
) {
    switch (response.status) {
        case 401:
        case 403: {
            setAlert('unauthorized');
            break;
        }
        case 500: {
            setAlert('internal');
            break;
        }
        default: {
            setAlert('unexpected');
        }
    }
}
