import React, { memo, useState } from 'react';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { Box, Chip, Tooltip } from '@mui/joy';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedDuotone } from "react-icons/pi";
import { HiOutlineCollection } from "react-icons/hi";
// import { fetchAllInvolvedDep } from 'src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode';
// import { useQuery } from '@tanstack/react-query';
import DepartmentDataCollectionSkeleton from '../SkeletonComponent/DepartmentDataCollectionSkeleton';
import { formatDateTime } from '../CommonComponent/CommonFun';


const IncidentDataCollectionPreview = ({ involvedDepartment, loading }) => {

    // const { inc_register_slno } = incidentdata;

    const [expanded, setExpanded] = useState([]);

    const toggleExpand = (index) => {
        if (expanded.includes(index)) {
            setExpanded(expanded.filter(i => i !== index));
        } else {
            setExpanded([...expanded, index]);
        }
    };

    //fetching involved department from inc data collection 
    // const {
    //     data: involvedDepartment,
    //     isLoading: loadinginvolveddepartment,
    // } = useQuery({
    //     queryKey: ['allinvdep', inc_register_slno],
    //     queryFn: () => fetchAllInvolvedDep(inc_register_slno),
    //     enabled: !!inc_register_slno,
    // });


    const acknowledged = involvedDepartment && involvedDepartment?.filter(item => item?.inc_dep_status === 1);
    const notAcknowledged = involvedDepartment && involvedDepartment?.filter(item => item?.inc_dep_status !== 1);
    const orderedDepartments = involvedDepartment && [...acknowledged, ...notAcknowledged];


    return (
        loading
            ? <DepartmentDataCollectionSkeleton />
            :
            (
                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2, background: "#f7f2f255" }}>
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: 'var(--royal-purple-400)',
                            py: 0.5,
                            px: 2,
                        }}>
                        <IncidentTextComponent
                            text="DEPARTMENT RCA DETIALS"
                            size={14}
                            weight={600}
                            color="White"
                        />
                    </Box>

                    {
                        orderedDepartments?.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    p: 1.5,
                                    borderRadius: "7px",
                                    background: "#fafafa",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0.5
                                }}
                            >
                                {/* Header */}
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <HiOutlineCollection style={{ color: 'var(--royal-purple-400)', fontSize: 18 }} />
                                        {/* Only department name */}
                                        <IncidentTextComponent
                                            text={
                                                item?.inc_dep_status === 1
                                                    ? `${item?.acknowledged_user} (${item?.dept_name})`
                                                    : item?.dept_name
                                            }
                                            size={14}
                                            weight={600}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Tooltip
                                            title={item?.inc_req_ack_date ? "Acknowledge Date" : "Requested Date"}
                                            placement="top"
                                            variant="soft"
                                            size='sm'
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
                                                <IoCalendarOutline style={{ color: '#666', fontSize: 14 }} />
                                                <IncidentTextComponent
                                                    text={
                                                        item?.inc_req_ack_date
                                                            ? formatDateTime(item?.inc_req_ack_date, "dd/MM/yyyy hh:mm:ss a")
                                                            : formatDateTime(item?.create_date, "dd/MM/yyyy hh:mm:ss a")
                                                    }
                                                    size={12}
                                                    weight={400}
                                                    color="#555"
                                                />
                                            </Box>
                                        </Tooltip>

                                        <Chip size="sm" color={item?.inc_dep_status === 1 ? "success" : "warning"} variant="soft">
                                            {item?.inc_dep_status === 1 ? "Acknowledged" : "Not Acknowledged"}
                                        </Chip>

                                        {/* Show toggle only if acknowledged */}
                                        {item?.inc_dep_status === 1 && (
                                            <Tooltip title="View" size="sm" variant="plain" sx={{ cursor: 'pointer' }}
                                                onClick={() => toggleExpand(index)}
                                            >
                                                <span style={{ cursor: 'pointer' }}>
                                                    {expanded.includes(index) ? (
                                                        <FaRegEye size={18} />
                                                    ) : (
                                                        <PiEyeClosedDuotone size={18} />
                                                    )}
                                                </span>
                                            </Tooltip>
                                        )}
                                    </Box>
                                </Box>

                                {/* Collapsible Content */}
                                {
                                    expanded?.includes(index) && (
                                        <>
                                            <Box
                                                sx={{
                                                    mt: 1.5,
                                                    p: 1,
                                                    borderRadius: "8px",
                                                    backgroundColor: "#f9f6ff"
                                                }}
                                            >
                                                <Chip size="sm" variant="soft" color="primary" sx={{ mb: 0.5 }}>
                                                    RCA
                                                </Chip>
                                                <IncidentTextComponent
                                                    text={item?.inc_dep_rca}
                                                    size={13}
                                                    weight={400}
                                                    color="#444"
                                                />
                                            </Box>

                                            <Box
                                                sx={{
                                                    mt: 1.5,
                                                    p: 1,
                                                    borderRadius: "8px",
                                                    backgroundColor: "#f9f6ff"
                                                }}
                                            >
                                                <Chip size="sm" variant="soft" color="warning" sx={{ mb: 0.5 }}>
                                                    Preventive Action
                                                </Chip>
                                                <IncidentTextComponent
                                                    text={item?.inc_dep_preventive_action}
                                                    size={13}
                                                    weight={400}
                                                    color="#444"
                                                />
                                            </Box>
                                        </>
                                    )
                                }
                            </Box>
                        ))
                    }
                </Box >
            )


    )
}

export default memo(IncidentDataCollectionPreview);
