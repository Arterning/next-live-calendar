
import React from 'react';

interface IBookPageProps {
    params: {
        id: string
    };
}

const BookPage: React.FC<IBookPageProps> = ({ params }) => {

    return (
      <>
        {params.id} BookPage
      </>
    );
};

export default BookPage