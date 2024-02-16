import type { ReactNode } from "react"
import Navbar from "../navigation/navbar/Navbar"
import Footer from "./Footer"
import localFont from 'next/font/local'

const rubikFont = localFont({ src: '../../fonts/Rubik-VariableFont_wght.ttf' })

export default function Layout({ children }: { children: ReactNode }) {

    return (
        <div className={rubikFont.className}>
            <Navbar />
            <main className='flex flex-col min-h-screen'>{children}</main>
            <Footer />
        </div>
    )
}