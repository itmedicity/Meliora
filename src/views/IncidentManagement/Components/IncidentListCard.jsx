import React, { memo, useCallback, useState, lazy, Suspense, useMemo } from 'react';
import { Box, Divider, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { CgFileDocument } from "react-icons/cg";
import { BiSolidEditAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import IncidentTextComponent from './IncidentTextComponent';
import { formatDateTime, useHighLevelApprovals, useIncidentFiles } from '../CommonComponent/CommonFun';
import CustomeIncidentLoading from './CustomeIncidentLoading';
import FileAttachment from './FileAttachment';
import FilepreviewModal from '../IncidentModals/FilepreviewModal';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import FiveWhyAnalysisIcon from './FiveWhyAnalysisIcon';
import FiveWhyModal from '../IncidentModals/FiveWhyModal';
import FishBoneModal from '../IncidentModals/FishBoneModal';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import FishBoneAnalysisIcon from './FishBoneAnalysisIcon';
// import { fetchAllInvolvedDep } from 'src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode';
// import { useQuery } from '@tanstack/react-query';

// Lazy-loaded components
const AddButton = lazy(() => import('../ButtonComponent/AddButton'));
const IncidentStatus = lazy(() => import('./IncidentStatus'));
const IncidentViewModal = lazy(() => import('../IncidentModals/IncidentViewModal'));

const IncidentListCard = ({
    items,
    fetchAgain,
    level,
    status,
    icons,
    levelNo
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

    const tags = useMemo(() => items?.nature_of_inc || [], [items?.nature_of_inc]);

    const { fetchIncidentFiles, loadingFiles } = useIncidentFiles();

    const { FetchAllHigLevelApprovals, loadingapprovals } = useHighLevelApprovals();

    const handleClose = useCallback(() => setOpen(false), []);

    const HandleViewOption = useCallback(async (id, status) => {
        if (status === 1) {
            const files = await fetchIncidentFiles(`/incidentMaster/getincidentfile/${items?.inc_register_slno}`);
            setUploadedFiles(files);
        }
        const approvalDetail = await FetchAllHigLevelApprovals(id)
        setApprovalDetails(approvalDetail)
        setOpen(true);
    }, [fetchIncidentFiles]);

    const HandleEditOption = useCallback(async (items) => {
        let files = [];
        if (items?.file_status === 1) {
            files = await fetchIncidentFiles(items?.inc_register_slno);
        }
        navigate("/Home/IncidentReg", { state: { incidentData: items, files, isEdit: true } });
    }, [fetchIncidentFiles, navigate]);

    const handleImageView = useCallback(async (id, status) => {
        if (status === 1) {
            const files = await fetchIncidentFiles(`/incidentMaster/getincidentfile/${items?.inc_register_slno}`);
            setUploadedFiles(files);
        }
        setIpenImages(true)
    }, []);

    const handleImageClose = useCallback(() => { setIpenImages(false) }, []);


    const parsedDetails = items?.data_collection_details
        ? JSON.parse(items?.data_collection_details)
        : [];

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
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            setFbaLoading(false)
        }
    }

    return (
        <>
            <Box sx={{
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
                    // borderBottom: 'none',
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
                        <IncidentTextComponent text={`INCI/TMCH/${items?.inc_register_slno}`} color="var(--royal-purple-400)" size={18} weight={900} />
                        <IncidentTextComponent text={formatDateTime(items?.create_date, "dd/MM/yyyy hh:mm:ss a")} color="#403d3dff" size={13} weight={400} />
                        <IncidentTextComponent text={items?.em_name} color="#1a1a1a" size={14} weight={700} />
                        <IncidentTextComponent text={items?.dept_name} color="#5A5A5A" size={12} weight={500} />
                        <IncidentTextComponent text={items?.desg_name} color="#5A5A5A" size={10} weight={400} />
                    </Box>

                    <Divider orientation="vertical" />

                    {/* Middle Section */}
                    <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                        <IncidentTextComponent
                            text={items?.inc_initiator_name?.toUpperCase()}
                            color="#2b1a4f"
                            size={16}
                            weight={800}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, rowGap: 1, mt: 0.5 }}>
                            {tags.map((tag) => (
                                <Box key={tag} sx={{
                                    px: 1.4,
                                    py: 0.3,
                                    background: '#ede5f9',
                                    border: '1px solid #c6b6e9',
                                    borderRadius: '20px',
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: '#5d3a9c',
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5,
                                    boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.05)',
                                    transition: 'background 0.3s',
                                    '&:hover': { background: '#e2d6f3' },
                                }}>
                                    {tag}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Divider orientation="vertical" />

                    <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                            {dataCollection && dataCollection?.map((dep, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        px: 1.5,
                                        py: 0.6,
                                        background: 'linear-gradient(135deg, #f5f0ff, #ece3fa)',
                                        border: '1px solid #c6b6e9',
                                        borderRadius: '12px',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: '#3b2a6a',
                                        letterSpacing: 0.3,
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                        transition: 'all 0.2s ease-in-out',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.6,
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #ece3fa, #e0d4f7)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    {/* Small bullet/indicator */}
                                    {
                                        dep?.inc_dep_status === 1 ? (
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: '#1f690dd1',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                ✓
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    background: '#5d3a9c',
                                                }}
                                            />
                                        )
                                    }

                                    {dep?.section}
                                </Box>
                            ))}
                        </Box>
                    </Box>


                    <Divider orientation="vertical" />

                    {/* Right Section */}
                    <Box sx={{ width: '50%', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <IncidentTextComponent text="Incident Description" color="#74359c" size={14} weight={700} />
                        <IncidentTextComponent
                            text={items?.inc_describtion}
                            color="#403d3dff"
                            size={14}
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

                {/* Bottom Actions */}
                <Box sx={{
                    width: '100%',
                    height: 50,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    // border: '1px solid #D0BFFF',
                    px: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    // bgcolor: '#eeeafaff'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Suspense fallback={<span>Loading...</span>}>
                            <AddButton
                                onClick={() => HandleViewOption(items?.inc_register_slno, items?.file_status)}
                                label="View"
                                icon={CgFileDocument}
                            />
                            {
                                !(items?.inc_incharge_ack === 1 || items?.inc_hod_ack === 1)
                                && level === 'registerduser' &&
                                <AddButton
                                    onClick={() => HandleEditOption(items)}
                                    label="Edit"
                                    icon={BiSolidEditAlt}
                                />
                            }
                        </Suspense>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Suspense fallback={<span>Loading...</span>}>
                            <IncidentStatus text={status} icon={icons} />
                        </Suspense>
                        {
                            items?.file_status === 1 &&
                            <FileAttachment
                                onClick={() =>
                                    handleImageView(items?.inc_register_slno, items?.file_status)}
                            />
                        }


                        {/* {
                            level === 'HOD' && */}
                        <>
                            <FiveWhyAnalysisIcon onClick={handleFishboneModal} />
                            <FishBoneAnalysisIcon onClick={handleFishboneModal} />

                        </>
                        {/* } */}
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
                            loading={loadingFiles || loadingapprovals}
                            IncidentFiles={uploadedfiles}
                            fetchAgain={fetchAgain}
                            setOpenModal={setOpen}
                            level={level}
                            publicNasFolder={PUBLIC_NAS_FOLDER}
                            levelNo={levelNo}
                            highlevelapprovals={approvaldetails}
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
                                registerSlno={items?.inc_register_slno}
                                publicNasFolder={PUBLIC_NAS_FOLDER}
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


        </>
    );
};

export default memo(IncidentListCard);
