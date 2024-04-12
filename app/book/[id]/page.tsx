import { db } from "@/lib/db";
import React from "react";
import DeleteButton from "./_components/delete-button";
import UpdateBookForm from "./_components/update-book-form";
import { redirect } from "next/navigation";

interface IBookPageProps {
  params: {
    id: string;
  };
}

//TODO add breadthumb
const BookPage: React.FC<IBookPageProps> = async ({ params }) => {
  const book = await db.book.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!book) {
    return redirect("/books");
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6 bg-slate-100 rounded-md p-4 max-w-xl">
        <p>Title: {book?.title}</p>
        <p>Description: {book?.description}</p>
      </div>
      <UpdateBookForm initialData={book} id={book.id} />
      <DeleteButton id={book?.id} />
    </div>
  );
};

export default BookPage;
