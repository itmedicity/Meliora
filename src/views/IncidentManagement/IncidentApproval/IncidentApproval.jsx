import { useQuery } from '@tanstack/react-query';
import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    currentLevelNotApprovedIncident,
    // fetchAllInvolvedDep,
    incidentLevelApprovalFetch
} from 'src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode';
import TabComponent from '../Components/TabComponent';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import Inciwrapper from 'src/views/Components/Inciwrapper';
import { groupIncidents } from '../CommonComponent/CommonFun';
import { Box } from '@mui/joy';


const IncidentApproval = () => {

    const {
        data: incidentlevels,
        // refetch: FetchAllIncidentLevel
    } = useQuery({
        queryKey: ['getalllevels'],
        queryFn: () => incidentLevelApprovalFetch(),
        staleTime: Infinity
    });

    const { empid } = useSelector(state => {
        return state.LoginUserData
    });

    const CurrentlevelDetail = useMemo(() => {
        return incidentlevels?.find(item => item?.emp_id === empid);
    }, [incidentlevels, empid]);

    const {
        data: IncidentLevelApproval,
        isLoading: IncidentLevelApprovalLoading,
        refetch: FetchAllIncidentLevelApproval
    } = useQuery({
        queryKey: ['alllevelapproval', CurrentlevelDetail],
        queryFn: () => currentLevelNotApprovedIncident(CurrentlevelDetail?.level_no),
        enabled: !!CurrentlevelDetail
    });



    // grouping data and returning them based on the tabllist
    // const { rejectedList, PendingList, ApprovedList } = useMemo(() => {
    //     const grouped = groupIncidents(IncidentLevelApproval)?.sort(
    //         (a, b) => b?.inc_register_slno - a?.inc_register_slno
    //     );

    //     return {
    //         rejectedList: grouped.filter((item) => item?.inc_current_level === CurrentlevelDetail?.level_no &&
    //             item?.inc_current_level_review_state === 'R'),
    //         PendingList: grouped.filter((item) => item?.inc_current_level < CurrentlevelDetail?.level_no),
    //         ApprovedList: grouped.filter((item) => item?.inc_current_level >= CurrentlevelDetail?.level_no &&
    //             item?.inc_current_level_review_state === 'A'),
    //     };
    // }, [IncidentLevelApproval]);


    // grouping data and returning them based on the tab list
    const { rejectedList, PendingList, ApprovedList } = useMemo(() => {
        if (!IncidentLevelApproval || !CurrentlevelDetail) return { rejectedList: [], PendingList: [], ApprovedList: [] };

        // Group and sort incidents
        const grouped = groupIncidents(IncidentLevelApproval)?.sort(
            (a, b) => b?.inc_register_slno - a?.inc_register_slno
        );


        console.log(grouped,"grouped");
        
        //  Filter out incidents where NOT all RCA departments acknowledged
        const onlyAcknowledged = grouped.filter(item => {
            const parsedDetails = item?.data_collection_details
                ? JSON.parse(item?.data_collection_details)
                : [];

            // Check if ALL departments acknowledged (inc_dep_status === 1)
            const allAcknowledged = parsedDetails.length > 0 && parsedDetails.every(d => d?.inc_dep_status === 1);
            return allAcknowledged;
        });


        console.log(onlyAcknowledged, "onlyAcknowledged");


        return {
            rejectedList: onlyAcknowledged.filter(
                item =>
                    item?.inc_current_level === CurrentlevelDetail?.level_no &&
                    item?.inc_current_level_review_state === 'R'
            ),
            PendingList: onlyAcknowledged.filter(
                item =>
                    item?.inc_current_level < CurrentlevelDetail?.level_no
            ),
            ApprovedList: onlyAcknowledged.filter(
                item =>
                    item?.inc_current_level >= CurrentlevelDetail?.level_no &&
                    item?.inc_current_level_review_state === 'A'
            ),
        };
    }, [IncidentLevelApproval, CurrentlevelDetail]);


    const TabDetails = [
        { id: 0, name: "Pending", data: PendingList, },
        { id: 1, name: "Rejected", data: rejectedList },
        { id: 2, name: "Approved", data: ApprovedList },
    ];


    return (
        <Box sx={{ width: '100vw' }}>
            <Inciwrapper
                title={CurrentlevelDetail?.level_name} >
                {
                    IncidentLevelApprovalLoading &&
                    <CustomeIncidentLoading
                        text={"Loading  Incidents List"}
                    />
                }
                <TabComponent
                    level={CurrentlevelDetail?.level_name}
                    levelNo={CurrentlevelDetail?.level_slno}
                    TabDetails={TabDetails}
                    fetchAgain={FetchAllIncidentLevelApproval}
                />
            </Inciwrapper>
        </Box>
    );

}

export default memo(IncidentApproval);