import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useFreeTime = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/freeTime", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFreeTime;
