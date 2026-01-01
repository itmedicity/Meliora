import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TabComponent from '../Components/TabComponent';
import Inciwrapper from 'src/views/Components/Inciwrapper';
import {
    groupIncidents,
} from '../CommonComponent/CommonFun';
import { Box } from '@mui/joy';
import {
    useApprovalDepartmentFetching,
    useIncidentLevelApproval,
} from '../CommonComponent/useQuery';
import { safeParse } from '../CommonComponent/Incidnethelper';


const IncidentApproval = () => {

    const { empid } = useSelector(state => state.LoginUserData);

    const { data: ApprovalDepartments } = useApprovalDepartmentFetching(empid);

    const {
        data: IncidentLevelApproval,
        isLoading: IncidentLevelApprovalLoading,
        refetch: FetchAllIncidentLevelApproval
    } = useIncidentLevelApproval(ApprovalDepartments);



    /**
    * Filtering the Incident Based on Rejected ,Approved and Pending
    * Categoring the Incomming Incident to Get their Level Details
    * 
    * Parising the Acitons and Data Collection againg the Incident for Filtering agian
    * 
    * Checking if the Incident is under priorty level or Other 
    * 
    * Finally Using Memo to avoid Un wanted Rerendring 
    *
    */

    const { rejectedList, PendingList, ApprovedList } = useMemo(() => {
        if (!ApprovalDepartments || ApprovalDepartments.length === 0) {
            return { rejectedList: [], PendingList: [], ApprovedList: [] };
        }


        const allFinalData = ApprovalDepartments.flatMap(dep => {
            const currLevel = Number(dep.level_no);
            const IsPriorityLevel = Number(dep.level_priority) === 1;
            const LevelSlno = Number(dep.detail_slno);
            const LevelName = dep.level_name;

            // Filter incidents for this department + section
            const grouped = groupIncidents(IncidentLevelApproval)
                .filter(i => i.dep_slno === dep.dep_id && i.sec_slno === dep.sec_id)
                .sort((a, b) => b?.inc_register_slno - a?.inc_register_slno);


            const acknowledged = grouped.filter(item => {
                const details = safeParse(item?.data_collection_details);
                const actions = safeParse(item?.inc_action_details);

                const validDetails = details.filter(d =>
                    d?.inc_dep_status !== null && d?.level_no !== null
                );
                const validActions = actions.filter(a =>
                    a?.inc_dep_action_status !== null && a?.level_no !== null
                );

                if (validDetails.length === 0 && validActions.length === 0) return true;

                const lowerDARNotApproved = validActions.some(a => Number(a.level_no) < currLevel && Number(a.inc_dep_action_status) !== 1);
                const lowerDDCNotApproved = validDetails.some(d => Number(d.level_no) < currLevel && Number(d.inc_dep_status) !== 1);

                return !lowerDARNotApproved && !lowerDDCNotApproved;
            });

            const FinalGroupData = IsPriorityLevel ? acknowledged : grouped;
            return FinalGroupData.map(item => ({ ...item, currLevel, LevelSlno, LevelName }));
        });

        return {
            rejectedList: allFinalData.filter(i => i?.inc_current_level === i.currLevel && i?.inc_current_level_review_state === 'R'),
            PendingList: allFinalData.filter(i => i?.inc_current_level < i.currLevel),
            ApprovedList: allFinalData.filter(i => i?.inc_current_level >= i.currLevel && i?.inc_current_level_review_state === 'A'),
        };

    }, [IncidentLevelApproval, ApprovalDepartments, empid]);


    /**
     * Memoizing the Tabdetail to Avoid Delay and Re-rendering
     * 
     */
    const TabDetails = useMemo(() => ([
        { id: 0, name: "Pending", data: PendingList },
        { id: 1, name: "Rejected", data: rejectedList },
        { id: 2, name: "Approved", data: ApprovedList },
    ]), [PendingList, rejectedList, ApprovedList]);


    return (
        <Box sx={{ width: '100vw' }}>
            <Inciwrapper title={'INCIDENT APPROVALS'} >
                <TabComponent
                    loadinglist={IncidentLevelApprovalLoading}
                    TabDetails={TabDetails}
                    TotalLevelDepartments={ApprovalDepartments}
                    fetchAgain={FetchAllIncidentLevelApproval}
                />
            </Inciwrapper>
        </Box>
    );

}

export default memo(IncidentApproval);