import { useQuery } from "@tanstack/react-query";
import { fetchAllMenuDetail } from "../MenuMaster/CommonFun";

export const useAllMenuDetailFetch = () => {
    return useQuery({
        queryKey: ['incnautre'],
        queryFn: () => fetchAllMenuDetail(),
        staleTime: Infinity,

    });
};
