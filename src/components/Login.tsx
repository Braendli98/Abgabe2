import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from './Context';
import { useNavigate } from 'react-router';
import { useState } from 'react';

declare interface LoginData {
    username?: string;
    password?: string;
}

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useAppContext();
    const [ login, setLogin ] = useState<LoginData>({});

    const fetchData = async () => {
        try {
            const response = await fetch('api/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${login.username}&password=${login.password}`,
            });
            // Debugging
            console.log(response);

            if (response.ok) {
                const content = await response.json();
                setUser({username: login.username, token: content.access_token });
                setLogin({});
                navigate('/');
            }


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('An Error occured while fetching a token:', error);
        }
    };
    
    return (
        <div className="grid w-full flex-item max-w-sm items-center gap-1.5">
            <div style={{ fontSize: '30px' }}>
                <strong>Login to your Account:</strong>
            </div>
            <Label htmlFor="username" style={{ marginTop: '50px' }} >
                Username
            </Label>
            <Input type="string" id="username" onChange={(e) => setLogin({ ...login, username: e.target.value})} />
            <Label htmlFor="password">Password</Label>
            <Input type="string" id="password" onChange={(e) => setLogin({ ...login, password: e.target.value})} />
            <Button
                style={{ marginTop: '50px' }}
                onClick={() => {
                    fetchData();
                }}
            >
                Login
            </Button>
        </div>
    );
}
