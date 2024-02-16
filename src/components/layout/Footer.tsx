import { FacebookIconLink, InstagramIconLink, TwitterIconLink } from "../common/SocialMediaIconLinks";
import Image from "next/image";

const logoClickedHandler: React.MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.location.href = '/';
}

export default function Footer() {

    return (
        <footer className="bg-white mt-auto">
            <div className="mx-auto w-full max-w-screen p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div
                        className="mb-6 md:mb-0 flex hover:cursor-pointer"
                        onClick={logoClickedHandler}>
                        {/* TODO: change to next Image */}
                        <Image
                            className="block h-8 w-auto"
                            src='/img/pear-logo-prod-green.svg'
                            width='8'
                            height='8'
                            alt="Pear Tutoring logo"
                        />
                        <h1 className="text-green-600 text-3xl pl-2">
                            Pear Tutoring
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                            <ul className="text-gray-600 font-medium">
                                <li className="mb-4">
                                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                            <ul className="text-gray-600 font-medium">
                                <li className="mb-4">
                                    <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                            <ul className="text-gray-600 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">© 2023 <a href="https://peartutoring.app/" className="hover:underline">Pear Tutoring™</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                        <FacebookIconLink />
                        <InstagramIconLink />
                        <TwitterIconLink />
                    </div>
                </div>
            </div>
        </footer>
    )
}
