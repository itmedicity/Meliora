import React, { memo, useMemo } from 'react';
import { Box } from '@mui/joy';
import Inciwrapper from '../../Components/Inciwrapper';
import { useSelector } from 'react-redux';
import { groupIncidents } from '../CommonComponent/CommonFun';
import { useIncidentDepartmentDataCollection } from '../CommonComponent/useQuery';

import TabComponent from '../Components/TabComponent';
import { safeParse } from '../CommonComponent/Incidnethelper';

const DepartmentDataCollection = () => {

    const { empdept } = useSelector(state => {
        return state.LoginUserData
    });

    const {
        data: IncidentDepartmentdataCollection,
        isLoading: LoadingDepartmentDataCollection,
        refetch: FetchAllIncidentDepartmentDataCollection
    } = useIncidentDepartmentDataCollection(empdept);


    // grouping data and returning them based on the tabllist
    const { groupedData, PendingList, ApprovedList } = useMemo(() => {
        const grouped = groupIncidents(IncidentDepartmentdataCollection)?.sort(
            (a, b) => b?.inc_register_slno - a?.inc_register_slno
        );

        const result = grouped?.reduce(
            (acc, item) => {
                const details = safeParse(item?.data_collection_details) || [];

                const validDetails = details.filter(
                    d => d?.inc_dep_status !== null && d?.inc_dep_rca !== null
                );

                const hasPending = validDetails?.some(d => d.inc_dep_status === 0);
                const allApproved =
                    validDetails.length > 0 &&
                    validDetails.every(d => d.inc_dep_status === 1);

                if (hasPending) acc.pending.push(item);
                else if (allApproved) acc.approved.push(item);

                return acc;
            },
            { pending: [], approved: [] }
        );


        return {
            groupedData: grouped,
            PendingList: result.pending,
            ApprovedList: result.approved,
        };
    }, [IncidentDepartmentdataCollection]);


    // Tab List 
    const TabDetails = useMemo(() => ([
        { id: 0, name: "Pending", data: PendingList, },
        { id: 1, name: "All List", data: groupedData },
        { id: 2, name: "Approved", data: ApprovedList, }
    ]), [PendingList, groupedData, ApprovedList]);


    return (
        <Box sx={{ width: '100vw' }}>
            <Inciwrapper title="DEPARTMENT DATA COLLECTION">
                <TabComponent
                    loadinglist={LoadingDepartmentDataCollection}
                    level={"DDC"}
                    TabDetails={TabDetails}
                    fetchAgain={FetchAllIncidentDepartmentDataCollection}
                />
            </Inciwrapper>
        </Box>
    );
};

export default memo(DepartmentDataCollection);
