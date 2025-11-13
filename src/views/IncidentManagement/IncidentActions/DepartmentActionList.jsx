import React, { memo, useMemo } from 'react';
import Inciwrapper from '../../Components/Inciwrapper';
import { Box } from '@mui/joy';
import { getAllIncidentDeparmentAction } from '../../Master/IncidentManagement/CommonCode/IncidentCommonCode';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import TabComponent from '../Components/TabComponent';
import { groupIncidents } from '../CommonComponent/CommonFun';

const DepartmentActionList = () => {

    const { empdept } = useSelector(state => {
        return state.LoginUserData
    });

    const {
        data: IncidentDepartmentAction,
        isLoading: LoadingIncidentDepartmentAction,
        refetch: FetchAllIncidentDepartmentActions
    } = useQuery({
        queryKey: ['incidentaction', empdept],
        queryFn: async () => await getAllIncidentDeparmentAction(empdept),
        enabled: !!empdept
    });


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

    const TabDetails = [
        { id: 0, name: "Pending", data: PendingList, },
        { id: 1, name: "All List", data: groupedData },
        { id: 2, name: "Approved", data: ApprovedList, }
    ];

    return (
        <Box sx={{ width: '100vw' }}>
            <Inciwrapper title="Department Action Detail">
                {
                    LoadingIncidentDepartmentAction &&
                    <CustomeIncidentLoading
                        text={"Loading Registerd Incidents"}
                    />
                }
                <TabComponent
                    level={"DAC"}
                    TabDetails={TabDetails}
                    fetchAgain={FetchAllIncidentDepartmentActions}
                />
            </Inciwrapper>
        </Box>
    );
};

export default memo(DepartmentActionList);
