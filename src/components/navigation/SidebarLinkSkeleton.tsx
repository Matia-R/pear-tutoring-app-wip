import { type FunctionComponent } from "react"

export const SidebarLinkSkeleton: FunctionComponent = () => {
    return (
        <div className="flex p-3.5 items-center rounded-lg animate-pulse group">
            <div className="h-2.5 w-full bg-gray-100 text-gray-500 rounded-lg"></div>
        </div>
    )
}