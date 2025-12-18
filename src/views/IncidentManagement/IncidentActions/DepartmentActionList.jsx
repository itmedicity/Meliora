import React, { memo, useMemo } from 'react';
import Inciwrapper from '../../Components/Inciwrapper';
import { Box } from '@mui/joy';
import { useSelector } from 'react-redux';
import TabComponent from '../Components/TabComponent';
import { groupIncidents } from '../CommonComponent/CommonFun';
import { useIncidentDepartmentActions } from '../CommonComponent/useQuery';

const DepartmentActionList = () => {

    const { empdept } = useSelector(state => {
        return state.LoginUserData
    });


    const {
        data: IncidentDepartmentAction,
        isLoading: LoadingIncidentDepartmentAction,
        refetch: FetchAllIncidentDepartmentActions
    } = useIncidentDepartmentActions(empdept);


    // grouping data and returning them based on the tabllist
    const { groupedData, PendingList, ApprovedList } = useMemo(() => {
        const grouped = groupIncidents(IncidentDepartmentAction)?.sort(
            (a, b) => b?.inc_register_slno - a?.inc_register_slno
        );

        return {
            groupedData: grouped,
            PendingList: grouped?.filter((item) => item?.inc_dep_action_status !== 1),
            ApprovedList: grouped?.filter(
                (item) => item?.inc_dep_action_status === 1
            ),
        };
    }, [IncidentDepartmentAction]);

    const TabDetails = useMemo(() => ([
        { id: 0, name: "Pending", data: PendingList, },
        { id: 1, name: "All List", data: groupedData },
        { id: 2, name: "Approved", data: ApprovedList, }
    ]), [PendingList, groupedData, ApprovedList]);


    return (
        <Box sx={{ width: '100vw' }}>
            <Inciwrapper title="DEPARTMENT ACTION DETAIL">
                <TabComponent
                    loadinglist={LoadingIncidentDepartmentAction}
                    level={"DAC"}
                    TabDetails={TabDetails}
                    fetchAgain={FetchAllIncidentDepartmentActions}
                />
            </Inciwrapper>
        </Box>
    );
};

export default memo(DepartmentActionList);
