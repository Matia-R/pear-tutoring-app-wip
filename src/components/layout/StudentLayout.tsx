import type { ReactNode } from "react"
import localFont from 'next/font/local'
import { Sidebar } from "../navigation/Sidebar"
import InAppNavbar from "../navigation/navbar/InAppNavbar"

const rubikFont = localFont({ src: '../../fonts/Rubik-VariableFont_wght.ttf' })

export default function StudentLayout({ children }: { children: ReactNode }) {

    const navLinks = [
        {
            svgIconProps: { src: '/img/tutor-icon.svg', alt: 'Tutor Icon', width: 22, height: 22, recolorStyle: 'gray-500' },
            label: 'My Tutor',
            href: '/student/my-tutor',
        },
        {
            svgIconProps: { src: '/img/calendar-icon.svg', alt: 'Calendar Icon', width: 22, height: 22, recolorStyle: 'gray-500' },
            label: 'My Lessons',
            href: '/student/my-lessons',
        }
    ]

    return (
        <div className={rubikFont.className}>
            <InAppNavbar />
            <Sidebar links={navLinks} />
            <main className='flex flex-col min-h-screen mt-14 sm:mt-16 sm:ml-64'>{children}</main>
        </div>
    )
}