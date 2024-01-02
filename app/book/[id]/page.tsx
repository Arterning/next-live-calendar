
import { db } from '@/lib/db';
import React from 'react';

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
         </div>
      </div>
    );
};

export default BookPage