import React, { memo } from 'react';
import { Box, Tooltip, Chip } from "@mui/joy";
import { HiOutlineCollection } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";
import IncidentTextComponent from "../Components/IncidentTextComponent";
import { formatDateTime } from "../CommonComponent/CommonFun";
import ExpandableSection from './ExpandableSection';
import { PiHouseLineDuotone } from "react-icons/pi";
import { FaPersonCircleCheck } from "react-icons/fa6";
import SectionHeader from '../Components/SectionHeader';

const DepartmentCard = ({
    item,
    index,
    expanded,
    toggleExpand,
    handleActionfileFetching
}) => {
    return (
        <Box
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

                    <IncidentTextComponent
                        text={
                            // item?.inc_dep_status === 1
                            //     ? `${item?.Requested_to || item?.acknowledged_user} (${item?.dept_name})`
                            //     : item?.dept_name
                            `${item?.Requested_to || item?.acknowledged_user} (${item?.dept_name})`
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
                        size="sm"
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

                    {/* {item?.inc_dep_status === 1 && ( */}
                    <Tooltip
                        title="View"
                        size="sm"
                        variant="plain"
                        onClick={() => toggleExpand(index)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <span style={{cursor:'pointer'}}> 
                            {expanded.includes(index)
                                ? <FaRegEye size={18} />
                                : <PiEyeClosedDuotone size={18} />}
                        </span>
                    </Tooltip>
                    {/* )} */}
                </Box>
            </Box>

            {/* Expandable Section */}
            {
                expanded.includes(index) &&
                <>


                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Tooltip title="Requested User">
                            <span style={{ cursor: 'pointer' }}>
                                <FaPersonCircleCheck style={{ color: item?.inc_dep_status === 0 ? 'var(--royal-purple-400)' : 'green', fontSize: 18 }} />
                            </span>
                        </Tooltip>
                        {/* Only department name */}
                        <IncidentTextComponent
                            text={item?.Requested_user}
                            size={14}
                            weight={600}
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Tooltip title="Department">
                            <span style={{ cursor: 'pointer' }}>
                                <PiHouseLineDuotone style={{ color: '#666', fontSize: 14 }} />
                            </span>
                        </Tooltip>
                        {/* Only department name */}
                        <IncidentTextComponent
                            text={item?.requested_dep}
                            size={13}
                            weight={400}
                            color="#555"
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', mb: 2 }}>
                        <Tooltip title="Requested Date">
                            <span style={{ cursor: 'pointer' }}>
                                <IoCalendarOutline style={{ color: '#666', fontSize: 14 }} />
                            </span>
                        </Tooltip>
                        <IncidentTextComponent
                            text={formatDateTime(item?.Requested_date, "dd/MM/yyyy hh:mm:ss a")}
                            size={12}
                            weight={400}
                            color="#555"
                        />
                    </Box>

                    <SectionHeader text="REMARKS" />
                    <IncidentTextComponent
                        text={`"${item?.inc_req_remark}"`}
                        size={13}
                        weight={400}
                        color="#444"
                    />
                </>
            }
            <ExpandableSection
                isOpen={expanded.includes(index)}
                rca={item?.inc_dep_rca}
                preventiveAction={item?.inc_dep_preventive_action}
                hasFile={item?.inc_ddc_file_status === 1}
                fileId={item?.inc_data_collection_slno}
                onFileClick={handleActionfileFetching}
            />
        </Box>
    );
};

export default memo(DepartmentCard);
