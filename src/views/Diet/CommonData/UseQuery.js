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
    getAllDietFoodDetail,
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
    getAllItemFileDetails,
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
    getPatienPlanFoodDetail,
    getPatientMealTypeDetail,
    getPatientTemplateFoodDetail,
    getProductionMaping
} from "./CommonFun";
import { useSafeQuery } from "./Helper";


export const UseFoodDetail = () => {
    return useSafeQuery({
        queryKey: ['getFood'],
        queryFn: () => DietFoodFetching(),
        staleTime: Infinity,
        defaultValue: [],

    });
};

export const UseIemFullDetail = () => {
    return useSafeQuery({
        queryKey: ['foodItem'],
        queryFn: () => getAllItemMasterDetail(),
        staleTime: 0,
        defaultValue: [],

    });
};


export const UseFoodTypeDetail = () => {
    return useSafeQuery({
        queryKey: ['itemtype'],
        queryFn: () => DietItemType(),
        staleTime: Infinity,
        defaultValue: [],

    });
};



export const UseRoomTypeDetail = () => {
    return useSafeQuery({
        queryKey: ['dietroomtype'],
        queryFn: () => GetAllRoomTypeDetail(),
        staleTime: Infinity,
        defaultValue: [],

    });
};



export const UseRoomCategoryDetail = () => {
    return useSafeQuery({
        queryKey: ['dietroomcat'],
        queryFn: () => GetAllDietRoomCategoryDetail(),
        staleTime: Infinity,
        defaultValue: [],
    });
};


export const useDietTimes = () => {
    return useSafeQuery({
        queryKey: ['diettime'],
        queryFn: () => getAllDietTime(),
        staleTime: Infinity,
        defaultValue: [],
    });
};

export const useDietNames = () => {
    return useSafeQuery({
        queryKey: ['dietname'],
        queryFn: () => getDietName(),
        staleTime: Infinity,
        defaultValue: [],
    });
};


export const useDietDeliveryTime = () => {
    return useSafeQuery({
        queryKey: ['dietdeltime'],
        queryFn: () => getDietDeliveryTime(),
        staleTime: Infinity,
        defaultValue: [],
    });
};

export const useNursingStationMaster = () => {
    return useSafeQuery({
        queryKey: ['getallnsmaster'],
        queryFn: getallNurseStationMaster,
        staleTime: Infinity,
        defaultValue: []
    });
};

export const useNursingStationBedDetail = (code) => {
    return useSafeQuery({
        queryKey: ['getallnsbedmast', code],
        queryFn: () => getallNurseStationBedDetail(code),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!code
    });
};


export const UseAllActiveBed = () => {
    return useSafeQuery({
        queryKey: ['getallnsbedmast'],
        queryFn: ActivebedDetail,
        staleTime: Infinity,
        defaultValue: []
    });
};


export const useAllEmployeeFetch = () => {
    return useSafeQuery({
        queryKey: ['allemp'],
        queryFn: getAllEmployyeName,
        staleTime: Infinity,
        defaultValue: []
    });
};

export const useAllItemGroupMaster = () => {
    return useSafeQuery({
        queryKey: ['allitemgroup'],
        queryFn: getAllItemGroupMaster,
        staleTime: Infinity,
        defaultValue: []
    });
};

export const useAllItemCategoryMaster = () => {
    return useSafeQuery({
        queryKey: ['fetchitemcatdtl'],
        queryFn: getAllItemCatgoryMaster,
        staleTime: Infinity,
        defaultValue: []
    });
};


export const useAllItemCategoryById = (id) => {
    return useSafeQuery({
        queryKey: ['fetchitemcatdtlbyid', id],
        queryFn: () => getAllItemCatgoryMasterById(id),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!id
    });
};

export const useAllOrderPartyType = () => {
    return useSafeQuery({
        queryKey: ['orderparty'],
        queryFn: getAllOrderPartyType,
        staleTime: Infinity,
        defaultValue: []
    });
};


export const useKitchenOrderList = () => {
    return useSafeQuery({
        queryKey: ['kotlist'],
        queryFn: getAllPendingKotList,
        // IMPORTANT
        staleTime: 0,
        defaultValue: [],
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};


export const useAllDietSpeciality = () => {
    return useSafeQuery({
        queryKey: ['dietspeciality'],
        queryFn: getAllDietSpeciality,
        staleTime: Infinity,
        defaultValue: []
    });
};

export const useAllUnitMaster = () => {
    return useSafeQuery({
        queryKey: ['unimaster'],
        queryFn: getAllUnitMaster,
        staleTime: Infinity,
        defaultValue: []
    });
};




export const useAllDietTemplate = () => {
    return useSafeQuery({
        queryKey: ['diettemplate'],
        queryFn: getAllDietTemplate,
        staleTime: Infinity,
        defaultValue: []
    });
};

export const useAllPatientDietMaster = () => {
    return useSafeQuery({
        queryKey: ['ptdiet'],
        queryFn: getAllPateintDietMaster,
        staleTime: Infinity,
        defaultValue: []

    });
};

export const useAllItemType = () => {
    return useSafeQuery({
        queryKey: ['allitem'],
        queryFn: getAllItemType,
        staleTime: Infinity,
        defaultValue: []
    });
};

export const useDietPrice = (dietid) => {
    return useSafeQuery({
        queryKey: ['usedietprice', dietid],
        queryFn: () => getAllDietPriceMaster(dietid),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!dietid
    });
};


export const useAllDietTemplateFood = (templateid) => {
    return useSafeQuery({
        queryKey: ['templatefood', templateid],
        queryFn: () => getAllDietTemplateFood(templateid),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!templateid
    });
};

export const useAllItemAlias = () => {
    return useSafeQuery({
        queryKey: ['itemalias'],
        queryFn: getAllItemAlias,
        staleTime: Infinity,
        defaultValue: []

    });
};



export const useAllPatientDietPlan = (nscode) => {
    return useSafeQuery({
        queryKey: ['patientdietplan', nscode],
        queryFn: () => getAllPatientDietPlan(nscode),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!nscode
    });
};

//it will be not using may be
export const useAllActivePatientDietPlan = (date) => {
    return useSafeQuery({
        queryKey: ['activediet', date],
        queryFn: () => getAllActivePatientDietDetail(date),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!date,

    });
};

export const useAllFetchTemplateFoodDetail = (planId) => {
    return useSafeQuery({
        queryKey: ['fetchTemplatefooddetail', planId],
        queryFn: () => getAllDietFoodDetail(planId),
        staleTime: 0,
        enabled: !!planId,
        defaultValue: []
    });
};


export const useAllActivePatientTypeDetail = (date) => {
    return useSafeQuery({
        queryKey: ['ptmealtype', date],
        queryFn: () => getPatientMealTypeDetail(date),
        staleTime: 0,
        enabled: !!date,
        defaultValue: []
    });
};

export const useFetchAllScheduledDiet = (date) => {
    return useSafeQuery({
        queryKey: ['scheduleddiet', date],
        queryFn: () => getAllPatientDietScheduled(date),
        staleTime: 0,
        enabled: !!date,
        defaultValue: []
    });
};




export const useAllPatientTemplateFoodDetail = (plan_id, type_id, batch_id) => {
    return useSafeQuery({
        queryKey: ['singlepatientfood', plan_id, type_id, batch_id],
        queryFn: () => getPatientTemplateFoodDetail(plan_id, type_id, batch_id),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!plan_id && !!type_id && !!batch_id
    });
};


export const useAllPatientCancelledFOod = (plan_id, type_id, batch_id) => {
    return useSafeQuery({
        queryKey: ['patientfoodcancel', plan_id, type_id, batch_id],
        queryFn: () => getAllCancelledFoodDetail(plan_id, type_id, batch_id),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!plan_id && !!type_id && !!batch_id
    });
};


export const useGetDietecian = () => {
    return useSafeQuery({
        queryKey: ['getdietican'],
        queryFn: getAllDietician,
        staleTime: Infinity,
        defaultValue: []

    });
};


export const useItemFullDetials = (enabled) => {
    return useSafeQuery({
        queryKey: ['itemfulldetail'],
        queryFn: getFullDetailofItem,
        enabled, // only fetch when needed
        staleTime: Infinity,
        defaultValue: []
    });
};


export const useAllDietProcessList = (date) => {
    return useSafeQuery({
        queryKey: ['processlistdtl'],
        queryFn: () => getAllProcessListDetail(date),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!date
    });
};


export const useAllProductionBatchDetail = (date) => {
    return useSafeQuery({
        queryKey: ['batch', date],
        queryFn: () => getAllProductionBatchDetail(date),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!date
    });
};


// export const useAllPatientProcessList = (date) => {
//     return useSafeQuery({
//         queryKey: ['batch', date],
//         queryFn: () => getAllPatientProcessList(date),
//         staleTime: Infinity,
// defaultValue: [],
//         enabled: !!date
//     });
// };


export const useAllBatchProductionItemDetail = (date) => {
    return useSafeQuery({
        queryKey: ['batchitems', date],
        queryFn: () => getAllBatchProductionItemDetail(date),
        staleTime: 0,
        enabled: !!date,
        defaultValue: []
    });
};


export const useAllAllergenMaster = () => {
    return useSafeQuery({
        queryKey: ['getallergence'],
        queryFn: getAllAllegrenceMaster,
        staleTime: Infinity,
        defaultValue: []
    });
};


export const useAllBillingCategory = () => {
    return useSafeQuery({
        queryKey: ['billingcategory'],
        queryFn: getAllBillingCategory,
        staleTime: Infinity,
        defaultValue: []
    });
};


export const useAllActiveNsPatient = (nscode) => {
    return useSafeQuery({
        queryKey: ['nsactivepatient', nscode],
        queryFn: () => getAllNsActivePatients(nscode),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!nscode
    });
};

// new
export const useAllNursingStationPatient = (nscode) => {
    return useSafeQuery({
        queryKey: ['allnsactive', nscode],
        queryFn: () => getAllNursingStationPatients(nscode),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!nscode
    });
};


export const useFetchAllCanteenOrders = (status) => {
    return useSafeQuery({
        queryKey: ['canteenorders', status],
        queryFn: () => getAllCanteenOrders(status),
        enabled: !!status,
        keepPreviousData: true,
        defaultValue: []
    });
};




export const useBatchFoodDetail = (selectedRows = []) => {
    return useSafeQuery({
        queryKey: ['batchdetail', selectedRows],
        queryFn: () => getBatchItemDetail(selectedRows),
        enabled: selectedRows.length > 0,
        defaultValue: []
    });
};

export const useFetchProductionMap = (isCheckMode) => {
    return useSafeQuery({
        queryKey: ['ProductionMap'],
        queryFn: getProductionMaping,
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!isCheckMode
    });
};



export const useFetchAllCanteenOrderStatus = () => {
    return useSafeQuery({
        queryKey: ['canteenorderstatus'],
        queryFn: getAllCanteenOrderStatus,
        staleTime: 0,
        defaultValue: []
    });
};



export const useOrderItemDetail = (memoOrder) => {
    return useSafeQuery({
        queryKey: ['canteenorders', memoOrder],
        queryFn: () => getAllOrderItemDetails(memoOrder),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!memoOrder
    });
};

export const usePatientExtraOrders = (ptId, Status) => {
    return useSafeQuery({
        queryKey: ['ptextraorder', ptId, Status],
        queryFn: () => getAllPatientExtraOrdres(ptId, Status),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!ptId && !!Status
    });
};

export const useGetPatientDetail = (bed_code) => {
    return useSafeQuery({
        queryKey: ['getactivePatient', bed_code],
        queryFn: () => getCurrentActivePatient(bed_code),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!bed_code
    });
};

export const useCustomerPreviousCanteenOrder = (admission_id, personType) => {
    return useSafeQuery({
        queryKey: ['customerorder', admission_id, personType],
        queryFn: () => getCustomerPreviousOrder(admission_id, personType),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!admission_id && !!personType
    });
};


export const useCustomerExtraOrderDetail = (patient_id, isPatient) => {
    return useSafeQuery({
        queryKey: ['customerextraorder', patient_id],
        queryFn: () => getCustomerExtraOrders(patient_id),
        staleTime: Infinity,
        defaultValue: [],
        enabled: isPatient && !!patient_id
    });
};



export const useFetchItemFiles = (item_id) => {
    return useSafeQuery({
        queryKey: ['itemfiles', item_id],
        queryFn: () => getItemFileDetails(item_id),
        staleTime: Infinity,
        defaultValue: [],
        enabled: !!item_id
    });
};


export const useGetAllAssignedOrderDetail = () => {
    return useSafeQuery({
        queryKey: ['assignedorder'],
        queryFn: getCurrentAssignedFoodDetail,
        staleTime: 0,
        defaultValue: []
    });
};

export const usePatientPlanFoodDetails = (plan_id) => {
    return useSafeQuery({
        queryKey: ['patientOrder', plan_id],
        queryFn: () => getPatienPlanFoodDetail(plan_id),
        staleTime: 0,
        enabled: !!plan_id,
        defaultValue: []
    });
};

export const useFetchAllItemFileDetail = () => {
    return useSafeQuery({
        queryKey: ['fulitemfiles',],
        queryFn: getAllItemFileDetails,
        staleTime: 0,
        defaultValue: []
    });
};
