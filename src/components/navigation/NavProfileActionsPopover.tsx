import * as React from "react";
import { Popover, Transition } from '@headlessui/react'
import AvatarImage from "../common/AvatarImage";
import NavProfileActionsView from "./NavProfileActionsView";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { LoadingSpinnerDefault } from "../common/LoadingSpinners";

export default function NavProfileActionsPopover() {

    return (
        <Popover>
            <Popover.Button as='div' className="hover:cursor-pointer md:pt-[2px] 2xl:pt-[3px]">
                <AvatarImage />
            </Popover.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel>
                    <div className="absolute z-10 mt-2 -translate-x-[86%] transform bg-white border border-gray-200 divide-gray-100 rounded-md shadow-lg outline-none px-5 py-4">
                        <SignedIn>
                            <NavProfileActionsView />
                        </SignedIn>
                        <SignedOut>
                            <div className='flex justify-center items-center min-w-[15rem] min-h-[6rem]'>
                                <LoadingSpinnerDefault />
                            </div>
                        </SignedOut>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}