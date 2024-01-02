"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

import { useUser } from "@clerk/nextjs";
import Link from "next/link";


const BookPage = () => {

    const { isLoaded, isSignedIn, user } = useUser();

    return (
      <div className="flex gap-3 items-center justify-center p-4 space-x-8 h-full">
        {user != null && (
          <Link href="/book/create">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Book
            </Button>
          </Link>
        )}
        <p>
          Books are important
        </p>
      </div>
    );
}

export default BookPage