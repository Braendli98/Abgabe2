import { Button } from '../shadcn-ui/button';
import { useNavigate } from 'react-router';

interface ApplicationError {
    type: 'notFound' | 'unexpected';
    error?: string;
}

export default function ErrorComponent({ type, error }: Readonly<ApplicationError>) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-backgroundColor">
            <div className="grid w-8/12 md:w-full flex-item max-w-sm items-center gap-1.5">
                <strong className="text-9xl text-center mb-10">
                    <span style={{ color: 'red' }}>
                        {type === 'notFound' ? 4 : 5}
                    </span>
                    <span
                        style={{ color: 'red' }}
                        className="display-1 fw-bold"
                    >
                        0
                    </span>
                    <span
                        style={{ color: 'red' }}
                        className="display-1 fw-bold"
                    >
                        {type === 'notFound' ? 4 : 0}
                    </span>
                </strong>
                <span className="text-xl text-center">{error}</span>
                <Button
                    className="flex-item mt-4 bg-mainColor bg-opacity-60 text-white"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Zur Startseite
                </Button>
            </div>
        </div>
    );
}
