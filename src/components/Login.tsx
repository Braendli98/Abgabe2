import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import hkaLogo from '../assets/hka-logo.png';

export default function Login({
  setLoggedIn,
  setPage,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex justify-center items-center min-h-[400px] bg-backgroundColor">
      <div className="grid w-full flex-item max-w-sm items-center gap-1.5">
        <div className="text-2xl text-textGray text-center mb-10">
          <strong>Login to your account:</strong>
        </div>
        <Label htmlFor="email" className="text-sm text-textGray">E-Mail</Label>
        <Input type="email" id="email" className="p-2 rounded-md border border-input bg-inputBg"/>
        <Label htmlFor="password" className="text-sm text-textGray">Password</Label>
        <Input type="string" id="password" className="p-2 rounded-md border border-input bg-inputBg"/>
        <Button
          className="w-full bg-mainColor bg-opacity-60 text-white py-2 rounded-lg mt-16"
          onClick={() => {
            setLoggedIn(true);
            setPage('overview');
          }}
        >
          Login
        </Button>
      </div>
      <img src={hkaLogo} alt="HKA Logo" className="absolute top-3 right-3 h-20"/>
    </div>
  );
}
