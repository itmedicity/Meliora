import React, { memo, useMemo } from 'react';
import { Box } from '@mui/joy';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import Inciwrapper from 'src/views/Components/Inciwrapper';
import TabComponent from '../Components/TabComponent';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import { hodinchargeApprovalIncident } from 'src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode';
import { groupIncidents } from '../CommonComponent/CommonFun';

const HodApprovals = () => {

    const { empdept, empsecid } = useSelector(state => {
        return state.LoginUserData
    });

    const {
        data: InchargeHodApprovalIncidents,
        isLoading: InciHodApprovalLoading,
        refetch: FetchAllInchargeHodIncident
    } = useQuery({
        queryKey: ['allIncidents', empdept, empsecid],
        queryFn: () => hodinchargeApprovalIncident(empdept, empsecid),
        enabled: !!empdept && !!empsecid
    });


    // grouping data and returning them based on the tabllist
    const { groupedData, PendingList, ApprovedList } = useMemo(() => {
        const grouped = groupIncidents(InchargeHodApprovalIncidents)?.sort(
            (a, b) => b?.inc_register_slno - a?.inc_register_slno
        );

        return {
            groupedData: grouped.filter((item) => item?.inc_hod_ack === 0 && item?.inc_hod_reivew_state === 'R'),
            PendingList: grouped.filter((item) => item?.inc_hod_ack === 0 && item?.inc_hod_reivew_state !== 'R'),
            ApprovedList: grouped.filter((item) => item?.inc_hod_ack === 1 && item?.inc_hod_reivew_state === 'A'),
        };
    }, [InchargeHodApprovalIncidents]);


    const TabDetails = [
        { id: 0, name: "Pending", data: PendingList, },
        { id: 1, name: "Rejected", data: groupedData },
        { id: 2, name: "Approved", data: ApprovedList, }
    ];

    return (
        <Box sx={{ width: '100vw' }}>
            <Inciwrapper title="Hod Approval">
                {InciHodApprovalLoading && (
                    <CustomeIncidentLoading text="Loading Registered Incidents" />
                )}

                <TabComponent
                    level="HOD"
                    TabDetails={TabDetails}
                    edit={false}
                    fetchAgain={FetchAllInchargeHodIncident}
                />
            </Inciwrapper>
        </Box>
    );
};

export default memo(HodApprovals);
