import * as React from "react";
import { useUser, useAuth } from "@clerk/nextjs"
import AvatarImage from "../common/AvatarImage";
import { RightArrowIcon, SettingsGearIcon, SignOutIcon } from "../common/SvgIcons";

const ManageAccountButtonHandler: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.location.href = '/user-settings';
}

export default function NavProfileActionsView() {

    const { user } = useUser()
    const { signOut } = useAuth()
    const currentUserPrimaryEmail: string = user?.primaryEmailAddress ? user.primaryEmailAddress.toString() : 'Error Fetching Email'
    const currentUserFirstName: string = user?.firstName ? user.firstName.toString() : 'Error Fetching Email'
    const currentUserLastName: string = user?.lastName ? user.lastName.toString() : 'Error Fetching Email'
    const role = user?.unsafeMetadata?.role as string

    const signOutButtonHandler = () => {
        async function signOutAction() {
            await signOut().catch(err => alert("An error occured while signing out: " + String(err)))
        }
        void signOutAction()
    }

    return (
        <div className="flex">
            <div className="flex justify-center">
                <AvatarImage />
            </div>
            <div className="pl-4 pr-2">
                <p className="text-gray-700 text-sm font-medium leading-5">{`${currentUserFirstName} ${currentUserLastName}`}</p>
                <p className="text-gray-700 text-sm w-[10rem] leading-5 truncate overflow-ellipses">
                    {currentUserPrimaryEmail}
                </p>
                <div
                    className="flex pt-3 opacity-60 hover:cursor-pointer hover:opacity-80 transition-opacity ease-in-out"
                    onClick={ManageAccountButtonHandler}>
                    <SettingsGearIcon width='12' height='12' />
                    <p className="text-sm leading-5 pl-3">Manage Account</p>
                </div>
                <div
                    className="flex pt-3 opacity-60 hover:cursor-pointer hover:opacity-80 transition-opacity ease-in-out"
                    onClick={signOutButtonHandler}>
                    <SignOutIcon width='12' height='12' />
                    <p className="text-sm leading-5 pl-3">Sign Out</p>
                </div>
            </div>
            {/* Add delayed tooltip on hover (~2s): "Go to dashboard" */}
            <div
                className="justify-end pt-2 opacity-60 hover:cursor-pointer hover:opacity-80 transition-opacity ease-in-out"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/${role}/my-lessons`
                }}>
                <RightArrowIcon width='14' height='14' />
            </div>
        </div>
    )
}