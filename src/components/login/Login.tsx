import { AlertType, LoginData } from '@/types/login';
import { handleFailure, handleSuccess } from '@/lib/login-validation';
import { useNavigate, useSearchParams } from 'react-router';

import { AxiosResponse } from 'axios';
import Breadcrumbs from '../common/Breadcrumbs';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import LoginAlert from './LoginAlert';
import { apiPost } from '@/lib/api/api-handler';
import { getBreadcrumbComponents } from '@/lib/breadcrumb-utils';
import hkaLogo from '../../assets/hka-logo.png';
import { useAppContext } from '@/hooks/use-context';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setUser } = useAppContext();
    const { toast } = useToast();
    const [login, setLogin] = useState<LoginData>({});
    const [alert, setAlert] = useState<AlertType>('none');

    const callback = searchParams.get('callback') ?? '/';

    const fetchData = () =>
        apiPost(
            'api/auth/token',
            { username: login.username, password: login.password },
            (response: AxiosResponse) =>
                handleSuccess(
                    response.data,
                    setAlert,
                    setUser,
                    setLogin,
                    toast,
                    navigate,
                    callback,
                ),
            (status: number) => handleFailure(status, setAlert),
            {
                noCache: true,
                token: false,
                contentType: 'application/x-www-form-urlencoded',
            },
        );

    return (
        <div className="flex justify-center items-center min-h-[400px] w-4/12 bg-backgroundColor">
            <div className="absolute top-8 left-8">
                <Breadcrumbs
                    path={[
                        ...getBreadcrumbComponents(callback),
                        { base: 'login' },
                    ]}
                />
            </div>
            <div className="grid w-full flex-item max-w-sm items-center gap-1.5">
                <div className="text-2xl text-textGray text-center mb-10">
                    <strong>Melde dich mit deinem Account an:</strong>
                </div>
                {alert !== 'none' && <LoginAlert alertType={alert} />}
                <Label
                    htmlFor="username"
                    className="text-sm text-textGray"
                    data-cy="username-label"
                >
                    Benutzername
                </Label>
                <Input
                    type="string"
                    id="username"
                    className="p-2 rounded-md border border-input bg-inputBg"
                    onChange={(e) =>
                        setLogin({ ...login, username: e.target.value })
                    }
                />
                <Label
                    htmlFor="password"
                    className="text-sm text-textGray"
                    data-cy="password-label"
                >
                    Passwort
                </Label>
                <Input
                    type="password"
                    id="password"
                    className="p-2 rounded-md border border-input bg-inputBg"
                    onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                    }
                />
                <Button
                    className="w-full bg-mainColor bg-opacity-60 text-white hover:bg-mainColor hover:bg-opacity-70 py-2 rounded-lg mt-16"
                    disabled={!isButtonEnabled(login)}
                    onClick={() => {
                        fetchData();
                    }}
                    data-cy="login-button"
                >
                    Anmelden
                </Button>
            </div>
            <img
                src={hkaLogo}
                alt="HKA Logo"
                className="absolute top-8 right-8"
                style={{ height: '195px' }}
            />
        </div>
    );
}

function isButtonEnabled(loginData: LoginData) {
    return (
        loginData.username &&
        loginData.username.length > 0 &&
        loginData.password &&
        loginData.password.length > 0
    );
}
