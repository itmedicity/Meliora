import { format } from "date-fns";
import { useMemo } from "react";

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

export const checkFileUplod = (levelitems = []) => {
    return levelitems.some(item => Number(item?.inc_action_item_stauts) === 3);
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


export const useGroupedChats = (conversations = []) => {
    return useMemo(() => {
        if (!Array.isArray(conversations)) {
            return [];
        }

        const acc = conversations.reduce((acc, item) => {
            if (!item || typeof item !== 'object') {
                return acc;
            }

            const {
                conversation_id,
                participant_ids,
                is_group_chat,
                last_message_time,
                created_at
            } = item;

            if (!conversation_id) {
                return acc;
            }

            // Parse time once
            const timeStr = last_message_time || created_at;
            const safeCurrentTime = timeStr ? new Date(timeStr).getTime() || 0 : 0;

            if (is_group_chat) {
                const groupKey = `GROUP_${conversation_id}`;
                acc[groupKey] = {
                    ...item,
                    mergedConversationIds: [conversation_id],
                    latestTime: safeCurrentTime
                };
            } else {
                const personalKey = participant_ids
                    ? Array.isArray(participant_ids)
                        ? participant_ids.join(',')
                        : String(participant_ids)
                    : `UNKNOWN_${conversation_id}`;

                if (!acc[personalKey]) {
                    acc[personalKey] = {
                        ...item,  //  Copy ALL fields
                        mergedConversationIds: [conversation_id],
                        latestTime: safeCurrentTime
                    };
                } else if (!acc[personalKey].mergedConversationIds.includes(conversation_id)) {
                    acc[personalKey].mergedConversationIds.push(conversation_id);
                    if (safeCurrentTime > acc[personalKey].latestTime) {
                        //  Update with full item spread, not individual fields
                        acc[personalKey] = {
                            ...acc[personalKey],
                            ...item,
                            mergedConversationIds: acc[personalKey].mergedConversationIds,
                            latestTime: safeCurrentTime
                        };
                    }
                }
            }
            return acc;
        }, {});

        return Object.values(acc)
            .sort((a, b) => (b.latestTime || 0) - (a.latestTime || 0))
            .map((item) => {
                const rest = { ...item };
                delete rest.latestTime;
                return rest;
            });
    }, [conversations]);
};

// export const useGroupedChats = (
//     conversations = []
// ) => {

//     return useMemo(() => {

//         if (!Array.isArray(conversations)) {
//             return [];
//         }

//         return Object.values(

//             conversations?.reduce((acc, item) => {

//                 try {

//                     if (
//                         !item ||
//                         typeof item !== 'object'
//                     ) {
//                         return acc;
//                     }

//                     const {
//                         conversation_id,
//                         participant_ids,
//                         is_group_chat,
//                         last_message_time,
//                         created_at
//                     } = item;

//                     if (!conversation_id) {
//                         return acc;
//                     }

//                     const currentTime = new Date(
//                         last_message_time ||
//                         created_at ||
//                         0
//                     ).getTime();

//                     const safeCurrentTime =
//                         Number.isNaN(currentTime)
//                             ? 0
//                             : currentTime;

//                     // GROUP CHAT
//                     if (is_group_chat) {

//                         const groupKey =
//                             `GROUP_${conversation_id}`;

//                         acc[groupKey] = {

//                             ...item,
//                             mergedConversationIds: [
//                                 conversation_id
//                             ],
//                             latestTime:
//                                 safeCurrentTime
//                         };
//                         return acc;
//                     }
//                     // PERSONAL CHAT
//                     const personalKey =
//                         participant_ids ||
//                         `UNKNOWN_${conversation_id}`;
//                     if (!acc[personalKey]) {
//                         acc[personalKey] = {
//                             ...item,
//                             mergedConversationIds: [
//                                 conversation_id
//                             ],
//                             latestTime:
//                                 safeCurrentTime
//                         };
//                         return acc;
//                     }
//                     if (
//                         !acc[personalKey]
//                             ?.mergedConversationIds
//                             ?.includes(conversation_id)
//                     ) {
//                         acc[personalKey]
//                             .mergedConversationIds
//                             .push(conversation_id);
//                     }
//                     const existingTime =
//                         acc[personalKey]
//                             ?.latestTime || 0;

//                     if (
//                         safeCurrentTime >
//                         existingTime
//                     ) {
//                         acc[personalKey] = {
//                             ...item,
//                             mergedConversationIds:
//                                 acc[personalKey]
//                                     .mergedConversationIds,

//                             latestTime:
//                                 safeCurrentTime
//                         };
//                     }
//                 } catch (error) {
//                     console.error(
//                         'Grouping Error:',
//                         error
//                     );
//                 }
//                 return acc;
//             }, {})
//         )
//             .sort((a, b) =>
//                 (b?.latestTime || 0) -
//                 (a?.latestTime || 0)
//             )
//             .map((item) => {
//                 const rest = { ...item };
//                 delete rest.latestTime;
//                 return rest;
//             });
//     }, [conversations]);
// };