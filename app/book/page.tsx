"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import useBooks from "@/hooks/useBooks";

const BookPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const { data = [], error, isLoading, mutate } = useBooks();

  console.log("BOOK", data);

  return (
    <div className="p-4 h-full">
      <div className="flex items-center justify-start gap-5">
        {user != null && (
          <Link href="/book/create">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Book
            </Button>
          </Link>
        )}
        <p>Books are important</p>
      </div>
      <div className="flex items-center justify-start mt-5 gap-5">
      {data.map((book: Record<string, any>) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          description={book.description}
          className="hover:bg-slate-200"
        />
      ))}
      </div>
    </div>
  );
};

const BookCard = ({
  id, 
  title,
  description,
  className,
}: {
  id: string;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <Link href={`/book/${id}`}>
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground pt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default BookPage;
