import { format } from "date-fns";

export const checkFishboneForLevel = (levelitems = []) => {
    return levelitems.some(item => Number(item?.inc_is_analysis) === 1);
};


export const checkDataCollection = (levelitems = []) => {
    return levelitems.some(item => Number(item?.inc_is_datacollection) === 1);
};


export const checkActionRequestExist = (levelitems = []) => {
    return levelitems.some(item => Number(item?.inc_is_action) === 1);
};


export const checkSacMatrix = (levelitems = []) => {
    return levelitems.some(item => Number(item?.inc_action_item_stauts) === 2);
};



export const generateInitialComments = (incidentlevels = []) => {
    return incidentlevels.reduce((acc, lvl) => {
        acc[lvl.level_name] = "";
        return acc;
    }, {});
};



export const getFinalLevelActions = (levelitems = [], level, levelactionreview = []) => {
    return levelitems?.filter(item => {
        // Must match the level and be active
        if (item?.level_name !== level || Number(item?.inc_action_item_stauts) !== 1) {
            return false;
        }

        // SPECIAL CASE: Always include RCA
        if (item?.inc_action_name?.toUpperCase() === 'PREVENTIVE ACTION' || item?.inc_action_name?.toUpperCase() === 'RCA') {
            return true;
        }

        // For all others → filter out if already reviewed
        return Array.isArray(levelactionreview) && !levelactionreview?.some(
            val => val?.inc_action_slno === item?.inc_action_slno
        );
    });
};


export const formatDate = (date) =>
    date ? format(new Date(date), "dd/MM/yyyy hh:mm a") : "--";


export const checkUpperLevelApprovedForDDC = (approvals = [], currentLevelNo) => {
    return approvals.some(item => Number(item.level_no) > Number(currentLevelNo));
};


export const getInitiatorName = (slno) => {
    switch (slno) {
        case 1: return "Patient";
        case 2: return "Staff";
        case 3: return "Visitors";
        default: return "Hospital Property";
    }
};


export const safeParse = (v) => {
    try { return v ? JSON.parse(v) : []; } catch { return []; }
};
