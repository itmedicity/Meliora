//@ not using Qualitydep
import React, { memo, useMemo } from 'react';
import Inciwrapper from '../../Components/Inciwrapper';
import { Box } from '@mui/joy';
import { Incidentqualitydep } from '../../Master/IncidentManagement/CommonCode/IncidentCommonCode';
import { useQuery } from '@tanstack/react-query';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import TabComponent from '../Components/TabComponent';
import { groupIncidents } from '../CommonComponent/CommonFun';

const Qualitydep = () => {

    const {
        data: QADincident,
        isLoading: loadingQADincidents,
        refetch: fetchAllQADincidents
    } = useQuery({
        queryKey: ['qadincident'],
        queryFn: () => Incidentqualitydep(),
        staleTime: Infinity
    });

    // grouping data and returning them based on the tabllist
    const { groupedData, PendingList, ApprovedList } = useMemo(() => {
        const grouped = groupIncidents(QADincident)?.sort(
            (a, b) => b?.inc_register_slno - a?.inc_register_slno
        );

        return {
            groupedData: grouped,
            PendingList: grouped.filter((item) => item?.inc_qad_ack === 0),
            ApprovedList: grouped.filter(
                (item) => item?.inc_qad_ack === 1 && item?.inc_qad_review_state === 'A'
            ),
        };
    }, [QADincident]);

    const TabDetails = [
        { id: 0, name: "Pending", data: PendingList, },
        { id: 1, name: "All List", data: groupedData },
        { id: 2, name: "Approved", data: ApprovedList, }
    ];

    return (
        <Box sx={{ width: '100vw' }}>
            <Inciwrapper title="Quality Assurance Department"
            // onClose={handleClose}
            >
                {
                    loadingQADincidents &&
                    <CustomeIncidentLoading
                        text={"Please Wait Fetching Data....!"}
                    />
                }
                <TabComponent
                    level={"QUALITY"}
                    TabDetails={TabDetails}
                    fetchAgain={fetchAllQADincidents}
                />
            </Inciwrapper>
        </Box>
    );
};

export default memo(Qualitydep);
