import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useFreeTime = (date: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/freeTime?date=" + date + "",
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

export default useFreeTime;
