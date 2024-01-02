"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import toast from "react-hot-toast"
import { PlusCircle } from "lucide-react"

import { useUser } from "@clerk/nextjs";
import Link from "next/link";


const BookPage = () => {

    const { isLoaded, isSignedIn, user } = useUser();

    return (
      <div className="flex gap-3 justify-start p-4 space-x-2 h-full">
        <Button
          onClick={() => {
            console.log("clicked");
            toast.success("Hey, You are on Book Page");
          }}
        >
          Button
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Something Wrong")}
        >
          Cancel
        </Button>

        {user != null && (
          <Link href="/book/create">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Book
            </Button>
          </Link>
        )}

        <span>Book Page</span>
        <Calendar />
      </div>
    );
}

export default BookPage