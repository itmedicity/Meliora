import CmReplyModal from '../../AssignComplaint/Queries/CmReplyModal';
import { Box, CssVarsProvider, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso';
import EditIcon from '@mui/icons-material/Edit';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CommentIcon from '@mui/icons-material/Comment';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { axioslogin } from 'src/views/Axios/Axios';
import { keyframes } from '@emotion/react';
import ViewAssetDetails from '../../ComplaintRegister/TicketLists/ViewAssetDetails';
import { warningNotify } from 'src/views/Common/CommonCode';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ComFileView from '../../CmFileView/ComFileView';
import InventoryIcon from '@mui/icons-material/Inventory';

const DirectPendingList = ({ count, setCount, rowSelect, pendingCompl }) => {


    const [replyflag, setReplyflag] = useState(0)
    const [replyOpen, setReplyOpen] = useState(false)
    const [valuee, setValuee] = useState([])
    const [assetArray, setAssetArray] = useState([])
    const [assetflag, setAssetflag] = useState(0)
    const [assetOpen, setAssetOpen] = useState(false)
    const [imageViewOpen, setimageViewOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [fileDetails, setfileDetails] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const ReplyDetails = useCallback((value) => {
        setReplyflag(1)
        setValuee(value)
        setReplyOpen(true)
    }, [])

    // useEffect(() => {
    //     const getAssetinComplaint = async () => {
    //         const AssetedArray = {};
    //         for (let complaint of pendingCompl) {
    //             const result = await axioslogin.get(`complaintreg/getAssetinComplaint/${complaint.complaint_slno}`);
    //             const { success, data } = result.data;
    //             if (success === 2) {
    //                 AssetedArray[complaint.complaint_slno] = data;
    //             } else {
    //                 AssetedArray[complaint.complaint_slno] = [];
    //             }
    //         }
    //         setAssetArray(AssetedArray);
    //     };
    //     getAssetinComplaint();
    // }, [pendingCompl]);

    useEffect(() => {
        let isMounted = true; // Variable to track if the component is mounted
        const getAssetinComplaint = async () => {
            const AssetedArray = {};
            for (let complaint of pendingCompl) {
                const result = await axioslogin.get(`complaintreg/getAssetinComplaint/${complaint.complaint_slno}`);
                const { success, data } = result.data;
                if (isMounted) { // Check if component is still mounted before setting state
                    if (success === 2) {
                        AssetedArray[complaint.complaint_slno] = data;
                    } else {
                        AssetedArray[complaint.complaint_slno] = [];
                    }
                }
            }
            if (isMounted) {
                setAssetArray(AssetedArray);
            }
        };
        getAssetinComplaint();
        return () => {
            isMounted = false; // Cleanup function to mark the component as unmounted
        };
    }, [pendingCompl]);


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

    const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;

    return (
        <Box>
            <Box sx={{ width: '100%', overflow: 'auto' }}>
                {replyflag === 1 ?
                    <CmReplyModal open={replyOpen} setReplyOpen={setReplyOpen} valuee={valuee}
                        setReplyflag={setReplyflag}
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

                {pendingCompl.length !== 0 ?
                    <Box sx={{ width: 2000, }}>
                        <Box sx={{
                            height: 40, mt: .5, mx: .5, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
                            bgcolor: 'white'
                        }}>
                            <Box sx={{ width: 89, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Ticket No.</Box>
                            <Box sx={{ width: 165, fontWeight: 600, color: '#444444', fontSize: 12, textAlign: 'center' }}>Action</Box>
                            <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, }}>Complaint Type</Box>
                            <Box sx={{ width: 610, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1.5 }}>Describtion</Box>
                            <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1.2 }}>Complaint To</Box>
                            <Box sx={{ width: 220, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1.3 }}>Complaint From</Box>
                            <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1.3 }}>Location</Box>
                            <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 3 }}>Complaint Date</Box>
                        </Box>
                        <Virtuoso
                            style={{ height: '28vh' }}
                            totalCount={pendingCompl?.length}
                            itemContent={(index) => {
                                const val = pendingCompl[index];
                                return (
                                    <Box key={val.complaint_slno}
                                        sx={{
                                            display: 'flex', mt: .3,
                                            borderBottom: .1, mx: 1,
                                            borderColor: 'lightgrey', minHeight: 35,
                                            maxHeight: 80,
                                            bgcolor: val.priority_check === 1 ? '#B7CFDC' : 'white',
                                            pt: .5,
                                        }}
                                    >
                                        <Box sx={{ pl: 2, width: 75, fontWeight: 600, fontSize: 14 }}>
                                            {val.complaint_slno}
                                        </Box>
                                        <Box sx={{ width: 175, display: 'flex', gap: .5, textAlign: 'center' }}>
                                            {val.compalint_status === 1 ?
                                                <EditIcon
                                                    fontSize='medium'
                                                    sx={{
                                                        color: 'lightgrey',
                                                    }}
                                                /> :
                                                <EditIcon
                                                    fontSize='medium'
                                                    sx={{
                                                        cursor: 'pointer', color: '#145DA0',
                                                        '&:hover': { color: '#0C2D48' }
                                                    }}
                                                    onClick={() => rowSelect(val)}
                                                />}
                                            {val.cm_file_status === 1 ?
                                                <FilePresentRoundedIcon sx={{
                                                    color: '#41729F',
                                                    cursor: 'pointer',
                                                    '&:hover': { color: '#274472' }
                                                }}
                                                    onClick={() => fileView(val)}
                                                /> :
                                                <FilePresentRoundedIcon sx={{
                                                    color: 'lightgrey',
                                                }}
                                                />}
                                            <Box onClick={() => ReplyDetails(val)} sx={{ cursor: 'pointer' }}>
                                                {val.cm_query_status === 1 ?
                                                    <MarkUnreadChatAltIcon sx={{ color: '#BF4A32', animation: `${blinkAnimation} 1s infinite` }} /> :
                                                    val.cm_query_status === 2 ?
                                                        <CommentIcon sx={{ color: '#2B82BF', animation: `${blinkAnimation} 1s infinite`, }} /> :
                                                        <TextsmsIcon sx={{ color: '#647C90', }} />
                                                }
                                            </Box>
                                            {val.compalint_status === 1 ?
                                                <CssVarsProvider>
                                                    <Tooltip title='Ticket Assinged by employee' placement='right' >
                                                        < EngineeringIcon sx={{ color: '#B68D40' }} />
                                                    </Tooltip>
                                                </CssVarsProvider> :
                                                <CssVarsProvider>
                                                    <Tooltip title='Ticket is in Pending List' placement='right' >
                                                        <EngineeringIcon sx={{ color: 'lightgrey' }} />
                                                    </Tooltip>
                                                </CssVarsProvider>
                                            }
                                            {assetArray[val.complaint_slno]?.length === 0 ?
                                                <CssVarsProvider>
                                                    <Tooltip title='No Asset Added Under Complaint' placement='right' >
                                                        <InventoryIcon sx={{
                                                            p: .1, color: 'lightgrey', cursor: 'pointer'

                                                        }} />
                                                    </Tooltip>
                                                </CssVarsProvider> :
                                                <InventoryIcon sx={{ p: .1, color: '#524199', cursor: 'pointer' }} onClick={() => AssetView(val)} />
                                            }

                                        </Box>
                                        <Box sx={{ width: 160, fontSize: 13, }}>
                                            {val.complaint_type_name}
                                        </Box>
                                        <Box sx={{ width: 610, fontSize: 14, }}>
                                            {val.complaint_desc}
                                        </Box>
                                        <Box sx={{ width: 150, fontSize: 13, }}>
                                            {val.complaint_dept_name}
                                        </Box>
                                        <Box sx={{ width: 220, fontSize: 13, }}>
                                            {val.location}
                                        </Box>
                                        <Box sx={{ width: 300, fontSize: 13, }}>
                                            {val.rm_room_name}
                                            {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name && val.rm_floor_name) ? ' - ' : ''}${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                : "Not Updated"}
                                        </Box>
                                        <Box sx={{ width: 150, fontSize: 13, pl: 1.5 }}>
                                            {val.compalint_date}
                                        </Box>
                                    </Box>
                                );
                            }}
                        />
                    </Box>
                    :
                    <Box sx={{ fontWeight: 800, fontSize: 20, color: 'lightgrey', textAlign: 'center', my: 4 }}>
                        Empty Pending Tickets
                    </Box>}
            </Box >
        </Box>
    )
}

export default memo(DirectPendingList)