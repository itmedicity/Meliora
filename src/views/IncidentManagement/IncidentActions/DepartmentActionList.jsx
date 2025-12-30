import React, { memo, useEffect, useMemo } from 'react';
import Inciwrapper from '../../Components/Inciwrapper';
import { Box } from '@mui/joy';
import { useSelector } from 'react-redux';
import TabComponent from '../Components/TabComponent';
import { groupIncidents } from '../CommonComponent/CommonFun';
import { useIncidentDepartmentActions } from '../CommonComponent/useQuery';
import { socket } from 'src/ws/socket'
import { succesNotify } from 'src/views/Common/CommonCode';

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



    // used for refetching if new request have been come
    useEffect(() => {
        if (!socket) return;

        const handleNewRequest = (data) => {
            const requestedDep = data?.actionDetail?.[0]?.inc_action_collect_dep;
            // only visible to the deparment with Rights
            if (Number(empdept) !== Number(requestedDep)) return;

            succesNotify(
                `New Data Collection Requested:${data.actionDetail?.[0]?.requested_employee}`
            );
            // ?? Refresh the list
            FetchAllIncidentDepartmentActions();
        };
        socket.on("new_action_requested", handleNewRequest);
        return () => {
            socket.off("new_action_requested", handleNewRequest);
        };

    }, [socket, empdept, succesNotify, FetchAllIncidentDepartmentActions]);

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
