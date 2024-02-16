import { classNames } from "~/utils/tailwind"
import { useAtom } from 'jotai'
import { sidebarOpenState } from "./atoms"
import { SidebarLink, type SidebarLinkProps } from "./SidebarLink"
import { type FunctionComponent } from "react"


interface SidebarProps {
    links: Array<SidebarLinkProps>
}

export const Sidebar: FunctionComponent<SidebarProps> = (props: SidebarProps) => {

    const [openOnMobile] = useAtom(sidebarOpenState)

    return (
        <div>
            <aside
                id="logo-sidebar"
                className={classNames("fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0",
                    openOnMobile ? 'translate-x-0' : '-translate-x-full')}
                aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        {
                            props.links.map(linkProps => (
                                <li key={linkProps.href}>
                                    <SidebarLink {...linkProps} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </aside>
        </div>
    )
}