import * as React from "react";
import { SignedIn, useUser } from "@clerk/nextjs"
import Image from "next/image";

export default function AvatarImage({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) {

    // TODO: Cache image url in browser

    const { user, isLoaded } = useUser()
    const imageLoading = !isLoaded

    return (
        <div
            className='w-9 h-9 outline-none border-none max-w-none'
            onClick={onClick}>
            <SignedIn>
                {imageLoading ?
                    <div className='w-9 h-9 rounded-full bg-gray-100 animate-pulse'></div>
                    :
                    <Image
                        src={user?.profileImageUrl || ''}
                        alt='Rounded Avatar'
                        width='35'
                        height='35'
                        className='rounded-full'
                    />}
            </SignedIn>
        </div>
    )
}