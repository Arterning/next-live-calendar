import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const usePartner = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/partner", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePartner;
