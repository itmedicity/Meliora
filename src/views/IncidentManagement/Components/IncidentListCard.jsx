import React, { memo, useCallback, useState, lazy, Suspense, useMemo } from 'react';
import { Box, Divider, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { CgFileDocument } from "react-icons/cg";
import { BiSolidEditAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import IncidentTextComponent from './IncidentTextComponent';
import {
    formatDateTime,
    handleRateLimitError,
    useHighLevelApprovals,
    useIncidentCardHandlers,
    useIncidentFiles,
    useLevelActionDetails
} from '../CommonComponent/CommonFun';
import CustomeIncidentLoading from './CustomeIncidentLoading';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import AddButtonSkeleton from '../SkeletonComponent/AddButtonSkeleton';
import IncidentStatusSkeleton from '../SkeletonComponent/IncidentStatusSkeleton';
import { safeParse } from '../CommonComponent/Incidnethelper';
// import { useCurrentCompanyData } from '../CommonComponent/useQuery';

// Lazy-loaded components
const AddButton = lazy(() => import('../ButtonComponent/AddButton'));
const IncidentStatus = lazy(() => import('./IncidentStatus'));
const IncidentViewModal = lazy(() => import('../IncidentModals/IncidentViewModal'));
const IncidentTagChip = lazy(() => import('./IncidentTagChip'));
const DataCollectionChip = lazy(() => import('./DataCollectionChip'));
const FileAttachment = lazy(() => import('./FileAttachment'));
const FishBoneAnalysisIcon = lazy(() => import('./FishBoneAnalysisIcon'));
const FishBoneModal = lazy(() => import('../IncidentModals/FishBoneModal'));
const FiveWhyModal = lazy(() => import('../IncidentModals/FiveWhyModal'));
const FilepreviewModal = lazy(() => import('../IncidentModals/FilepreviewModal'));

const IncidentListCard = ({
    items,
    fetchAgain,
    level,
    status,
    icons,
    levelNo,
    levelSlno,
    loadinglevel,
    FinalIncidentLevels,
    CompanyName,
    key
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [uploadedfiles, setUploadedFiles] = useState([]);
    const [openimages, setIpenImages] = useState(false);
    const [openfivewhymodal, setOpenFiveWhyModal] = useState(false);
    const [fishbonemodal, setFishBoneModal] = useState(false);
    const [fbaloading, setFbaLoading] = useState(false);
    const [fbadetail, setFbaDetail] = useState([]);
    const [approvaldetails, setApprovalDetails] = useState([]);
    const [levelitems, setLevelItems] = useState([]);
    const [levelactionreview, setLevelActionReview] = useState([]);

    const tags = useMemo(() => items?.nature_of_inc || [], [items?.nature_of_inc]);

    const { fetchIncidentFiles, loadingFiles } = useIncidentFiles();

    const { FetchAllHigLevelApprovals, loadingapprovals } = useHighLevelApprovals();

    const { FetchAllActionReviewDetails, loadingactionsreviewdetail } = useLevelActionDetails();

    const handleClose = useCallback(() => setOpen(false), []);




    // Using Common Helper to fetch All Detail in one Click 
    const { fetchAllData } = useIncidentCardHandlers({
        fetchIncidentFiles,
        FetchAllHigLevelApprovals,
        FetchAllActionReviewDetails
    });

    //  **REPLACED YOUR OLD HandleViewOption WITH OPTIMIZED ONE**
    const HandleViewOption = useCallback(async (id, fileStatus) => {
        const { files, approvalDetail, levelActionDetail, levelItems } =
            await fetchAllData(id, fileStatus, levelSlno);

        setUploadedFiles(files || []);
        setApprovalDetails(approvalDetail || []);
        setLevelActionReview(levelActionDetail || []);
        setLevelItems(levelItems || []);

        setOpen(true);
    }, [fetchAllData, levelSlno]);

    const HandleEditOption = useCallback(async (items) => {
        let files = [];
        if (items?.file_status === 1) {
            files = await fetchIncidentFiles(`/incidentMaster/getincidentfile/${items?.inc_register_slno}`)
        }
        navigate("/Home/IncidentReg", { state: { incidentData: items, files, isEdit: true } });
    }, [fetchIncidentFiles, navigate]);


    // show the incident files when clicking on the outside 
    const handleImageView = useCallback(async (id, status) => {
        if (status === 1) {
            const files = await fetchIncidentFiles(`/incidentMaster/getincidentfile/${id}`);
            setUploadedFiles(files);
        }
        setIpenImages(true)
    }, []);

    const handleImageClose = useCallback(() => { setIpenImages(false) }, []);

    const parsedDetails = safeParse(items?.data_collection_details);

    const hasSameSection = parsedDetails?.some(
        (row) => row.section === items?.sec_name
    );

    const dataCollection = hasSameSection
        ? parsedDetails
        : [...parsedDetails, { section: items?.sec_name, inc_dep_status: 1 }];

    //Modal opening and Analysis detail
    const handleFishboneModal = async () => {
        setFbaLoading(true)
        setFishBoneModal(true)
        const payload = { inc_register_slno: items?.inc_register_slno }
        try {
            // Fetching Incident Fishbone Details
            const { data: deptRes } = await axioslogin.post("/incidentMaster/getallfbadetail", payload);
            if (deptRes?.success !== 2) return warningNotify(deptRes?.message);
            setFbaDetail(deptRes ? deptRes?.data : [])
        } catch (error) {
            if (handleRateLimitError(error)) return [];
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            setFbaLoading(false)
        }
    }

    return (
        <Box key={key}>
            <Box

                sx={{
                    width: '100%', mb: 2,
                    p: 1,
                    flexDirection: 'column',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "4px solid var(--rose-pink-400)",
                    borderLeftWidth: "4px",   // keep left
                    borderRightWidth: "none",  // keep right
                    borderTop: "none",        // remove top
                    borderBottom: "none",     // remove bottom
                    borderRadius: "20px / 15px",
                    boxShadow: 'md'

                }}>
                {/* Top Card */}
                <Box sx={{
                    width: '100%',
                    minHeight: 120,
                    borderBottom: '1px solid #D0BFFF',
                    borderRadius: 5,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    py: 1,
                    cursor: 'pointer',
                }}>
                    {/* Left Section */}
                    <Box sx={{ width: '15%', display: 'flex', flexDirection: 'column', gap: 0.2 }}>
                        <IncidentTextComponent text={`${CompanyName}${items?.inc_register_slno}`} color="var(--royal-purple-400)" size={18} weight={900} />
                        <IncidentTextComponent text={formatDateTime(items?.create_date, "dd/MM/yyyy hh:mm:ss a")} color="#403d3dff" size={13} weight={400} />
                        <IncidentTextComponent text={items?.em_name} color="#1a1a1a" size={14} weight={700} />
                        <IncidentTextComponent text={items?.sec_name} color="#5A5A5A" size={12} weight={500} />
                        <IncidentTextComponent text={items?.desg_name} color="#5A5A5A" size={10} weight={400} />
                    </Box>

                    <Divider orientation="vertical" />

                    {/* Middle Section */}
                    <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                        <IncidentTextComponent
                            text={items?.inc_initiator_name?.toUpperCase()}
                            color="#2b1a4f"
                            size={16}
                            weight={800}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, rowGap: 1, mt: 0.5 }}>
                            {tags?.map((tag) => (
                                <IncidentTagChip key={tag} tag={tag} />
                            ))}
                        </Box>
                    </Box>

                    <Divider orientation="vertical" />

                    <Box sx={{ width: '25%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <IncidentTextComponent
                            text={'Involving Departments'}
                            color="#2b1a4f"
                            size={16}
                            weight={800}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                mt: 0.5,
                            }}
                        >
                            {dataCollection && dataCollection
                                ?.filter(item => item.inc_dep_status !== null && item.section !== null)
                                ?.filter(
                                    (item, index, self) =>
                                        index === self.findIndex(d => d.section === item.section)
                                )
                                ?.map((dep, index) => (
                                    <DataCollectionChip
                                        key={index}
                                        status={dep?.inc_dep_status}
                                        label={dep?.section}
                                    />
                                ))}
                        </Box>
                    </Box>


                    <Divider orientation="vertical" />

                    {/* Right Section */}
                    <Box sx={{ width: '55%', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box>
                            <IncidentTextComponent text="Incident Description" color="#74359c" size={14} weight={700} />
                            <IncidentTextComponent
                                text={items?.inc_describtion}
                                color="#403d3dff"
                                size={12}
                                weight={400}
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            />
                        </Box>
                        <Box>
                            <IncidentTextComponent text=" Corrective Action" color="#74359c" size={14} weight={700} />
                            <IncidentTextComponent
                                text={items?.inc_reg_corrective || ''}
                                color="#403d3dff"
                                size={12}
                                weight={400}
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Bottom Actions */}
                <Box sx={{
                    width: '100%',
                    height: 50,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    px: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Suspense fallback={<AddButtonSkeleton />}>
                            <AddButton
                                onClick={() => HandleViewOption(items?.inc_register_slno, items?.file_status)}
                                label="View"
                                icon={CgFileDocument}
                            />
                            {
                                Number(items?.inc_current_level) === 0
                                && level === 'REGISTERED USER' &&
                                <AddButton
                                    onClick={() => HandleEditOption(items)}
                                    label="Edit"
                                    icon={BiSolidEditAlt}
                                />
                            }
                        </Suspense>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Suspense fallback={<IncidentStatusSkeleton />}>
                            {
                                loadinglevel ?
                                    <IncidentStatusSkeleton /> :
                                    <IncidentStatus text={status} icon={icons} />
                            }
                        </Suspense>
                        {
                            items?.file_status === 1 &&
                            <FileAttachment
                                onClick={() =>
                                    handleImageView(items?.inc_register_slno, items?.file_status)}
                            />
                        }

                        <>
                            <FishBoneAnalysisIcon onClick={handleFishboneModal} />
                        </>

                    </Box>
                </Box>
            </Box>



            {/* Lazy Modal */}
            <Modal open={open} onClose={handleClose}>
                <ModalDialog sx={{ borderRadius: 'lg' }}>
                    <ModalClose onClick={handleClose} />
                    <Suspense fallback={<CustomeIncidentLoading text={"Loading Data..."} />}>
                        <IncidentViewModal
                            items={items}
                            loading={loadingFiles || loadingapprovals || loadingactionsreviewdetail}
                            IncidentFiles={uploadedfiles}
                            fetchAgain={fetchAgain}
                            setOpenModal={setOpen}
                            level={level}
                            levelNo={levelNo}
                            highlevelapprovals={approvaldetails}
                            levelitems={levelitems}
                            levelactionreview={levelactionreview}
                            FinalIncidentLevels={FinalIncidentLevels}
                            CompanyName={CompanyName}
                        />
                    </Suspense>
                </ModalDialog>
            </Modal>

            {
                uploadedfiles?.length > 0 &&
                <Modal open={openimages} onClose={handleImageClose}>
                    <ModalDialog sx={{ borderRadius: 'lg' }}>
                        <ModalClose onClick={handleImageClose} />
                        <Suspense fallback={<CustomeIncidentLoading text={"Loading Data..."} />}>
                            <FilepreviewModal
                                IncidentFiles={uploadedfiles}
                            />
                        </Suspense>
                    </ModalDialog>
                </Modal>
            }

            <FishBoneModal
                open={fishbonemodal}
                handleClose={() => setFishBoneModal(false)}
                items={items}
                loading={fbaloading}
                apiData={fbadetail}
            />

            <FiveWhyModal
                open={openfivewhymodal}
                handleClose={() => setOpenFiveWhyModal(false)}
                items={items}
            />

        </Box>
    );
};

export default memo(IncidentListCard);
