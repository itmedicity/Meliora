import { useQuery } from "@tanstack/react-query";
import { DietFoodFetching, DietItemType, GetAllRoomTypeDetail } from "./CommonFun";


export const UseFoodDetail = () => {
    return useQuery({
        queryKey: ['getFood'],
        queryFn: () => DietFoodFetching(),
        staleTime: Infinity,
    });
};

export const UseFoodTypeDetail = () => {
    return useQuery({
        queryKey: ['itemtype'],
        queryFn: () => DietItemType(),
        staleTime: Infinity,
    });
};

export const UseRoomTypeDetail = () => {
    return useQuery({
        queryKey: ['roomtype'],
        queryFn: () => GetAllRoomTypeDetail(),
        staleTime: Infinity,
    });
};




