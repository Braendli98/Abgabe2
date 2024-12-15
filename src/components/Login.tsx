import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router';

export default function Login({
    setLoggedIn,
}: {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();

    return (
        <div className="grid w-full flex-item max-w-sm items-center gap-1.5">
            <div style={{ fontSize: '30px' }}>
                <strong>Login to your Account:</strong>
            </div>
            <Label htmlFor="email" style={{ marginTop: '50px' }}>
                E-Mail
            </Label>
            <Input type="email" id="email" />
            <Label htmlFor="password">Password</Label>
            <Input type="string" id="password" />
            <Button
                style={{ marginTop: '50px' }}
                onClick={() => {
                    setLoggedIn(true);
                    navigate('/');
                }}
            >
                Login
            </Button>
        </div>
    );
}
