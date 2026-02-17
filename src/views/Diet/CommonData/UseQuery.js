import { useQuery } from "@tanstack/react-query";
import { DietFoodFetching, DietItemType, GetAllDietRoomCategoryDetail, getAllDietTime, getAllEmployyeName, getallNurseStationBedDetail, getallNurseStationMaster, GetAllRoomTypeDetail, getDietDeliveryTime, getDietName } from "./CommonFun";


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
        queryKey: ['dietroomtype'],
        queryFn: () => GetAllRoomTypeDetail(),
        staleTime: Infinity,
    });
};



export const UseRoomCategoryDetail = () => {
    return useQuery({
        queryKey: ['dietroomcat'],
        queryFn: () => GetAllDietRoomCategoryDetail(),
        staleTime: Infinity,
    });
};


export const useDietTimes = () => {
    return useQuery({
        queryKey: ['diettime'],
        queryFn: () => getAllDietTime(),
        staleTime: Infinity,
    });
};

export const useDietNames = () => {
    return useQuery({
        queryKey: ['dietname'],
        queryFn: () => getDietName(),
        staleTime: Infinity,
    });
};


export const useDietDeliveryTime = () => {
    return useQuery({
        queryKey: ['dietdeltime'],
        queryFn: () => getDietDeliveryTime(),
        staleTime: Infinity,
    });
};

export const useNursingStationMaster = () => {
    return useQuery({
        queryKey: ['getallnsmaster'],
        queryFn: getallNurseStationMaster,
        staleTime: Infinity
    });
};

export const useNursingStationBedDetail = (code) => {
    return useQuery({
        queryKey: ['getallnsbedmast', code],
        queryFn: () => getallNurseStationBedDetail(code),
        staleTime: Infinity,
        enabled: !!code
    });
};

export const useAllEmployeeFetch = () => {
    return useQuery({
        queryKey: ['allemp'],
        queryFn: getAllEmployyeName,
        staleTime: Infinity
    });
};


// export const getAllDietItems = () => {
//     return useQuery({
//         queryKey: ['diettime'],
//         queryFn: () => getAllDietTime(),
//         staleTime: Infinity,
//     });
// };
