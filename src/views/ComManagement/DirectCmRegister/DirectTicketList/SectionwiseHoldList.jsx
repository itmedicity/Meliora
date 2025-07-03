import CmReplyModal from '../../AssignComplaint/Queries/CmReplyModal';
import { Box, CircularProgress, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { Virtuoso } from 'react-virtuoso';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import CommentIcon from '@mui/icons-material/Comment';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { axioslogin } from 'src/views/Axios/Axios';
import { keyframes } from '@emotion/react';
import ViewAssetDetails from '../../ComplaintRegister/TicketLists/ViewAssetDetails';
import { warningNotify } from 'src/views/Common/CommonCode';
import HoldDetails from '../../ComplaintRegister/TicketLists/HoldDetails';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ComFileView from '../../CmFileView/ComFileView';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { format } from 'date-fns';

const SectionwiseHoldList = ({ count, setCount, onholdCompl, loading }) => {


    const [replyflag, setReplyflag] = useState(0)
    const [replyOpen, setReplyOpen] = useState(false)
    const [valuee, setValuee] = useState([])
    const [holdFlag, setholdFlag] = useState(0)
    const [holdOpen, setholdOpen] = useState(false)
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [holdDetails, setholdDetails] = useState([])
    const [assetflag, setAssetflag] = useState(0)
    const [assetOpen, setAssetOpen] = useState(false)


    const HoldDetailsView = useCallback((val) => {
        setholdFlag(1)
        setholdOpen(true)
        setholdDetails(val)
    }, [])

    const ReplyDetails = useCallback((value) => {
        setReplyflag(1)
        setValuee(value)
        setReplyOpen(true)
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

    const AssetView = useCallback((value) => {
        setValuee(value)
        setAssetflag(1)
        setAssetOpen(true)
    }, [setAssetflag, setAssetOpen])

    const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;

    return (<Box>
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            {replyflag === 1 ?
                <CmReplyModal open={replyOpen} setReplyOpen={setReplyOpen} valuee={valuee}
                    setReplyflag={setReplyflag}
                    setCount={setCount} count={count}
                />
                : null}
            {holdFlag === 1 ?
                <HoldDetails open={holdOpen} setholdOpen={setholdOpen}
                    setholdFlag={setholdFlag}
                    setCount={setCount} count={count} holdDetails={holdDetails} />
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
            {loading ? (
                <Box sx={{ my: 3, textAlign: 'center' }}>
                    <CssVarsProvider>
                        <CircularProgress variant='soft' color='neutral' thickness={3} />
                        <Typography>Loading...</Typography>
                    </CssVarsProvider>
                </Box>
            ) : (
                onholdCompl.length !== 0 ?
                    <Box sx={{}}>
                        <Box sx={{
                            height: 40,
                            display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                            bgcolor: 'white'
                        }}>
                            <Box sx={{ width: "6%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Ticket No.</Box>
                            <Box sx={{ width: "10%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Action</Box>
                            <Box sx={{ width: "10%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Complaint Type</Box>
                            <Box sx={{ width: "25%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Describtion</Box>
                            <Box sx={{ width: "8%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Complaint To</Box>
                            <Box sx={{ width: "10%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Complaint From</Box>
                            <Box sx={{ width: "10%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Location</Box>
                            <Box sx={{ width: "10%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Location Details</Box>
                            <Box sx={{ width: "10%", fontWeight: 600, color: '#444444', fontSize: 12, }}>Complaint Date</Box>
                        </Box>
                        <Virtuoso
                            style={{ height: '26vh' }}
                            totalCount={onholdCompl?.length}
                            itemContent={(index) => {
                                const val = onholdCompl[index];
                                return (
                                    <Box key={val.complaint_slno}
                                        sx={{
                                            display: 'flex', mt: .3,
                                            borderBottom: .1,
                                            borderColor: 'lightgrey', minHeight: 35,
                                            pt: .5,
                                        }}
                                    >
                                        <Box sx={{ minWidth: "6%", fontWeight: 600, fontSize: 14 }}>
                                            {val.complaint_slno}
                                        </Box>
                                        <Box sx={{ width: "10%", display: 'flex', gap: .5, textAlign: 'center' }}>

                                            {val.cm_file_status === 1 ?
                                                <CssVarsProvider>
                                                    <Tooltip title='Attached File' placement='top-start' >
                                                        <FilePresentRoundedIcon sx={{
                                                            border: 1,
                                                            borderRadius: 3,
                                                            p: .4,
                                                            width: 28, height: 28,
                                                            color: '#41729F',
                                                            cursor: 'pointer',
                                                            '&:hover': { color: '#274472' }
                                                        }}
                                                            onClick={() => fileView(val)}
                                                        />
                                                    </Tooltip>
                                                </CssVarsProvider>
                                                :
                                                <FilePresentRoundedIcon sx={{
                                                    border: 1,
                                                    borderRadius: 3,
                                                    p: .4,
                                                    width: 28, height: 28,
                                                    color: 'lightgrey',
                                                }}
                                                />}

                                            <Box onClick={() => ReplyDetails(val)} sx={{ cursor: 'pointer' }}>
                                                <CssVarsProvider>
                                                    <Tooltip title='Queries' placement='top-start' >
                                                        {val.cm_query_status === 1 ?
                                                            <MarkUnreadChatAltIcon sx={{
                                                                border: 1,
                                                                borderRadius: 3,
                                                                p: .4,
                                                                width: 28, height: 28, color: '#BF4A32', animation: `${blinkAnimation} 1s infinite`
                                                            }} /> :
                                                            val.cm_query_status === 2 ?
                                                                <CommentIcon sx={{
                                                                    border: 1,
                                                                    borderRadius: 3,
                                                                    p: .4,
                                                                    width: 28, height: 28, color: '#2B82BF', animation: `${blinkAnimation} 1s infinite`,
                                                                }} /> :
                                                                <TextsmsIcon sx={{
                                                                    border: 1,
                                                                    borderRadius: 3,
                                                                    p: .4,
                                                                    width: 28, height: 28, color: '#647C90'
                                                                }} />
                                                        }
                                                    </Tooltip>
                                                </CssVarsProvider>
                                            </Box>
                                            <CssVarsProvider>
                                                <Tooltip title='Hold  Reason' placement='top-start' >
                                                    <ArticleRoundedIcon sx={{
                                                        border: 1,
                                                        borderRadius: 3,
                                                        p: .4,
                                                        width: 28, height: 28, color: '#50655B', cursor: 'pointer'
                                                    }} onClick={() => HoldDetailsView(val)} />
                                                </Tooltip>
                                            </CssVarsProvider>

                                            {val.cm_asset_status === 1 ?
                                                <CssVarsProvider>
                                                    <Tooltip title='Asset Added Under Ticket' placement='top-start' >
                                                        <MiscellaneousServicesIcon sx={{
                                                            border: 1,
                                                            borderRadius: 3,
                                                            p: .4,
                                                            width: 28, height: 28, color: '#4C5270', cursor: 'pointer'
                                                        }} onClick={() => AssetView(val)} />
                                                    </Tooltip>
                                                </CssVarsProvider>
                                                :
                                                <CssVarsProvider>
                                                    <Tooltip title='No Asset Added Under Ticket' placement='top-start' >
                                                        <MiscellaneousServicesIcon sx={{
                                                            border: 1,
                                                            borderRadius: 3,
                                                            p: .4,
                                                            width: 28, height: 28,
                                                            color: 'lightgrey', cursor: 'pointer'

                                                        }} />
                                                    </Tooltip>
                                                </CssVarsProvider>
                                            }
                                        </Box>
                                        <Box sx={{ width: "10%", fontSize: 13, }}>
                                            {val.complaint_type_name}
                                        </Box>
                                        <Box sx={{ width: "25%", fontSize: 14, }}>
                                            {val.complaint_desc}
                                        </Box>
                                        <Box sx={{ width: "8%", fontSize: 13, }}>
                                            {val.complaint_dept_name}
                                        </Box>
                                        <Box sx={{ width: "10%", fontSize: 13, }}>
                                            {val.location}
                                        </Box>
                                        <Box sx={{ width: "10%", fontSize: 13, }}>
                                            {val.rm_room_name}
                                            {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name && val.rm_floor_name) ? ' - ' : ''}${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                : "Not Updated"}
                                        </Box>
                                        <Box sx={{ width: "10%", fontSize: 13, }}>
                                            {val.cm_complaint_location || "Not Updated"}
                                        </Box>
                                        <Box sx={{ width: "10%", fontSize: 13, }}>
                                            {val.compalint_date
                                                ? format(new Date(val.compalint_date), 'dd MMM yyyy,  hh:mm a')
                                                : 'Invalid Date'}
                                        </Box>
                                    </Box>
                                );
                            }}
                        />
                    </Box> :
                    <Box>
                        <Typography sx={{ fontSize: 25, fontWeight: 800, color: 'lightgrey', textAlign: 'center', pt: 5 }}>
                            Empty Hold List
                        </Typography>
                    </Box>)}


        </Box >
    </Box>
    )
}

export default memo(SectionwiseHoldList)