import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useReserve = (reserveAt?: Date) => {
  const { data, error, isLoading, mutate } = useSWR("/api/reserve", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useReserve;
