import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useBooks = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/books', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useBooks;
