import { Disclosure } from '@headlessui/react'
import NavProfileActionsPopover from "../NavProfileActionsPopover"
import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { sidebarOpenState } from '../atoms'
import { useUser } from '@clerk/nextjs'

export default function InAppNavbar() {

    const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenState)
    const { user } = useUser()
    const role = user?.unsafeMetadata?.role as string

    return (
        <Disclosure as="nav" className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
            {() => (
                <>
                    <div className="relative z-10 mx-auto pl-3 sm:pr-4">
                        <div className="relative flex h-16">
                            <div
                                className="absolute inset-y-0 left-0 flex items-center sm:hidden"
                                onClick={() => setSidebarOpen(!sidebarOpen)}>
                                {/* Mobile menu button*/}
                                {
                                    sidebarOpen
                                        ? <XMarkIcon className='block h-6 w-6 text-gray-600 focus:outline-none focus:ring-transparent hover:cursor-pointer' aria-hidden="true" />
                                        : <Bars3Icon className='block h-6 w-6 text-gray-600 focus:outline-none focus:ring-transparent hover:cursor-pointer' aria-hidden="true" />
                                }
                            </div>
                            <div
                                className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div
                                    className="flex items-center hover:cursor-pointer select-none"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        window.location.href = `/${role}/my-lessons`
                                    }}>
                                    <Image
                                        className="block h-8 w-auto lg:hidden"
                                        src='/img/pear-logo-prod-green.svg'
                                        width='8'
                                        height='8'
                                        alt="Pear Tutoring logo"
                                    />
                                    <Image
                                        className="hidden h-8 w-auto lg:block"
                                        src='/img/pear-logo-prod-green.svg'
                                        width='8'
                                        height='8'
                                        alt="Pear Tutoring logo"
                                    />
                                    <h1 className='text-green-600 xs:px-4 text-3xl pl-2  sm:mr-0 mr-6'>
                                        Pear Tutoring
                                    </h1>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto ml-6 sm:pr-0">

                                <div className="sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <div className='flex align-middle pt-[1px]'>
                                            <NavProfileActionsPopover />
                                        </div>
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
