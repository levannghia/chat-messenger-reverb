import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-secondary">
            <nav className="border-b border-secondary bg-background">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex w-full gap-4">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto" />
                                </Link>
                            </div>

                            <NavLink href={route("chats.index")} active={false}>
                                Chats
                            </NavLink>
                        </div>

                        <div className="ml-auto flex items-center">
                            <Link
                                href={route("logout")}
                                as="button"
                                method="post"
                                className="btn btn-secondary flex items-center gap-2 whitespace-nowrap border-none"
                            >
                                <BsBoxArrowRight />
                                Log out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-background shadow">
                    <div className="mx-auto max-w-7xl p-4 sm:p-6">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
