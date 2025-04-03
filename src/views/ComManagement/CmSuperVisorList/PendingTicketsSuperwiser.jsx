import { Box, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AssignmentTurnedInSharpIcon from '@mui/icons-material/AssignmentTurnedInSharp';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { Virtuoso } from 'react-virtuoso';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import ErrorIcon from '@mui/icons-material/Error';
import { keyframes } from '@mui/system';
import { format } from 'date-fns';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import CountDownCm from '../CountDownCM/CountDownCm';
import TransferDeptmodal from '../AssignComplaint/TransferDeptmodal';
import CmQuieryModal from '../AssignComplaint/Queries/CmQuieryModal';
import AccessibilityNewSharpIcon from '@mui/icons-material/AccessibilityNewSharp';
import DetailAssingModal from './DetailAssingModal';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import ComFileView from '../CmFileView/ComFileView';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ViewAssetDetails from '../ComplaintRegister/TicketLists/ViewAssetDetails';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import TextComponent from 'src/views/Components/TextComponent';

const PendingTicketsSuperwiser = ({ allPendingCompl, count, setCount }) => {

    const [transmodal, setTransmodal] = useState(0);
    const [open, setOpen] = useState(false)
    const [transfer, setTransfer] = useState([])
    const [queryflag, setqueryflag] = useState(0)
    const [queryOpen, setqueryOpen] = useState(false)
    const [valuee, setValuee] = useState([])
    const [detailAssingOpen, setdetailAssingOpen] = useState(false)
    const [detailAssingFlag, setdetailAssingFlag] = useState(0)
    const [detailAssingData, setdetailAssingData] = useState([])
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [assetflag, setAssetflag] = useState(0)
    const [assetOpen, setAssetOpen] = useState(false)
    const id = useSelector((state) => state?.LoginUserData?.empid)

    const AssetView = useCallback((value) => {
        setValuee(value)
        setAssetflag(1)
        setAssetOpen(true)
    }, [setAssetflag, setAssetOpen])

    const quickAssign = useCallback((val) => {
        const { complaint_slno } = val
        const postData = {
            complaint_slno: complaint_slno,
            assigned_emp: id,
            assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            assign_rect_status: 0,
            assigned_user: id,
            assign_status: 1
        }
        const getData = async (postData) => {
            const result = await axioslogin.post('/complaintassign', postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        getData(postData);
    }, [count, setCount, id])

    const TransferDepartment = useCallback((val) => {
        setTransmodal(1);
        setOpen(true)
        setTransfer(val)
    }, [])

    const RaiseQuery = useCallback((value) => {
        setqueryflag(1)
        setValuee(value)
        setqueryOpen(true)
    }, [])

    const DetailAssing = useCallback((value) => {
        setdetailAssingFlag(1)
        setdetailAssingData(value)
        setdetailAssingOpen(true)
    }, [])

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



    const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: .2; }
    100% { opacity: 1; }
`;
    return (
        <Box sx={{
            flex: 1, bgcolor: '#E2E6F0', p: .3, mt: .5
        }}>
            {allPendingCompl.length === 0 ?
                <Box sx={{
                    flex: 1,
                    fontWeight: 700,
                    fontSize: 25,
                    pt: 35,
                    textAlign: 'center',
                    color: 'lightgray',
                    bgcolor: 'white',
                    height: '80vh'
                }}>
                    Empty Pending tickets
                </Box> :
                <Box sx={{
                    flex: 1, bgcolor: 'white', mt: .1, px: .5, pt: .8, pb: 1.5
                }}>
                    {
                        transmodal === 1 ? <TransferDeptmodal open={open} setOpen={setOpen} transfer={transfer}
                            count={count} setCount={setCount} setTransmodal={setTransmodal} /> : null
                    }
                    {queryflag === 1 ?
                        <CmQuieryModal open={queryOpen} setqueryOpen={setqueryOpen} valuee={valuee}
                            setqueryflag={setqueryflag}
                            setCount={setCount} count={count}
                        />
                        : null}
                    {detailAssingFlag === 1 ?
                        <DetailAssingModal open={detailAssingOpen} setdetailAssingOpen={setdetailAssingOpen} detailAssingData={detailAssingData}
                            setdetailAssingFlag={setdetailAssingFlag}
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

                    <Virtuoso
                        style={{ height: '74vh' }}
                        totalCount={allPendingCompl?.length}
                        itemContent={(index) => {
                            const val = allPendingCompl[index];
                            return (
                                <Box
                                    key={val.complaint_slno}
                                    sx={{
                                        // flex: 1,
                                        border: 1, borderColor: '#9F2B00',
                                        borderRadius: 8,
                                        bgcolor: 'white',
                                        mb: .5
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
                                                                : 'Invalid Date'
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
                                    <Box sx={{
                                        display: 'flex', p: .8,
                                    }}>
                                        <Box sx={{
                                            maxWidth: 220,
                                            mx: .3, pr: .5,
                                            borderRight: 1, borderColor: 'lightgrey'
                                        }}>
                                            <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}> Ticket No.</Typography>
                                            <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}>{val.complaint_slno}</Typography>
                                            <Box sx={{ flex: 1, display: 'flex', mt: 1, }}>
                                                <Tooltip title='Quick Assign' sx={{ bgcolor: '#085090' }}>
                                                    <AssignmentTurnedInSharpIcon sx={{
                                                        height: 28, width: 30, color: '#085090', cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                        '&:hover': { color: '#093B8C' },
                                                    }}
                                                        onClick={() => quickAssign(val)}
                                                    />
                                                </Tooltip>
                                                <Tooltip title='Department Transfer' color='warning'>
                                                    <RepeatOnIcon sx={{
                                                        height: 28, width: 30, color: '#8C5E39', cursor: 'pointer', border: 1, borderRadius: 5, p: .3,
                                                        '&:hover': { color: '#6E412A' },
                                                    }}
                                                        onClick={() => TransferDepartment(val)}
                                                    />
                                                </Tooltip>
                                                <Tooltip title='Direct Assing' sx={{ bgcolor: "#CBAE77", color: 'black' }}  >
                                                    <AccessibilityNewSharpIcon sx={{
                                                        height: 28, width: 30, color: '#CBAE77', cursor: 'pointer', border: 1, borderRadius: 5, p: .3, ml: .5,
                                                        '&:hover': { color: '#CBAE77' },
                                                    }}
                                                        onClick={() => DetailAssing(val)}
                                                    />
                                                </Tooltip>

                                                {val.cm_query_status === 1 ?
                                                    <Tooltip title='Raised Query' sx={{ bgcolor: '#2D7390' }} >
                                                        <InsertCommentIcon sx={{
                                                            height: 28, width: 30,
                                                            color: '#2D7390',
                                                            cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                            '&:hover': { color: '#51575C' },
                                                            animation: `${blinkAnimation} 1s infinite`
                                                        }
                                                        }
                                                            onClick={() => RaiseQuery(val)}
                                                        />
                                                    </Tooltip> :
                                                    val.cm_query_status === 2 ?
                                                        <Tooltip title='New Replies' sx={{ bgcolor: '#39918C' }} >
                                                            <MarkUnreadChatAltIcon sx={{
                                                                height: 28, width: 30,
                                                                color: '#39918C',
                                                                cursor: 'pointer', border: 1, mx: .5, borderRadius: 5, p: .1,
                                                                '&:hover': { color: '#51575C' },
                                                                animation: `${blinkAnimation} 1s infinite`
                                                            }}
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
                                                {val.cm_file_status === 1 ?
                                                    <Tooltip title='File attached' sx={{ bgcolor: '#41729F' }}>
                                                        <FilePresentRoundedIcon sx={{
                                                            color: '#41729F',
                                                            cursor: 'pointer',
                                                            height: 28, width: 30,
                                                            border: 1, borderRadius: 5, p: .1, mr: .5,
                                                            '&:hover': { color: '#274472' }
                                                        }}
                                                            onClick={() => fileView(val)}
                                                        /></Tooltip> : null}
                                                {val.cm_asset_status === 1 ?
                                                    <Tooltip title='Asset Details' sx={{ bgcolor: '#4C5270' }} >
                                                        <MiscellaneousServicesIcon sx={{
                                                            height: 28, width: 30, border: 1, borderRadius: 5,
                                                            p: .1, color: '#4C5270', cursor: 'pointer'

                                                        }} onClick={() => AssetView(val)} />
                                                    </Tooltip>
                                                    :
                                                    null
                                                }
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
                                                // flex: 1,
                                                display: 'flex', mt: .5
                                            }}>
                                                <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                                                    Location
                                                </Typography>
                                                <Typography sx={{ fontSize: 13, flex: 1, }}>
                                                    {/* {val.rm_room_name}
                                                    {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                        ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name && val.rm_floor_name) ? ' - ' : ''}${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                        : "Not Updated"} */}
                                                    {val.rm_room_name}
                                                    {(val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name) ? (
                                                        ` (${val.rm_roomtype_name || ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name || ''}${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''}${val.rm_floor_name || ''})`
                                                    ) : (
                                                        val.cm_complaint_location || "Not Updated"
                                                    )}
                                                </Typography>
                                            </Box>
                                            <Box sx={{
                                                // flex: 1,
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
                                                pr: .5, pt: .3, fontSize: 15,
                                                maxHeight: 50,
                                                overflow: 'auto'
                                            }}>
                                                {val.complaint_desc || 'Not Updated'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    < Box sx={{
                                        flex: 1, bgcolor: '#E5E8E9', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, mb: .1,
                                        mx: .1, display: 'flex',
                                    }}>
                                        <Box>
                                            <CssVarsProvider>
                                                <Tooltip title='CountUp time Starts from Ticket Registration' color='neutral' placement='right' sx={{ width: 300 }}>
                                                    <Box sx={{ display: 'flex', cursor: 'grab', fontSize: 13, py: .3, pl: .3, width: 125 }}>
                                                        <CountDownCm complaintDate={val.compalint_date} />
                                                    </Box>
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box sx={{ pl: 1 }}>
                                            {val.priority_check === 1 ?
                                                <Box sx={{ display: 'flex' }}>
                                                    <ErrorIcon
                                                        sx={{
                                                            height: 30,
                                                            width: 25,
                                                            color: val.priority_check === 1 ? '#970C10' : 'lightgrey',
                                                            animation: val.priority_check === 1 ? `${blinkAnimation} 1s infinite` : 'none',
                                                        }}
                                                    />
                                                    <Typography sx={{ fontWeight: 600, pl: .2, fontSize: 14, pt: .5, color: 'darkred' }}>
                                                        {val.priority_reason}
                                                    </Typography>
                                                </Box>
                                                : null}
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }} />
                </Box >}
        </Box>
    )
}

export default memo(PendingTicketsSuperwiser)