'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Logo } from './Logo';

const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Playground', href: '/playground' }
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {

    return (
        <Disclosure as="nav" className="bg-white shadow-sm">
            {({ open }) => (
                <>
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex items-center flex-shrink-0">
                                    <Logo height={24} />
                                </div>
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                            <span className="sr-only">Open user menu</span>
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
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'flex w-full px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        Sign in
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <div className="flex items-center -mr-2 sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                    <span className="sr-only">Open main menu</span>
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                    )}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="mt-3 space-y-1">
                                <button
                                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    );
}