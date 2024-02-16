import type { ReactNode } from "react"
import localFont from 'next/font/local'
import { Sidebar } from "../navigation/Sidebar"
import InAppNavbar from "../navigation/navbar/InAppNavbar"

const rubikFont = localFont({ src: '../../fonts/Rubik-VariableFont_wght.ttf' })

export default function TutorLayout({ children }: { children: ReactNode }) {

    const navLinks = [
        {
            svgIconProps: { src: '/img/student-icon.svg', alt: 'Student Icon', width: 21, height: 21, recolorStyle: 'gray-500' },
            label: 'My Students',
            href: '/tutor/my-students',
        },
        {
            svgIconProps: { src: '/img/calendar-icon.svg', alt: 'Calendar Icon', width: 22, height: 22, recolorStyle: 'gray-500' },
            label: 'My Lessons',
            href: '/tutor/my-lessons',
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