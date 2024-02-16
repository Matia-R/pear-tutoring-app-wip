interface GreenInlineLinkProps {
    text: string,
    href: string,
}

export function GreenInlineLink(props: GreenInlineLinkProps) {
    return (
        <a className="text-sm text-green-600 font-medium leading-5 truncate hover:underline focus:outline-none focus:underline" href={props.href}>{props.text}</a>
    )
}