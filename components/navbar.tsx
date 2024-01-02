import Link from "next/link"
import { UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "./theme-switcher";



export const NavBar = () => {
    return (
        <div className="fixed w-full flex justify-end items-center py-2 px-4 h-16 border-b gap-6">
            <Link href="/">
                Home
            </Link>
            <Link href="/contacts">
                Contacts
            </Link>
            <Link href="/book">
                Books
            </Link>
            <ThemeSwitcher />
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}