import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useReserve = (reserveAt: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/reserve?reserveAt=" + reserveAt,
    fetcher,
    { refreshInterval: 1000 }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useReserve;
