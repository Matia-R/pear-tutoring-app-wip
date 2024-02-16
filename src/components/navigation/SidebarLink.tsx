import { type SvgIconProps, SvgIcon } from "../common/SvgIcons"
import { type FunctionComponent } from "react"

export type SidebarLinkProps = {
    svgIconProps: SvgIconProps,
    label: string,
    href: string,
}

export const SidebarLink: FunctionComponent<SidebarLinkProps> = (props: SidebarLinkProps) => {
    return (
        <a href={props.href} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
            <SvgIcon {...props.svgIconProps} />
            <span className="ml-3 text-gray-500">{props.label}</span>
        </a>
    )
}