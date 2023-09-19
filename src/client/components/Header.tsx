import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { Logo } from './Logo';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
    { name: 'Dashboard', href: '/' },
];


export default function Header() {
    const { logout } = useAuth();

    return (
        <header className="bg-white shadow-sm">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex">
                        <div className="flex items-center flex-shrink-0">
                            <Logo height={24} />
                        </div>
                        <div className="ml-4 sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'border-slate-800 text-gray-900',
                                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                    )}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className=" sm:ml-6 sm:flex sm:items-center">
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                    <span className="sr-only">Open user menu</span>
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={logout}
                                                className={cn(
                                                    active ? 'bg-gray-100' : '',
                                                    'flex w-full px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                Log out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
}