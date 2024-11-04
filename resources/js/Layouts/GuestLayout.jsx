import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 justify-center bg-secondary">
            <div className="flex w-11/12 max-w-md flex-col space-y-6 overflow-hidden rounded-lg bg-background p-6 shadow-md">
                <Link href="/" className="mx-auto w-20">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
                {children}
            </div>
        </div>
    );
}
