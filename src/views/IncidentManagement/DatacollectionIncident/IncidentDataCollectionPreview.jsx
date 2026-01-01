import React, { memo, useState, Suspense, lazy } from 'react';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import {
    Box,
    ModalDialog,
    Modal, ModalClose
} from '@mui/joy';
import DepartmentDataCollectionSkeleton from '../SkeletonComponent/DepartmentDataCollectionSkeleton';
import {
    useIncidentFiles
} from '../CommonComponent/CommonFun';
import CustomeIncidentLoading from '../Components/CustomeIncidentLoading';
import DepartmentCard from './DepartmentCard';

const FilepreviewModal = lazy(() => import('../IncidentModals/FilepreviewModal'));

const IncidentDataCollectionPreview = ({ involvedDepartment, loading }) => {

    const [expanded, setExpanded] = useState([]);
    const [uploadfiles, setUploadFiles] = useState([])
    const [openimages, setIpenImages] = useState(false);

    // Common Image get Funcitons
    const { fetchIncidentFiles, loadingFiles } = useIncidentFiles();

    // Opening Eye Icon 
    const toggleExpand = (index) => {
        if (expanded.includes(index)) {
            setExpanded(expanded.filter(i => i !== index));
        } else {
            setExpanded([...expanded, index]);
        }
    };
    //Handle modal Close Fun
    const handleImageClose = () => { setIpenImages(false) };

    const acknowledged = involvedDepartment && involvedDepartment?.filter(item => item?.inc_dep_status === 1);
    const notAcknowledged = involvedDepartment && involvedDepartment?.filter(item => item?.inc_dep_status !== 1);
    const orderedDepartments = involvedDepartment && [...acknowledged, ...notAcknowledged];


    // fetching files
    const handleActionfileFetching = async (slno) => {
        const files = await fetchIncidentFiles(`/incidentMaster/getdatacollectionfiles/${slno}`);
        setUploadFiles(files);
        setIpenImages(true)
    }

    return (
        (loading || loadingFiles)
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
                            <DepartmentCard
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
                                <Suspense fallback={<CustomeIncidentLoading text={"Loading File Please Wait..."} />}>
                                    <FilepreviewModal
                                        IncidentFiles={uploadfiles}
                                    />
                                </Suspense>
                            </ModalDialog>
                        </Modal>

                    }
                </Box >
            )


    )
}

export default memo(IncidentDataCollectionPreview);
