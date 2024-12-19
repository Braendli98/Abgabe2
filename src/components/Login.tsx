import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import hkaLogo from '../assets/hka-logo.png';
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
        <div className="flex justify-center items-center min-h-[400px] bg-backgroundColor">
        <div className="grid w-full flex-item max-w-sm items-center gap-1.5">
          <div className="text-2xl text-textGray text-center mb-10">
            <strong>Login to your account:</strong>
          </div>
          <Label htmlFor="username" className="text-sm text-textGray">Username</Label>
          <Input type="string" id="username" className="p-2 rounded-md border border-input bg-inputBg" onChange={(e) => setLogin({ ...login, username: e.target.value})}/>
          <Label htmlFor="password" className="text-sm text-textGray">Password</Label>
          <Input type="string" id="password" className="p-2 rounded-md border border-input bg-inputBg" onChange={(e) => setLogin({ ...login, password: e.target.value})}/>
          <Button
            className="w-full bg-mainColor bg-opacity-60 text-white hover:bg-mainColor hover:bg-opacity-70 py-2 rounded-lg mt-16"
            onClick={() => {
                fetchData();
            }}
          >
            Login
          </Button>
        </div>
        <img src={hkaLogo} alt="HKA Logo" className="absolute top-8 right-8" style={{ height: '195px' }}/>
      </div>
    );
}
