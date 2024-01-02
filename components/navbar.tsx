import Link from "next/link"
import { UserButton } from "@clerk/nextjs";



export const NavBar = () => {
    return (
        <div className="fixed w-full flex justify-between items-center py-2 px-4 h-16 border-b">
            <Link href="/">
                Home
            </Link>
            <Link href="/test">
                Test
            </Link>
            <Link href="/book">
                Book
            </Link>
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}