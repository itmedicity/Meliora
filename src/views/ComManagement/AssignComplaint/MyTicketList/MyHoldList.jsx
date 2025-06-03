import { Badge, Box, Chip, CircularProgress, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
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
import CountDownCm from '../../CountDownCM/CountDownCm';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import ComFileView from '../../CmFileView/ComFileView';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { warningNotify } from 'src/views/Common/CommonCode';
import ViewAssetDetails from '../../ComplaintRegister/TicketLists/ViewAssetDetails';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import TextComponent from 'src/views/Components/TextComponent';
import { format } from 'date-fns';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const MyHoldList = () => {

    const [allPendingCompl, setAllPendingCompl] = useState([])
    const [count, setCount] = useState(0)
    const [assistNeed, setAssistNeed] = useState([])
    const [rectfyDta, setRectfyDta] = useState([])
    const [valuee, setValuee] = useState([])
    const [holdData, setHoldData] = useState([])
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(true);


    const [openStates, setOpenStates] = useState({
        assistOpen: true,
        rectfyOpen: true,
        queryOpen: false,
        holdOpen: false,
        assetOpen: false,
    });

    const [flags, setFlags] = useState({
        assetFlag: 0,
        assistNeedFlag: 0,
        rectfyFlag: 0,
        queryFlag: 0,
        holdFlag: 0,
    });

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const searchData = useMemo(() => {
        return {
            assigned_emp: id
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getAllPendingHoldCompalints = async () => {
            // Start loading
            setLoading(true);
            try {
                const result = await axioslogin.post('/Rectifycomplit/getEmplHoldList', searchData, { signal });
                const { success, data } = result.data;

                if (success === 2) {
                    setAllPendingCompl(data);
                } else {
                    setAllPendingCompl([]);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setAllPendingCompl([]);
                }
            } finally {
                // Stop loading
                setLoading(false);
            }
        };
        getAllPendingHoldCompalints();
        return () => {
            controller.abort();
        };
    }, [searchData, count]);


    const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;


    const RaiseQuery = useCallback((value) => {
        setFlags((prevFlags) => ({
            ...prevFlags,
            queryFlag: 1,
        }));
        setValuee(value);
        setOpenStates((prevState) => ({
            ...prevState,
            queryOpen: true,
        }));
    }, [setFlags, setValuee, setOpenStates]);

    const AssistanceRequest = useCallback((val) => {
        setAssistNeed(val);
        setFlags((prevFlags) => ({
            ...prevFlags,
            assistNeedFlag: 1,
        }));
        setOpenStates((prevState) => ({
            ...prevState,
            assistOpen: true,
        }));
    }, [setAssistNeed, setFlags, setOpenStates]);

    const RectifyRequest = useCallback((val) => {
        setRectfyDta(val);
        setFlags((prevFlags) => ({
            ...prevFlags,
            rectfyFlag: 1,
        }));
        setOpenStates((prevState) => ({
            ...prevState,
            rectfyOpen: true,
        }));
    }, [setRectfyDta, setFlags, setOpenStates]);

    const HoldReason = useCallback((val) => {
        setHoldData(val);
        setFlags((prevFlags) => ({
            ...prevFlags,
            holdFlag: 1,
        }));
        setOpenStates((prevState) => ({
            ...prevState,
            holdOpen: true,
        }));
    }, [setHoldData, setFlags, setOpenStates]);

    const AssetView = useCallback((value) => {
        setValuee(value);
        setFlags((prevFlags) => ({
            ...prevFlags,
            assetFlag: 1,
        }));
        setOpenStates((prevState) => ({
            ...prevState,
            assetOpen: true,
        }));
    }, [setValuee, setFlags, setOpenStates]);

    const fileView = async (val) => {
        const { complaint_slno } = val;
        setimage(1);
        setOpenStates((prevState) => ({
            ...prevState,
            imageViewOpen: true,
        }));
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
                setImageUrls(fileUrls)
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
    };


    return (
        <Box sx={{
            bgcolor: 'white',
            borderRadius: 0
            , height: '69vh',
            overflow: 'auto'
        }}>
            {flags.queryFlag === 1 ? (
                <CmQuieryModal
                    open={openStates.queryOpen}
                    setqueryOpen={(value) =>
                        setOpenStates((prevState) => ({ ...prevState, queryOpen: value }))
                    }
                    valuee={valuee}
                    setqueryflag={(value) =>
                        setFlags((prevFlags) => ({ ...prevFlags, queryFlag: value }))}
                    setCount={setCount}
                    count={count}
                />
            ) : null}

            {image === 1 ?
                <ComFileView
                    imageUrls={imageUrls}
                    imageViewOpen={openStates.imageViewOpen}
                    selectedImages={selectedImages}
                    fileDetails={fileDetails}
                    setimage={setimage}
                    setimageViewOpen={(value) => setOpenStates(prevState => ({ ...prevState, imageViewOpen: value }))}  // Use setOpenStates to modify imageViewOpen
                /> : null}

            {flags.assetFlag === 1 ? (
                <ViewAssetDetails
                    assetOpen={openStates.assetOpen}
                    setAssetOpen={(value) =>
                        setOpenStates((prevState) => ({ ...prevState, assetOpen: value }))
                    }
                    setAssetflag={(value) =>
                        setFlags((prevFlags) => ({ ...prevFlags, assetFlag: value }))
                    }
                    valuee={valuee}
                    count={count}
                    setCount={setCount}
                />
            ) : null}

            {flags.assistNeedFlag === 1 ? (
                <AssistneedModal
                    assistOpen={openStates.assistOpen}
                    assistNeedFlag={flags.assistNeedFlag}
                    assistNeed={assistNeed}
                    setassistNeedFlag={(value) =>
                        setFlags((prevFlags) => ({ ...prevFlags, assistNeedFlag: value }))
                    }
                    setAssistOpen={(value) =>
                        setOpenStates((prevState) => ({ ...prevState, assistOpen: value }))
                    }
                    count={count}
                    setCount={setCount}
                />
            ) : null}

            {flags.rectfyFlag === 1 ? (
                <NewRectifyModal
                    rectfyOpen={openStates.rectfyOpen}
                    setrectfyOpen={(value) =>
                        setOpenStates((prevState) => ({ ...prevState, rectfyOpen: value }))
                    }
                    setrectfyFlag={(value) =>
                        setFlags((prevFlags) => ({ ...prevFlags, rectfyFlag: value }))
                    }
                    rectfyDta={rectfyDta}
                    count={count}
                    setCount={setCount}
                />
            ) : null}

            {flags.holdFlag === 1 ? (
                <HoldReasonModal
                    holdOpen={openStates.holdOpen}
                    setHoldOpen={(value) =>
                        setOpenStates((prevState) => ({ ...prevState, holdOpen: value }))
                    }
                    setHoldflag={(value) =>
                        setFlags((prevFlags) => ({ ...prevFlags, holdFlag: value }))
                    }
                    holdData={holdData}
                    count={count}
                    setCount={setCount}
                />
            ) : null}


            {loading ? (
                <div style={{ display: 'flex', height: '100%', pl: .5 }}>
                    <CircularProgress
                        color="neutral"
                        sx={{
                            "--CircularProgress-size": "51px",
                            "--CircularProgress-trackThickness": "5px",
                            "--CircularProgress-progressThickness": "2px"
                        }}
                    />
                </div>
            ) : (
                <>

                    {allPendingCompl.length !== 0 ?
                        <Box sx={{ p: .5, mb: .8 }}>
                            {allPendingCompl?.map((val, index) => {
                                const getBadgeColor = (pending, accepted, rejected) => {
                                    if (pending > 0) return '#0458AB'
                                    if (pending === 0 && accepted > 0) return 'green'
                                    if (pending === 0 && accepted === 0 && rejected > 0) return 'red'
                                    return null
                                };

                                const badgeColor = getBadgeColor(val.pending, val.accepted, val.rejected);
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
                                        <Box sx={{
                                            flex: 1, bgcolor: '#E5E8E9', borderTopRightRadius: 6, borderTopLeftRadius: 6,
                                            mx: .1, display: 'flex',
                                        }}>

                                            <CssVarsProvider>
                                                <Tooltip title='Ticket Registered Date and time' placement='top-start' >
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <TextComponent
                                                            sx={{
                                                                color: 'black',
                                                                fontWeight: 540,
                                                                flex: 1,
                                                                fontSize: 15,
                                                                pl: 1,
                                                                py: .5,
                                                                fontFamily: 'Arial',
                                                            }}
                                                            text={
                                                                val.compalint_date
                                                                    ? format(new Date(val.compalint_date), 'dd MMM yyyy,   hh:mm a')
                                                                    : 'Not Updated'
                                                            }
                                                        />
                                                    </Box>
                                                </Tooltip>
                                            </CssVarsProvider>
                                            <CssVarsProvider>
                                                <Tooltip title='Ticket Assigned Date and time' placement='top-start' >
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <TextComponent
                                                            sx={{
                                                                color: 'black',
                                                                fontWeight: 540,
                                                                flex: 1,
                                                                fontSize: 15,
                                                                pl: 2,
                                                                py: .5,
                                                                fontFamily: 'Arial',
                                                            }}
                                                            text={
                                                                val.assigned_date
                                                                    ? format(new Date(val.assigned_date), 'dd MMM yyyy,   hh:mm a')
                                                                    : 'Not Updated'
                                                            }
                                                        />
                                                    </Box>
                                                </Tooltip>
                                            </CssVarsProvider>
                                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', }}>
                                                <Box sx={{ my: .3, mr: .1, px: 2, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>
                                                    Ticket Registered by :  {val.comp_reg_emp}
                                                </Box>
                                            </Box>
                                        </Box>
                                        {val.aprrox_date !== null ?
                                            <Box sx={{
                                                flex: 1, bgcolor: '#E7D2CC',
                                                display: 'flex', py: .3,
                                            }}>
                                                <Typography sx={{ color: '#026F7E', pl: 1, pt: .2, fontWeight: 700, fontSize: 13 }}>
                                                    DELEGATED BY {val.assinged_user}
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
                                                    {val.aprrox_date
                                                        ? format(new Date(val.aprrox_date), 'dd MM yyyy,  hh:mm a')
                                                        : 'Not Updated'}
                                                </Chip>
                                                <Typography sx={{ color: 'black', pt: .2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                                                    Remarks :
                                                </Typography>
                                                <Typography sx={{ color: 'black', pt: .2, fontSize: 13, ml: 3 }}>
                                                    {val.complaint_remark}
                                                </Typography>
                                            </Box> : null}
                                        {val.cm_rectify_status === 'Z' && val.verify_remarks !== null ?
                                            <Box sx={{
                                                flex: 1, bgcolor: "#DFDACD",
                                                display: 'flex', py: .3, flexWrap: 'wrap'
                                            }}>
                                                <Box sx={{ display: 'flex', pl: .5, }}>
                                                    <ReportProblemIcon sx={{ color: 'darkred', P: .1 }} />
                                                    <Box sx={{ pt: .3, color: 'darkred', fontWeight: 700, fontSize: 14, }}>
                                                        TICKET RESUBMITTED
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', }}>
                                                    <Box sx={{ pl: 2, fontWeight: 600, color: 'darkred' }}>
                                                        Remarks:
                                                    </Box>
                                                    <Box sx={{ pl: 1, fontWeight: 600, color: 'darkred' }}>
                                                        {val.verify_remarks}
                                                    </Box>
                                                </Box>
                                            </Box> : null}

                                        {val.verify_spervsr_remarks !== null && val.verify_spervsr === 2 ?
                                            <Box sx={{
                                                flex: 1, bgcolor: "#DFDACD      ",
                                                display: 'flex', py: .3, flexWrap: 'wrap'
                                            }}>
                                                <Box sx={{ display: 'flex', pl: .5, }}>
                                                    <ReportProblemIcon sx={{ color: 'darkred', P: .1 }} />
                                                    <Box sx={{ pt: .3, color: 'darkred', fontWeight: 700, fontSize: 14, }}>
                                                        RESUBMITTED BY SUPERVISOR
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', }}>
                                                    <Box sx={{ pl: 2, fontWeight: 600, color: 'darkred' }}>
                                                        Remarks:
                                                    </Box>
                                                    <Box sx={{ pl: 1, fontWeight: 600, color: 'darkred' }}>
                                                        {val.verify_spervsr_remarks}
                                                    </Box>
                                                </Box>
                                            </Box> : null}
                                        <Box sx={{ flex: 1, display: 'flex', p: .8, }}>
                                            <Box sx={{
                                                maxWidth: 210,
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

                                                    <Tooltip title='Rectify' color='success'>
                                                        <VerifiedSharpIcon sx={{
                                                            height: 28, width: 30, color: '#1D741B', cursor: 'pointer', border: 1, mr: .5, borderRadius: 5, p: .1,
                                                            '&:hover': { color: '#18A558' },
                                                        }}
                                                            onClick={() => RectifyRequest(val)}


                                                        />
                                                    </Tooltip>
                                                    {badgeColor ? (
                                                        <Badge
                                                            badgeInset="3%"
                                                            sx={{
                                                                '& .MuiBadge-badge': {
                                                                    backgroundColor: badgeColor,
                                                                    mr: .7,
                                                                    cursor: 'pointer'
                                                                },
                                                            }}
                                                        >
                                                            <Tooltip title="Need Assist" color="warning">
                                                                <BuildRoundedIcon
                                                                    onClick={() => AssistanceRequest(val)}
                                                                    sx={{
                                                                        height: 28,
                                                                        width: 30,
                                                                        color: '#B68D40',
                                                                        cursor: 'pointer',
                                                                        border: 1,
                                                                        borderRadius: 5,
                                                                        p: 0.3, mr: .5,
                                                                        '&:hover': { color: '#D6AD60' },
                                                                        animation: val.assist_flag === 1 ? `${blinkAnimation} 1s infinite` : 'none',
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </Badge>
                                                    ) : (
                                                        <Tooltip title="Need Assist" color="warning">
                                                            <BuildRoundedIcon
                                                                onClick={() => AssistanceRequest(val)}
                                                                sx={{
                                                                    height: 28,
                                                                    width: 30,
                                                                    color: '#B68D40',
                                                                    cursor: 'pointer',
                                                                    border: 1,
                                                                    borderRadius: 5,
                                                                    p: 0.3, mr: .5,
                                                                    '&:hover': { color: '#D6AD60' },
                                                                    animation: val.assist_flag === 1 ? `${blinkAnimation} 1s infinite` : 'none',
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                    <Tooltip title='On Hold Reason'  >
                                                        <ArticleIcon sx={{
                                                            height: 28, width: 30, color: '#50655B ', cursor: 'pointer', border: 1, borderRadius: 5, p: .3, mr: .5,
                                                            '&:hover': { color: 'grey' },
                                                        }}

                                                            onClick={() => HoldReason(val)} />
                                                    </Tooltip>
                                                    {val.cm_query_status === 1 ?
                                                        <Tooltip title='Raised Query' >
                                                            <InsertCommentIcon sx={{
                                                                height: 28, width: 30,
                                                                color: '#1565B1',
                                                                cursor: 'pointer', border: 1, mr: .5, borderRadius: 5, p: .1,
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
                                                                    cursor: 'pointer', border: 1, mr: .5, borderRadius: 5, p: .1,
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
                                                                    height: 28, width: 30, mr: .5,
                                                                    color: '#5C90FE',
                                                                    cursor: 'pointer', border: 1, borderRadius: 5,
                                                                    '&:hover': { color: '#1B84FC' },
                                                                }
                                                                }
                                                                    onClick={() => RaiseQuery(val)}
                                                                />
                                                            </Tooltip>}
                                                    {val.cm_file_status === 1 ?
                                                        <FilePresentRoundedIcon sx={{
                                                            color: '#41729F',
                                                            cursor: 'pointer',
                                                            height: 28, width: 30,
                                                            border: 1, borderRadius: 5, p: .1, mr: .5,
                                                            '&:hover': { color: '#274472' }
                                                        }}
                                                            onClick={() => fileView(val)}
                                                        /> :
                                                        null}
                                                    {val.cm_asset_status === 1 ?
                                                        <Tooltip title='Asset Details' sx={{ bgcolor: '#4C5270' }} >
                                                            <MiscellaneousServicesIcon sx={{
                                                                height: 28, width: 30, border: 1, borderRadius: 5, mr: .5,
                                                                p: .1, color: '#4C5270', cursor: 'pointer'

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
                                                        {(val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name) ? (
                                                            ` (${val.rm_roomtype_name || ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name || ''}${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''}${val.rm_floor_name || ''})`
                                                        ) : (
                                                            val.cm_complaint_location || "Not Updated"
                                                        )}
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
                                            display: 'flex',
                                        }}>
                                            <CssVarsProvider>
                                                <Tooltip title='CountUp time Starts from Ticket Registration' color='neutral' placement='right' sx={{ width: 300 }}>
                                                    <Box sx={{ display: 'flex', cursor: 'grab', fontSize: 13, width: 125 }}>
                                                        <CountDownCm complaintDate={val.compalint_date} />
                                                    </Box>
                                                </Tooltip>
                                            </CssVarsProvider>

                                            {val.priority_check === 1 ?
                                                <Box sx={{ display: 'flex', pl: 1 }}>
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
                                                <Typography sx={{ fontSize: 13, fontWeight: 700, pt: .5 }}>Assignees :</Typography>&nbsp;&nbsp;
                                                <Box sx={{ fontWeight: 600, display: 'flex', py: .4, gap: .3 }}>

                                                    {val.assigned_employees === null ?
                                                        <Chip>
                                                            Not Updated
                                                        </Chip>
                                                        :
                                                        <>
                                                            {val.assigned_employees.split(',').map((name, index) => (
                                                                <Chip
                                                                    key={index}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: 0.8, marginRight: 0.1 }}
                                                                >
                                                                    {name.trim()}
                                                                </Chip>
                                                            ))}
                                                        </>}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box> :
                        <Box sx={{
                            flex: 1, height: '70%', margin: "auto", fontWeight: 700, fontSize: 22, color: 'lightgray', pt: 10,
                            display: 'flex', justifyContent: 'center'
                        }}>
                            Hold List Empty
                        </Box>}
                </>)}

        </Box >
    )
}

export default memo(MyHoldList)