import Link from "next/link"


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
        </div>
    )
}