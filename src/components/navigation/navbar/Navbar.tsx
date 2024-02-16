import { Disclosure } from '@headlessui/react'
import { Button } from '../../common/Button'
import { useRouter } from 'next/router'
import NavPopover from '../NavPopover'
import type { navLink } from './navlinks'
import { SignedIn, SignedOut } from "@clerk/nextjs"
import NavProfileActionsPopover from "../NavProfileActionsPopover"
import Image from 'next/image'
import { classNames } from '~/utils/tailwind'

const logoClickedHandler: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.location.href = '/';
}

const signInClickedHandler: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = '/sign-in';
}

export default function Navbar() {

    const router = useRouter()

    const navigation: Array<navLink> = [
        { name: 'About', href: '/', current: router.pathname === '/' },
        // { name: 'Pricing', href: '/pricing', current: router.pathname === '/pricing' },
        { name: 'Become a Tutor', href: '/sign-up/tutor', current: router.pathname === '/sign-up/tutor' },
    ]

    //TODO: (tech-debt) find another way to do this... seems wrong 
    const navLogoTextColor: string = router.pathname === '/' ? 'text-white' : 'text-green-600'
    const navLinksTextColor: string = router.pathname === '/' ? 'text-white' : 'text-gray-500'
    const navLinksTextColorHover: string = router.pathname === '/' ? 'hover:text-white' : 'hover:text-gray-500'
    const navLinksBgColorHover: string = router.pathname === '/' ? 'hover:bg-white' : 'hover:bg-gray-200'

    return (
        <Disclosure as="nav" className="z-10">
            {() => (
                <>
                    <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <NavPopover navigation={navigation} />
                            </div>
                            <div
                                className="font-sans flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div
                                    className="flex items-center hover:cursor-pointer"
                                    onClick={logoClickedHandler}>
                                    {/* TODO: change to next Image */}
                                    <Image
                                        className="block h-8 w-auto lg:hidden"
                                        src={router.pathname === '/' ? '/img/pear-logo-prod.svg' : '/img/pear-logo-prod-green.svg'}
                                        width='8'
                                        height='8'
                                        alt="Pear Tutoring logo"
                                    />
                                    <Image
                                        className="hidden h-8 w-auto lg:block"
                                        src={router.pathname === '/' ? '/img/pear-logo-prod.svg' : '/img/pear-logo-prod-green.svg'}
                                        width='8'
                                        height='8'
                                        alt="Pear Tutoring logo"
                                    />
                                    <h1 className={`${navLogoTextColor} sm:px-4 text-3xl pl-2`}>
                                        Pear Tutoring
                                    </h1>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    `${navLinksTextColor} ${navLinksBgColorHover} hover:bg-opacity-25 focus:outline-none focus:bg-white focus:bg-opacity-25 ${navLinksTextColorHover} transition-all`,
                                                    'rounded-md px-3 py-2 text-xl'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                        <SignedIn>
                                            <NavProfileActionsPopover />
                                        </SignedIn>
                                        <SignedOut>
                                            <Button
                                                buttonStyle={router.pathname === "/" ? "btn-white-flashy" : "btn-solid-green"}
                                                buttonSize="btn-medium"
                                                onClick={signInClickedHandler}>Sign in
                                            </Button>
                                        </SignedOut>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </Disclosure >
    )
}
