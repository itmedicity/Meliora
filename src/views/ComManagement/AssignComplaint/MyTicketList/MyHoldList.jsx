import { Box, Chip, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import ErrorIcon from '@mui/icons-material/Error';
import { keyframes } from '@mui/system';
import ArticleIcon from '@mui/icons-material/Article';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import _ from 'underscore';
import CmQuieryModal from '../Queries/CmQuieryModal';
import AssistneedModal from './AssistneedModal';
import NewRectifyModal from './NewRectifyModal';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import HoldReasonModal from './HoldReasonModal';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import CountDownCm from '../../CountDownCM/CountDownCm';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import ComFileView from '../../CmFileView/ComFileView';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { warningNotify } from 'src/views/Common/CommonCode';
import ViewAssetDetails from '../../ComplaintRegister/TicketLists/ViewAssetDetails';
import InventoryIcon from '@mui/icons-material/Inventory';

const MyHoldList = () => {

    const [allPendingCompl, setAllPendingCompl] = useState([])
    const [count, setCount] = useState(0)
    const [assistNeed, setAssistNeed] = useState([])
    const [assistNeedFlag, setassistNeedFlag] = useState(0)
    const [assistOpen, setAssistOpen] = useState(true)
    const [rectfyDta, setRectfyDta] = useState([])
    const [rectfyFlag, setrectfyFlag] = useState(0)
    const [rectfyOpen, setrectfyOpen] = useState(true)
    const [queryflag, setqueryflag] = useState(0)
    const [queryOpen, setqueryOpen] = useState(false)
    const [valuee, setValuee] = useState([])
    const [holdflag, setHoldflag] = useState(0)
    const [holdOpen, setHoldOpen] = useState(false)
    const [holdData, setHoldData] = useState([])
    const [assignedEmployees, setAssignedEmployees] = useState([])
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [assetArray, setAssetArray] = useState([])
    const [assetflag, setAssetflag] = useState(0)
    const [assetOpen, setAssetOpen] = useState(false)

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const searchData = useMemo(() => {
        return {
            assigned_emp: id
        }
    }, [id])

    useEffect(() => {
        const getAllPendingHoldCompalints = async () => {
            const result = await axioslogin.post('/Rectifycomplit/getEmplHoldList', searchData);
            const { success, data } = result.data;
            if (success === 2) {
                setAllPendingCompl(data)
            } else {
                setAllPendingCompl([])
            }

        }
        getAllPendingHoldCompalints(searchData)
    }, [searchData, count])




    const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;



    const RaiseQuery = useCallback((value) => {
        setqueryflag(1)
        setValuee(value)
        setqueryOpen(true)
    }, [])

    const AssistanceRequest = useCallback((val) => {
        setAssistNeed(val)
        setassistNeedFlag(1)
        setAssistOpen(true)
    }, [])

    const RectifyRequest = useCallback((val) => {
        setRectfyDta(val)
        setrectfyFlag(1)
        setrectfyOpen(true)
    }, [])

    const HoldReason = useCallback((val) => {
        setHoldData(val)
        setHoldflag(1)
        setHoldOpen(true)
    }, [])

    useEffect(() => {
        const getAssignedEmployees = async () => {
            const updatedEmployees = {};
            for (let complaint of allPendingCompl) {
                const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint.complaint_slno}`);
                const { success, data } = result.data;
                if (success === 1) {
                    updatedEmployees[complaint.complaint_slno] = data;
                } else {
                    updatedEmployees[complaint.complaint_slno] = [];
                }
            }
            setAssignedEmployees(updatedEmployees);
        };
        getAssignedEmployees();
    }, [allPendingCompl]);

    useEffect(() => {
        const getAssetinComplaint = async () => {
            const AssetedArray = {};
            for (let complaint of allPendingCompl) {
                const result = await axioslogin.get(`complaintreg/getAssetinComplaint/${complaint.complaint_slno}`);
                const { success, data } = result.data;
                if (success === 2) {
                    AssetedArray[complaint.complaint_slno] = data;
                } else {
                    AssetedArray[complaint.complaint_slno] = [];
                }
            }
            setAssetArray(AssetedArray);
        };
        getAssetinComplaint();
    }, [allPendingCompl]);


    const AssetView = useCallback((value) => {
        setValuee(value)
        setAssetflag(1)
        setAssetOpen(true)
    }, [setAssetflag, setAssetOpen])

    const fileView = async (val) => {
        const { complaint_slno } = val;
        setimage(1);
        setimageViewOpen(true);
        setfileDetails(val);
        try {
            const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`;
                });
                setImageUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setSelectedImages(val);
                } else {
                    warningNotify("No Image attached");
                }
            } else {
                warningNotify("No Image Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }


    return (
        <Box sx={{
            bgcolor: 'white',
            borderRadius: 0
            , height: '70vh',
            overflow: 'auto'
        }}>
            {queryflag === 1 ?
                <CmQuieryModal open={queryOpen} setqueryOpen={setqueryOpen} valuee={valuee}
                    setqueryflag={setqueryflag}
                    setCount={setCount} count={count}
                />
                : null}

            {image === 1 ?
                <ComFileView
                    imageUrls={imageUrls}
                    imageViewOpen={imageViewOpen}
                    selectedImages={selectedImages}
                    fileDetails={fileDetails}
                    setimage={setimage}
                    setimageViewOpen={setimageViewOpen}

                /> : null}
            {assetflag === 1 ?
                <ViewAssetDetails
                    assetOpen={assetOpen}
                    setAssetOpen={setAssetOpen}
                    setAssetflag={setAssetflag}
                    valuee={valuee}
                    count={count}
                    setCount={setCount}
                />
                : null}

            {assistNeedFlag === 1 ?
                <AssistneedModal
                    assistOpen={assistOpen}
                    assistNeedFlag={assistNeedFlag}
                    assistNeed={assistNeed}
                    setassistNeedFlag={setassistNeedFlag}
                    setAssistOpen={setAssistOpen}
                    count={count}
                    setCount={setCount}
                /> :
                null}

            {rectfyFlag === 1 ?
                <NewRectifyModal
                    rectfyOpen={rectfyOpen}
                    setrectfyOpen={setrectfyOpen}
                    setrectfyFlag={setrectfyFlag}
                    rectfyDta={rectfyDta}
                    count={count}
                    setCount={setCount}
                />
                : null}

            {holdflag === 1 ?
                <HoldReasonModal
                    holdOpen={holdOpen}
                    setHoldOpen={setHoldOpen}
                    setHoldflag={setHoldflag}
                    holdData={holdData}
                    count={count}
                    setCount={setCount}
                />
                : null}

            {allPendingCompl.length !== 0 ?
                <Box sx={{ p: .1, mb: .8 }}>
                    {allPendingCompl?.map((val, index) => {
                        return (
                            <Box
                                key={val.complaint_slno}
                                sx={{
                                    flex: 1,
                                    border: 1, borderColor: '#50655B',
                                    borderRadius: 8,
                                    bgcolor: 'white',
                                    // p: .8,
                                    mb: .6

                                }}>
                                {val.aprrox_date !== null ?
                                    <Box sx={{
                                        flex: 1, bgcolor: '#E7D2CC', borderTopRightRadius: 5, borderTopLeftRadius: 5, mb: .1,
                                        mx: .1, display: 'flex', py: .3,
                                    }}>
                                        <Typography sx={{ color: '#026F7E', pl: 1, pt: .2, fontWeight: 700, fontSize: 13 }}>
                                            ASSINGED BY SUPERVISOR
                                        </Typography>
                                        <Typography sx={{ color: 'black', pt: .2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                                            Priority :
                                        </Typography>
                                        <Chip sx={{ bgcolor: 'white', color: '#391306', border: 1, ml: 1, }}>
                                            {val.compalint_priority = 1 ? "Emergency" : val.compalint_priority = 2 ? 'High Priority' :
                                                val.compalint_priority = 3 ? 'Medium Priority' : val.compalint_priority = 4 ? 'Normal' :
                                                    "Normal"}
                                        </Chip>
                                        <Typography sx={{ color: 'black', pt: .2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                                            Aprox Date :
                                        </Typography>
                                        <Chip sx={{ bgcolor: 'white', color: '#391306', border: 1, ml: 1, }}>
                                            {val.aprrox_date}
                                        </Chip>
                                        <Typography sx={{ color: 'black', pt: .2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                                            Remarks :
                                        </Typography>
                                        <Typography sx={{ color: 'black', pt: .2, fontSize: 13, ml: 3 }}>
                                            {val.complaint_remark}
                                        </Typography>
                                    </Box> : null}

                                <Box sx={{ flex: 1, display: 'flex', p: .8, }}>
                                    <Box sx={{
                                        maxWidth: 200,
                                        mx: .3, pr: .5,
                                        borderRight: 1, borderColor: 'lightgrey'
                                    }}>
                                        <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}> Ticket {val.complaint_slno}</Typography>
                                        <Tooltip title='Ticket Registerd Date and time' placement='right'   >
                                            <Typography sx={{ fontSize: 11, textAlign: 'center', fontWeight: 600, color: "black", mr: .3, cursor: 'grab' }}>
                                                {val.compalint_date}
                                            </Typography>
                                        </Tooltip>
                                        <Box sx={{ flex: 1, display: 'flex', my: 1, justifyContent: 'center', }}>
                                            {val.cm_file_status === 1 ?
                                                <FilePresentRoundedIcon sx={{
                                                    color: '#41729F',
                                                    cursor: 'pointer',
                                                    height: 28, width: 30,
                                                    border: 1, borderRadius: 5, p: .1,
                                                    '&:hover': { color: '#274472' }
                                                }}
                                                    onClick={() => fileView(val)}
                                                /> :
                                                null}
                                            <Tooltip title='Rectify' color='success'>
                                                <VerifiedSharpIcon sx={{
                                                    height: 28, width: 30, color: '#1D741B', cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                    '&:hover': { color: '#18A558' },
                                                }}
                                                    onClick={() => RectifyRequest(val)}


                                                />
                                            </Tooltip>
                                            <Tooltip title='Need Assist' color='warning' >
                                                <BuildRoundedIcon sx={{
                                                    height: 28, width: 30, color: '#B68D40 ', cursor: 'pointer', border: 1, borderRadius: 5, p: .3,
                                                    '&:hover': { color: '#D6AD60' },
                                                }}
                                                    onClick={() => AssistanceRequest(val)} />
                                            </Tooltip>
                                            <Tooltip title='On Hold Reason'  >
                                                <ArticleIcon sx={{
                                                    height: 28, width: 30, color: '#50655B ', cursor: 'pointer', border: 1, borderRadius: 5, p: .3, ml: .5,
                                                    '&:hover': { color: 'grey' },
                                                }}

                                                    onClick={() => HoldReason(val)} />
                                            </Tooltip>
                                            {val.cm_query_status === 1 ?
                                                <Tooltip title='Raised Query' >
                                                    <InsertCommentIcon sx={{
                                                        height: 28, width: 30,
                                                        color: '#1565B1',
                                                        cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                        '&:hover': { color: '#51575C' },
                                                        animation: `${blinkAnimation} 1s infinite`
                                                    }
                                                    }
                                                        onClick={() => RaiseQuery(val)}
                                                    />
                                                </Tooltip> :
                                                val.cm_query_status === 2 ?
                                                    <Tooltip title='New Replies' >
                                                        <MarkUnreadChatAltIcon sx={{
                                                            height: 28, width: 30,
                                                            color: '#39918C',
                                                            cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                            '&:hover': { color: '#51575C' },
                                                            animation: `${blinkAnimation} 1s infinite`
                                                        }
                                                        }
                                                            onClick={() => RaiseQuery(val)}
                                                        />
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title='Raise a Query' color='primary'>
                                                        <ContactSupportIcon sx={{
                                                            height: 28, width: 30,
                                                            color: '#5C90FE',
                                                            cursor: 'pointer', border: 1, mx: .5, borderRadius: 5,
                                                            '&:hover': { color: '#1B84FC' },
                                                        }
                                                        }
                                                            onClick={() => RaiseQuery(val)}
                                                        />
                                                    </Tooltip>}

                                            {assetArray[val.complaint_slno]?.length !== 0 ?
                                                <Tooltip title='Asset Details' sx={{ bgcolor: '#524199' }} >
                                                    <InventoryIcon sx={{
                                                        height: 28, width: 30, border: 1, borderRadius: 5, mr: .5,
                                                        p: .1, color: '#524199', cursor: 'pointer'

                                                    }} onClick={() => AssetView(val)} />
                                                </Tooltip>
                                                :
                                                null}
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        pl: .5,
                                        maxWidth: 500,
                                    }}>
                                        <Box sx={{
                                            display: 'flex', mt: .5
                                        }}>
                                            <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                                                Department Section
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, flex: 1, textTransform: 'capitalize' }}>
                                                {val.location.charAt(0).toUpperCase() + val.location.slice(1).toLowerCase()}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex', mt: .5
                                        }}>
                                            <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                                                Location
                                            </Typography>
                                            <Typography sx={{ fontSize: 13, flex: 1, }}>
                                                {val.rm_room_name}
                                                {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                    ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name && val.rm_floor_name) ? ' - ' : ''}${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                    : "Not Updated"}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex', mt: .5
                                        }}>
                                            <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                                                Complaint Type
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, flex: 1, }}>
                                                {val.complaint_type_name.charAt(0).toUpperCase() + val.complaint_type_name.slice(1).toLowerCase()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, pl: 1.5, }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                                            Complaint Describtion
                                        </Typography>
                                        <Typography sx={{
                                            pr: .5, pt: .3, fontSize: 14,
                                            maxHeight: 50,
                                            overflow: 'auto'
                                        }}>
                                            {val.complaint_desc || 'Not Updated'}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    flex: 1, bgcolor: '#E5E8E9', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, mb: .1,
                                    mx: .1, display: 'flex',
                                }}>
                                    <CssVarsProvider>
                                        <Tooltip title='CountUp time Starts from Ticket Registration' color='warning' variant="soft" sx={{ width: 180 }}>
                                            <Box sx={{ textAlign: 'center', display: 'flex', cursor: 'grab', ml: .8, mr: .5, width: 115 }}>
                                                <CountDownCm complaintDate={val.compalint_date} />
                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                    <CssVarsProvider>
                                        <Tooltip title='Ticket Assinged Date and time' placement='right'   >
                                            <Box sx={{ display: 'flex' }}>
                                                <QueryBuilderRoundedIcon sx={{ color: 'black', borderRadius: 1, pt: .7 }} />
                                                <Typography sx={{ fontSize: 12, textAlign: 'center', fontWeight: 600, color: "black", mr: .3, mt: .6, cursor: 'grab' }}>
                                                    {val.assigned_date}
                                                </Typography>
                                            </Box>
                                        </Tooltip>
                                    </CssVarsProvider>
                                    {val.priority_check === 1 ?
                                        <Box sx={{ display: 'flex', pl: 1.3 }}>

                                            <ErrorIcon
                                                sx={{
                                                    height: 30,
                                                    width: 25,
                                                    color: val.priority_check === 1 ? '#970C10' : 'lightgrey',
                                                    animation: val.priority_check === 1 ? `${blinkAnimation} 1s infinite` : 'none',
                                                }}
                                            />

                                            <Typography sx={{ fontWeight: 600, pl: .5, fontSize: 14, pt: .5, color: 'darkred' }}>
                                                {val.priority_reason}
                                            </Typography>

                                        </Box> : null}
                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: 700, pt: .3 }}>Assingees :</Typography>&nbsp;&nbsp;
                                        <Box sx={{ fontWeight: 600, display: 'flex', py: .4, gap: .3 }}>
                                            {assignedEmployees[val.complaint_slno]?.map((emp, index) => (
                                                <Chip
                                                    key={index}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: .8 }}>
                                                    {emp.em_name}
                                                </Chip>
                                            ))}
                                        </Box>&nbsp;&nbsp;
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box> :
                <Box sx={{ flex: 1, height: '90%', m: 1, textAlign: 'center', fontWeight: 700, fontSize: 22, color: 'lightgray', pt: 10 }}>
                    Hold List Empty
                </Box>}

        </Box >
    )
}

export default memo(MyHoldList)