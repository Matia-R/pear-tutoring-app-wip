import { type ReactNode, type FunctionComponent } from "react";

type centeredFormDivProps = {
    children?: ReactNode
}

export const CenteredFormDiv: FunctionComponent<centeredFormDivProps> = (props: centeredFormDivProps) => {
    return (
        <div className='flex h-full justify-center align-middle pt-10'>
            <div className="bg-white border border-gray-100 rounded-lg shadow-lg outline-none p-7 xs:w-auto w-[80%]">
                {props?.children}
            </div>
        </div>
    )
}