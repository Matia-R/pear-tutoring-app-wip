import * as React from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { type navLink } from "./navbar/navlinks";
import { SignedIn, SignedOut } from "@clerk/nextjs"
import NavProfileActionsView from "./NavProfileActionsView";
import NavSignInOption from "./NavSignInOption";

export default function NavPopover({ navigation }: { navigation: Array<navLink> }) {

    const router = useRouter()
    //TODO: extract this into a prop when optimizing code (see if it's better / makes sense?)
    //TODO: add some bg styling for hover / click actions
    const navButtonColor: string = router.pathname === '/' ? 'text-white' : 'text-gray-600'

    return (
        <div className="flex items-center justify-center">
            <div className="relative inline-block text-left">
                <Menu>
                    {({ open }) => (
                        <>
                            <span>
                                <Menu.Button className="inline-flex justify-center w-full pl-2 py-2 text-sm font-medium leading-5 focus:outline-none focus:ring-transparent">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className={`block h-6 w-6 ${navButtonColor} focus:outline-none focus:ring-transparent`} aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className={`block h-6 w-6 ${navButtonColor} focus:outline-none focus:ring-transparent`} aria-hidden="true" />
                                    )}
                                </Menu.Button>
                            </span>

                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute mt-2 origin-top-left bg-white border border-gray-200 divide-gray-100 rounded-md shadow-lg outline-none"
                                >
                                    <SignedIn>
                                        <div className="border-b border-b-gray-200 px-4 py-3">
                                            <NavProfileActionsView />
                                        </div>
                                    </SignedIn>
                                    <SignedOut>
                                        <div className="border-b border-b-gray-200 px-4 py-3">
                                            <NavSignInOption />
                                        </div>
                                    </SignedOut>
                                    <div className="py-1 w-[calc(100vw-var(--scrollbar-width)-16px)]">
                                        {navigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="text-gray-600 flex justify-between w-full px-4 py-2 text-md leading-5 text-left hover:bg-gray-100"

                                                >
                                                    {item.name}
                                                </a>
                                            </Menu.Item>

                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div >
    );
}
