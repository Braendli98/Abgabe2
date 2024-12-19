import { AlertType, LoginData } from "@/types/login";

import { NavigateFunction } from "react-router";
import { UserData } from "@/types/context";

export async function handleResponse(
    response: Response, 
    setAlert: React.Dispatch<React.SetStateAction<AlertType>>,
    setUser: React.Dispatch<React.SetStateAction<UserData>>, 
    login: LoginData,
    setLogin: React.Dispatch<React.SetStateAction<LoginData>>, 
    navigate: NavigateFunction) {
    switch(response.status) {
        case(200): {
            const content = await response.json();
            setUser({username: login.username, token: content.access_token });
            setLogin({});
            setAlert('none');
            navigate('/');
            break;
        }
        case(401):
        case(403): {
            setAlert('unauthorized');
            break;
        }
        case(500): {
            setAlert('internal');
            break;
        }
        default: {
            setAlert('unexpected');
        }
    }
}