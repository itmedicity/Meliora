import React, { memo, Suspense, useCallback, useState } from 'react';
import { Box, Chip, Tooltip, IconButton, ModalDialog, Modal, ModalClose } from '@mui/joy';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa';
import { PiEyeClosedDuotone } from "react-icons/pi";
// import { HiOutlineCollection } from "react-icons/hi";
import IncidentTextComponent from '../Components/IncidentTextComponent';
import DepartmentDataCollectionSkeleton from '../SkeletonComponent/DepartmentDataCollectionSkeleton';
import { formatDateTime, useIncidentFiles } from '../CommonComponent/CommonFun';
import DepartmentActionSendUserCard from './DepartmentActionSendUserCard';
import { MdCloseFullscreen } from "react-icons/md";
import { FaMandalorian } from "react-icons/fa";
import { IoAttachOutline } from "react-icons/io5";
import FilepreviewModal from '../IncidentModals/FilepreviewModal';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';

const DepartmentActionDetail = ({ isLoading, departmentAction }) => {

    const [expanded, setExpanded] = useState([]);
    const [uploadfiles, setUploadFiles] = useState([])
    const [openimages, setIpenImages] = useState(false);

    const { fetchIncidentFiles, loadingFiles } = useIncidentFiles();
    console.log(loadingFiles, uploadfiles, "loadingFiles");

    const handleImageClose = useCallback(() => { setIpenImages(false) }, []);

    const toggleExpand = (index) => {
        setExpanded(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    //  Collapse all open details
    const handleCollapseAll = () => {
        setExpanded([]);
    };

    const handleActionfileFetching = async (slno) => {
        const files = await fetchIncidentFiles(`/incidentMaster/getincidentactionfile/${slno}`);
        setUploadFiles(files);
        setIpenImages(true)
    }

    return (
        isLoading
            ? <DepartmentDataCollectionSkeleton />
            : (
                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2, background: "#f7f2f255" }}>
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: 'var(--royal-purple-400)',
                            py: 0.5,
                            px: 2,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <IncidentTextComponent
                            text="DEPARTMENT ACTION DETAILS"
                            size={14}
                            weight={600}
                            color="White"
                        />

                        {/* New Collapse All Icon */}
                        {expanded?.length > 0 && (
                            <Tooltip title="Collapse All" variant="soft" size="sm">
                                <Box

                                    onClick={handleCollapseAll}
                                    sx={{
                                        color: "white",
                                        transition: "transform 0.2s ease-in-out",
                                        '&:hover': { transform: "scale(1.2)" },
                                        cursor: 'pointer'
                                    }}
                                >
                                    <MdCloseFullscreen size={20} />
                                </Box>
                            </Tooltip>
                        )}
                    </Box>

                    {
                        departmentAction?.map((item, index) => (

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
                                        <FaMandalorian style={{ color: 'var(--royal-purple-400)', fontSize: 18 }} />
                                        <IncidentTextComponent
                                            text={`${item?.acknowledged_department}`}
                                            size={14}
                                            weight={600}
                                        />
                                        {
                                            item?.acknowledge_employee && <IncidentTextComponent
                                                text={`(${item?.acknowledge_employee ?? item?.acknowledge_employee})`}
                                                size={14}
                                                weight={600}
                                            />
                                        }

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Tooltip
                                            title="Action Date"
                                            placement="top"
                                            variant="soft"
                                            size='sm'
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <IoCalendarOutline style={{ color: '#666', fontSize: 14 }} />
                                                <IncidentTextComponent
                                                    text={formatDateTime(item?.create_date, "dd/MM/yyyy hh:mm:ss a")}
                                                    size={12}
                                                    weight={400}
                                                    color="#555"
                                                />
                                            </Box>
                                        </Tooltip>

                                        <Chip size="sm" color={item?.inc_dep_action_status === 1 ? "success" : 'warning'} variant="soft">
                                            {
                                                item?.inc_dep_action_status === 1 ? "Acknowledged" : 'Pending'
                                            }
                                        </Chip>
                                        {
                                            item?.inc_dep_action_status === 1 &&

                                            < Tooltip
                                                title="View Detail"
                                                size="sm"
                                                variant="plain"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => toggleExpand(index)}>
                                                <span
                                                    style={{ cursor: 'pointer' }}>
                                                    {
                                                        expanded.includes(index) ? (
                                                            <FaRegEye size={18} />
                                                        ) : (
                                                            <PiEyeClosedDuotone size={18} />
                                                        )
                                                    }
                                                </span>
                                            </Tooltip>
                                        }
                                    </Box>
                                </Box>

                                {/* Collapsible Detail */}
                                {
                                    expanded.includes(index) && (
                                        <Box sx={{
                                            mt: 1.5,
                                            p: 1,
                                            borderRadius: "8px",
                                            backgroundColor: "#f9f6ff",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1
                                        }}>
                                            {
                                                <Box sx={{ mb: 2, overflow: "hidden" }}>
                                                    <DepartmentActionSendUserCard
                                                        employeeName={item?.requested_employee}
                                                        departmentName={item?.requested_department}
                                                        sectionName={item?.requested_emp_sec}
                                                        designation={item?.desg_name}
                                                        createDate={item?.create_date}
                                                    />
                                                </Box>
                                            }
                                            <Chip size="sm" variant="soft" color="primary">
                                                Requested Remarks
                                            </Chip>
                                            <IncidentTextComponent
                                                text={item?.inc_dep_action_remark || "No remarks provided"}
                                                size={13}
                                                weight={400}
                                                color="#444"
                                            />

                                            <Chip size="sm" variant="soft" color="warning">
                                                Taken Action
                                            </Chip>
                                            <IncidentTextComponent
                                                text={item?.inc_action || "No additional details"}
                                                size={13}
                                                weight={400}
                                                color="#444"
                                            />
                                            {
                                                item?.inc_file_status === 1 &&
                                                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <IconButton
                                                        onClick={() => handleActionfileFetching(item?.inc_dep_action_detail_slno)}
                                                        component="span"
                                                        color="primary"
                                                        sx={{ bgcolor: '#ede7f6', '&:hover': { bgcolor: '#d1c4e9' } }}
                                                    >
                                                        <IoAttachOutline size={20} />
                                                    </IconButton>

                                                    <IncidentTextComponent text="Attaced files" size={13} weight={500} color="#444" />
                                                </Box>
                                            }


                                        </Box>
                                    )
                                }
                            </Box>
                        ))
                    }


                    {
                        uploadfiles?.length > 0 &&
                        <Modal open={openimages} onClose={handleImageClose}>
                            <ModalDialog sx={{ borderRadius: 'lg' }}>
                                <ModalClose onClick={handleImageClose} />
                                <Suspense fallback={<CustomeIncidentLoading text={"Loading Data..."} />}>
                                    <FilepreviewModal
                                        IncidentFiles={uploadfiles}
                                    />
                                </Suspense>
                            </ModalDialog>
                        </Modal>

                    }
                </Box >
            )
    );
};

export default memo(DepartmentActionDetail);
