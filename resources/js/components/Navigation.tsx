import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
    user: {
        name: string;
        email: string;
        role: string;
    };
}

export default function Navigation({ user }: Props) {
    const isAdmin = user.role === 'admin';
    const isCoordinator = user.role === 'coordinator';
    const isWorker = user.role === 'worker';
    const isManager = user.role === 'manager';

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <h1 className="text-xl font-bold">Complaint Management</h1>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            {isAdmin && (
                                <Link
                                    href={route('users.index')}
                                    className={cn(
                                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none',
                                        route().current('users.*')
                                            ? 'border-indigo-400 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    )}
                                >
                                    User Management
                                </Link>
                            )}

                            {(isCoordinator || isWorker || isManager) && (
                                <Link
                                    href={route('complaints.index')}
                                    className={cn(
                                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none',
                                        route().current('complaints.*')
                                            ? 'border-indigo-400 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    )}
                                >
                                    Complaints
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="ml-3 relative">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">
                                    {user.name} ({user.role})
                                </span>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
} 