import { db } from '@/lib/db';
import React from 'react';
import DeleteButton from './_components/delete-button';

interface IBookPageProps {
    params: {
        id: string
    };
}

const BookPage: React.FC<IBookPageProps> = async ({ params }) => {

    const book = await db.book.findUnique(
        {
            where: {
                id: params.id,
            }
        }
    );


    return (
      <div className='p-6'>
         <h1>BookPage Detail</h1>
         <div className='flex flex-col'>
            <p>Title: {book?.title}</p>
            <p>Description: {book?.description}</p>
            <DeleteButton id={book?.id}/>
         </div>
      </div>
    );
};

export default BookPage