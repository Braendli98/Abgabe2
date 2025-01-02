import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastIcon,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/ui/toast';

import { useToast } from '@/hooks/use-toast';

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({
                id,
                title,
                description,
                action,
                ...props
            }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            <div className="flex flex-row space-x-2">
                                <ToastIcon
                                    style={{ marginRight: '10px' }}
                                    {...props}
                                ></ToastIcon>
                                {title && <ToastTitle>{title}</ToastTitle>}
                            </div>
                            {description && (
                                <ToastDescription>
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
