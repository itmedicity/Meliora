import React, { memo, Suspense, useCallback, useState } from 'react';
import {
    Box,
    Tooltip,
    ModalDialog, Modal, ModalClose
} from '@mui/joy';
import {
    useIncidentFiles
} from '../CommonComponent/CommonFun';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { MdCloseFullscreen } from "react-icons/md";
import DepartmentDataCollectionSkeleton from '../SkeletonComponent/DepartmentDataCollectionSkeleton';
import FilepreviewModal from '../IncidentModals/FilepreviewModal';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import DepartmentActionItem from './DepartmentActionItem';

const DepartmentActionDetail = ({ isLoading, departmentAction }) => {

    const [expanded, setExpanded] = useState([]);
    const [uploadfiles, setUploadFiles] = useState([])
    const [openimages, setIpenImages] = useState(false);

    const { fetchIncidentFiles, loadingFiles } = useIncidentFiles();

    const handleImageClose = useCallback(() => { setIpenImages(false) }, []);

    // console.log(departmentAction, "departmentAction");

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
        (isLoading || loadingFiles)
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
                            <DepartmentActionItem
                                key={index}
                                item={item}
                                index={index}
                                expanded={expanded}
                                toggleExpand={toggleExpand}
                                handleActionfileFetching={handleActionfileFetching}
                            />

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
