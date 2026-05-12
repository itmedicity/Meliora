import { useQuery } from "@tanstack/react-query";
import {
    ActivebedDetail,
    DietFoodFetching,
    DietItemType,
    getAllActivePatientDietDetail,
    getAllAllegrenceMaster,
    getAllBatchProductionItemDetail,
    getAllBillingCategory,
    getAllCancelledFoodDetail,
    getAllCanteenOrders,
    getAllCanteenOrderStatus,
    getAllDietician,
    getAllDietPriceMaster,
    GetAllDietRoomCategoryDetail,
    getAllDietSpeciality,
    getAllDietTemplate,
    getAllDietTemplateFood,
    getAllDietTime,
    getAllEmployyeName,
    getAllItemAlias,
    getAllItemCatgoryMaster,
    getAllItemCatgoryMasterById,
    getAllItemGroupMaster,
    getAllItemMasterDetail,
    getAllItemType,
    getAllNsActivePatients,
    getallNurseStationBedDetail,
    getallNurseStationMaster,
    getAllNursingStationPatients,
    getAllOrderItemDetails,
    getAllOrderPartyType,
    getAllPateintDietMaster,
    getAllPatientDietPlan,
    getAllPatientDietScheduled,
    getAllPatientExtraOrdres,
    getAllPendingKotList,
    getAllProcessListDetail,
    getAllProductionBatchDetail,
    GetAllRoomTypeDetail,
    getAllUnitMaster,
    getBatchItemDetail,
    getCurrentActivePatient,
    getCurrentAssignedFoodDetail,
    getCustomerExtraOrders,
    getCustomerPreviousOrder,
    getDietDeliveryTime,
    getDietName,
    getFullDetailofItem,
    getItemFileDetails,
    getPatientMealTypeDetail,
    getPatientTemplateFoodDetail,
    getProductionMaping
} from "./CommonFun";


export const UseFoodDetail = () => {
    return useQuery({
        queryKey: ['getFood'],
        queryFn: () => DietFoodFetching(),
        staleTime: Infinity,
    });
};

export const UseIemFullDetail = () => {
    return useQuery({
        queryKey: ['foodItem'],
        queryFn: () => getAllItemMasterDetail(),
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


export const UseAllActiveBed = () => {
    return useQuery({
        queryKey: ['getallnsbedmast'],
        queryFn: ActivebedDetail,
        staleTime: Infinity
    });
};


export const useAllEmployeeFetch = () => {
    return useQuery({
        queryKey: ['allemp'],
        queryFn: getAllEmployyeName,
        staleTime: Infinity
    });
};

export const useAllItemGroupMaster = () => {
    return useQuery({
        queryKey: ['allitemgroup'],
        queryFn: getAllItemGroupMaster,
        staleTime: Infinity
    });
};

export const useAllItemCategoryMaster = () => {
    return useQuery({
        queryKey: ['fetchitemcatdtl'],
        queryFn: getAllItemCatgoryMaster,
        staleTime: Infinity
    });
};


export const useAllItemCategoryById = (id) => {
    return useQuery({
        queryKey: ['fetchitemcatdtlbyid', id],
        queryFn: () => getAllItemCatgoryMasterById(id),
        staleTime: Infinity,
        enabled: !!id
    });
};

export const useAllOrderPartyType = () => {
    return useQuery({
        queryKey: ['orderparty'],
        queryFn: getAllOrderPartyType,
        staleTime: Infinity
    });
};


export const useKitchenOrderList = () => {
    return useQuery({
        queryKey: ['kotlist'],
        queryFn: getAllPendingKotList,
        // IMPORTANT
        staleTime: 0,

        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};


export const useAllDietSpeciality = () => {
    return useQuery({
        queryKey: ['dietspeciality'],
        queryFn: getAllDietSpeciality,
        staleTime: Infinity
    });
};

export const useAllUnitMaster = () => {
    return useQuery({
        queryKey: ['unimaster'],
        queryFn: getAllUnitMaster,
        staleTime: Infinity
    });
};




export const useAllDietTemplate = () => {
    return useQuery({
        queryKey: ['diettemplate'],
        queryFn: getAllDietTemplate,
        staleTime: Infinity
    });
};

export const useAllPatientDietMaster = () => {
    return useQuery({
        queryKey: ['ptdiet'],
        queryFn: getAllPateintDietMaster,
        staleTime: Infinity
    });
};

export const useAllItemType = () => {
    return useQuery({
        queryKey: ['allitem'],
        queryFn: getAllItemType,
        staleTime: Infinity
    });
};

export const useDietPrice = (dietid) => {
    return useQuery({
        queryKey: ['usedietprice', dietid],
        queryFn: () => getAllDietPriceMaster(dietid),
        staleTime: Infinity,
        enabled: !!dietid
    });
};


export const useAllDietTemplateFood = (templateid) => {
    return useQuery({
        queryKey: ['templatefood', templateid],
        queryFn: () => getAllDietTemplateFood(templateid),
        staleTime: Infinity,
        enabled: !!templateid
    });
};

export const useAllItemAlias = () => {
    return useQuery({
        queryKey: ['itemalias'],
        queryFn: getAllItemAlias,
        staleTime: Infinity

    });
};



export const useAllPatientDietPlan = (nscode) => {
    return useQuery({
        queryKey: ['patientdietplan', nscode],
        queryFn: () => getAllPatientDietPlan(nscode),
        staleTime: Infinity,
        enabled: !!nscode
    });
};

//it will be not using may be
export const useAllActivePatientDietPlan = (date) => {
    return useQuery({
        queryKey: ['activediet', date],
        queryFn: () => getAllActivePatientDietDetail(date),
        staleTime: Infinity,
        enabled: !!date
    });
};

export const useAllActivePatientTypeDetail = (date) => {
    return useQuery({
        queryKey: ['ptmealtype', date],
        queryFn: () => getPatientMealTypeDetail(date),
        staleTime: Infinity,
        enabled: !!date
    });
};

export const useFetchAllScheduledDiet = (date) => {
    return useQuery({
        queryKey: ['scheduleddiet', date],
        queryFn: () => getAllPatientDietScheduled(date),
        staleTime: 0,
        enabled: !!date
    });
};




export const useAllPatientTemplateFoodDetail = (plan_id, type_id, batch_id) => {
    return useQuery({
        queryKey: ['singlepatientfood', plan_id, type_id, batch_id],
        queryFn: () => getPatientTemplateFoodDetail(plan_id, type_id, batch_id),
        staleTime: Infinity,
        enabled: !!plan_id && !!type_id && !!batch_id
    });
};


export const useAllPatientCancelledFOod = (plan_id, type_id, batch_id) => {
    return useQuery({
        queryKey: ['patientfoodcancel', plan_id, type_id, batch_id],
        queryFn: () => getAllCancelledFoodDetail(plan_id, type_id, batch_id),
        staleTime: Infinity,
        enabled: !!plan_id && !!type_id && !!batch_id
    });
};


export const useGetDietecian = () => {
    return useQuery({
        queryKey: ['getdietican'],
        queryFn: getAllDietician,
        staleTime: Infinity

    });
};


export const useItemFullDetials = (enabled) => {
    return useQuery({
        queryKey: ['itemfulldetail'],
        queryFn: getFullDetailofItem,
        enabled, // only fetch when needed
        staleTime: Infinity
    });
};


export const useAllDietProcessList = (date) => {
    return useQuery({
        queryKey: ['processlistdtl'],
        queryFn: () => getAllProcessListDetail(date),
        staleTime: Infinity,
        enabled: !!date
    });
};


export const useAllProductionBatchDetail = (date) => {
    return useQuery({
        queryKey: ['batch', date],
        queryFn: () => getAllProductionBatchDetail(date),
        staleTime: Infinity,
        enabled: !!date
    });
};


// export const useAllPatientProcessList = (date) => {
//     return useQuery({
//         queryKey: ['batch', date],
//         queryFn: () => getAllPatientProcessList(date),
//         staleTime: Infinity,
//         enabled: !!date
//     });
// };


export const useAllBatchProductionItemDetail = (date) => {
    return useQuery({
        queryKey: ['batchitems', date],
        queryFn: () => getAllBatchProductionItemDetail(date),
        staleTime: 0,
        enabled: !!date
    });
};


export const useAllAllergenMaster = () => {
    return useQuery({
        queryKey: ['getallergence'],
        queryFn: getAllAllegrenceMaster,
        staleTime: Infinity
    });
};


export const useAllBillingCategory = () => {
    return useQuery({
        queryKey: ['billingcategory'],
        queryFn: getAllBillingCategory,
        staleTime: Infinity
    });
};


export const useAllActiveNsPatient = (nscode) => {
    return useQuery({
        queryKey: ['nsactivepatient', nscode],
        queryFn: () => getAllNsActivePatients(nscode),
        staleTime: Infinity,
        enabled: !!nscode
    });
};

// new
export const useAllNursingStationPatient = (nscode) => {
    return useQuery({
        queryKey: ['allnsactive', nscode],
        queryFn: () => getAllNursingStationPatients(nscode),
        staleTime: Infinity,
        enabled: !!nscode
    });
};


export const useFetchAllCanteenOrders = (status) => {
    return useQuery({
        queryKey: ['canteenorders', status],
        queryFn: () => getAllCanteenOrders(status),
        enabled: !!status,
        keepPreviousData: true
    });
};




export const useBatchFoodDetail = (selectedRows = []) => {
    return useQuery({
        queryKey: ['batchdetail', selectedRows],
        queryFn: () => getBatchItemDetail(selectedRows),
        enabled: selectedRows.length > 0,
    });
};

export const useFetchProductionMap = (isCheckMode) => {
    return useQuery({
        queryKey: ['ProductionMap'],
        queryFn: getProductionMaping,
        staleTime: Infinity,
        enabled: !!isCheckMode
    });
};



export const useFetchAllCanteenOrderStatus = () => {
    return useQuery({
        queryKey: ['canteenorderstatus'],
        queryFn: getAllCanteenOrderStatus,
        staleTime: Infinity
    });
};



export const useOrderItemDetail = (memoOrder) => {
    return useQuery({
        queryKey: ['canteenorders', memoOrder],
        queryFn: () => getAllOrderItemDetails(memoOrder),
        staleTime: Infinity,
        enabled: !!memoOrder
    });
};

export const usePatientExtraOrders = (ptId, Status) => {
    return useQuery({
        queryKey: ['ptextraorder', ptId, Status],
        queryFn: () => getAllPatientExtraOrdres(ptId, Status),
        staleTime: Infinity,
        enabled: !!ptId && !!Status
    });
};

export const useGetPatientDetail = (bed_code) => {
    return useQuery({
        queryKey: ['getactivePatient', bed_code],
        queryFn: () => getCurrentActivePatient(bed_code),
        staleTime: Infinity,
        enabled: !!bed_code
    });
};

export const useCustomerPreviousCanteenOrder = (admission_id, personType) => {
    return useQuery({
        queryKey: ['customerorder', admission_id, personType],
        queryFn: () => getCustomerPreviousOrder(admission_id, personType),
        staleTime: Infinity,
        enabled: !!admission_id && !!personType
    });
};


export const useCustomerExtraOrderDetail = (patient_id, isPatient) => {
    return useQuery({
        queryKey: ['customerextraorder', patient_id],
        queryFn: () => getCustomerExtraOrders(patient_id),
        staleTime: Infinity,
        enabled: isPatient && !!patient_id
    });
};



export const useFetchItemFiles = (item_id) => {
    return useQuery({
        queryKey: ['itemfiles', item_id],
        queryFn: () => getItemFileDetails(item_id),
        staleTime: Infinity,
        enabled: !!item_id
    });
};

// export const getAllDietItems = () => {
//     return useQuery({
//         queryKey: ['diettime'],
//         queryFn: () => getAllDietTime(),
//         staleTime: Infinity,
//     });
// };

export const useGetAllAssignedOrderDetail = () => {
    return useQuery({
        queryKey: ['assignedorder'],
        queryFn: getCurrentAssignedFoodDetail,
        staleTime: Infinity,
    });
};
