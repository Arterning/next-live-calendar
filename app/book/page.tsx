"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import toast from "react-hot-toast"

const BookPage = () => {
    return (
        <div className="flex gap-3 justify-start p-4 space-x-2 h-full">
            <Button onClick={() => { 
                console.log("clicked")
                toast.success("Hey, You are on Book Page")
            }}>Button</Button>
            <Button variant="outline" onClick={() => toast.error("Something Wrong")}>
                Cancell
            </Button>
            <span>Book Page</span>
            <Calendar/>
        </div>

    )
}

export default BookPage