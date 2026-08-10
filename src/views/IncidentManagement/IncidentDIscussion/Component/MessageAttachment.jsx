
import React, { memo } from 'react';

import {
    Box,
    Sheet,

} from '@mui/joy';

import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import VideoFileRoundedIcon from '@mui/icons-material/VideoFileRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';


import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import AttachmentActionMenu from './AttachmentActionMenu';

const getIcon = (type) => {

    if (type?.startsWith('image/')) {
        return (
            <ImageRoundedIcon
                sx={{
                    color: '#1976d2'
                }}
            />
        );
    }

    if (type?.startsWith('video/')) {
        return (
            <VideoFileRoundedIcon
                sx={{
                    color: '#d32f2f'
                }}
            />
        );
    }

    if (type === 'application/pdf') {
        return (
            <PictureAsPdfRoundedIcon
                sx={{
                    color: '#ef5350'
                }}
            />
        );
    }

    return (
        <InsertDriveFileRoundedIcon
            sx={{
                color: '#7b1fa2'
            }}
        />
    );
};

const MessageAttachment = ({ file }) => {

    if (!file?.file_url) return null;

    const url =
        `${PUBLIC_NAS_FOLDER}/chat-files${file.file_url}`;

    const baseStyle = {
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        maxWidth: 260
    };

    const handleView = () => {
        window.open(url, '_blank');
    };

    const handleDownload = async () => {
        try {

            const response = await fetch(url);

            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');

            link.href = blobUrl;

            link.download =
                file.original_name ||
                file.file_name ||
                'download';

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <Box sx={{ mt: 0.5 }}>

            {/* IMAGE */}

            {file.mime_type?.startsWith('image/') && (

                <Sheet
                    onClick={handleView}
                    sx={{
                        ...baseStyle,
                        cursor: 'pointer'
                    }}
                >

                    <img
                        src={url}
                        alt={file.original_name}
                        style={{
                            width: '100%',
                            display: 'block'
                        }}
                    />

                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8
                        }}
                    >
                        <AttachmentActionMenu
                            onView={handleView}
                            onDownload={handleDownload}
                        />
                    </Box>

                </Sheet>
            )}

            {/* VIDEO */}

            {file.mime_type?.startsWith('video/') && (

                <Sheet
                    sx={{
                        ...baseStyle,
                        position: 'relative'
                    }}
                >

                    <video
                        controls
                        style={{
                            width: '100%'
                        }}
                    >

                        <source src={url} />

                    </video>
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8
                        }}
                    >
                        <AttachmentActionMenu
                            onView={handleView}
                            onDownload={handleDownload}
                        />
                    </Box>

                </Sheet>
            )}

            {/* PDF / FILE */}

            {!file.mime_type?.startsWith('image/') &&
                !file.mime_type?.startsWith('video/') && (

                    // <Sheet
                    //     onClick={handleView}
                    //     sx={{
                    //         ...baseStyle,
                    //         cursor: 'pointer',
                    //         display: 'flex',
                    //         alignItems: 'center',
                    //         justifyContent:
                    //             'space-between',
                    //         gap: 1.2,
                    //         p: 1.2,
                    //         bgcolor: '#f7f7f7',
                    //         '&:hover': {
                    //             bgcolor: '#eeeeee'
                    //         }
                    //     }}
                    // >

                    //     <Box
                    //         sx={{
                    //             display: 'flex',
                    //             alignItems: 'center',
                    //             gap: 1
                    //         }}
                    //     >

                    //         {getIcon(
                    //             file.mime_type
                    //         )}

                    //         <Box
                    //             sx={{
                    //                 fontSize: 11,
                    //                 fontWeight: 600,
                    //                 maxWidth: 150,
                    //                 overflow:
                    //                     'hidden',
                    //                 textOverflow:
                    //                     'ellipsis',
                    //                 whiteSpace:
                    //                     'nowrap'
                    //             }}
                    //         >

                    //             {file.original_name}

                    //         </Box>

                    //     </Box>

                    //     <Dropdown>

                    //         <MenuButton
                    //             slots={{
                    //                 root: IconButton
                    //             }}
                    //             size="sm"
                    //             onClick={(e) =>
                    //                 e.stopPropagation()
                    //             }
                    //         >

                    //             <MoreVertRoundedIcon />

                    //         </MenuButton>

                    //         <Menu>

                    //             <MenuItem
                    //                 onClick={
                    //                     handleView
                    //                 }
                    //             >

                    //                 <VisibilityRoundedIcon />

                    //                 View

                    //             </MenuItem>

                    //             <MenuItem
                    //                 onClick={
                    //                     handleDownload
                    //                 }
                    //             >

                    //                 <DownloadRoundedIcon />

                    //                 Download

                    //             </MenuItem>

                    //         </Menu>

                    //     </Dropdown>

                    // </Sheet>
                    <Sheet
                        onClick={handleView}
                        sx={{
                            ...baseStyle,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1.2,
                            p: 1.2,
                            bgcolor: '#f7f7f7',
                            '&:hover': {
                                bgcolor: '#eeeeee'
                            }
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >

                            {getIcon(file.mime_type)}

                            <Box
                                sx={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    maxWidth: 150,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >

                                {file.original_name}

                            </Box>

                        </Box>

                        {/* <Box
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AttachmentActionMenu
                                onView={handleView}
                                onDownload={handleDownload}
                            />
                        </Box> */}

                    </Sheet>
                )}

        </Box>
    );
};

export default memo(MessageAttachment);