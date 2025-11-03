import React, { memo, useMemo } from 'react';
import Inciwrapper from '../../Components/Inciwrapper';
import { Box } from '@mui/joy';
import { getAllIncidentDataCollection } from '../../Master/IncidentManagement/CommonCode/IncidentCommonCode';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import TabComponent from '../Components/TabComponent';
import { groupIncidents } from '../CommonComponent/CommonFun';

const DepartmentDataCollection = () => {

    const { empdept } = useSelector(state => {
        return state.LoginUserData
    });

    const {
        data: IncidentDepartmentdataCollection,
        isLoading: LoadingDepartmentDataCollection,
        refetch: FetchAllIncidentDepartmentDataCollection
    } = useQuery({
        queryKey: ['incidentDataCollect', empdept],
        queryFn: async () => await getAllIncidentDataCollection(empdept),
        enabled: !!empdept
    });



    // grouping data and returning them based on the tabllist
    const { groupedData, PendingList, ApprovedList } = useMemo(() => {
        const grouped = groupIncidents(IncidentDepartmentdataCollection)?.sort(
            (a, b) => b?.inc_register_slno - a?.inc_register_slno
        );

        return {
            groupedData: grouped,
            PendingList: grouped?.filter((item) => item?.inc_dep_status === 0 && item?.inc_dep_rca === null),
            ApprovedList: grouped?.filter(
                (item) => item?.inc_dep_status === 1
            ),
        };
    }, [IncidentDepartmentdataCollection]);

    const TabDetails = [
        { id: 0, name: "Pending", data: PendingList, },
        { id: 1, name: "All List", data: groupedData },
        { id: 2, name: "Approved", data: ApprovedList, }
    ];

    return (
        <Box sx={{ width: '100vw' }}>
            <Inciwrapper title="Department Data Collection">
                {
                    LoadingDepartmentDataCollection &&
                    <CustomeIncidentLoading
                        text={"Loading Registerd Incidents"}
                    />
                }
                <TabComponent
                    level={"DDC"}
                    TabDetails={TabDetails}
                    fetchAgain={FetchAllIncidentDepartmentDataCollection}
                />
            </Inciwrapper>
        </Box>
    );
};

export default memo(DepartmentDataCollection);
