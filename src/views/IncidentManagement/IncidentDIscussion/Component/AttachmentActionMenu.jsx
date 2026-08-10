import React, { memo, useState } from 'react';

import {
    Box,
    IconButton,
    Sheet
} from '@mui/joy';

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

const AttachmentActionMenu = ({
    onView = () => { },
    onDownload = () => { }
}) => {

    const [open, setOpen] = useState(false);

    return (

        <Box
            sx={{
                position: 'relative'
            }}
        >

            <IconButton
                size="sm"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(prev => !prev);
                }}
                sx={{
                    bgcolor: 'rgba(0,0,0,0.55)',
                    color: '#fff',

                    '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.75)'
                    }
                }}
            >

                <MoreVertRoundedIcon />

            </IconButton>

            {open && (

                <Sheet
                    variant="outlined"
                    sx={{
                        position: 'absolute',
                        top: 38,
                        right: 0,
                        zIndex: 9999,
                        minWidth: 140,
                        borderRadius: 12,
                        overflow: 'hidden',
                        boxShadow: 'lg',
                        bgcolor: '#fff'
                    }}
                >

                    <Box
                        onClick={() => {
                            onView();
                            setOpen(false);
                        }}
                        sx={menuItemStyle}>
                         View
                    </Box>

                    <Box
                        onClick={() => {
                            onDownload();
                            setOpen(false);
                        }}
                        sx={menuItemStyle}
                    >
                        Download
                    </Box>

                </Sheet>
            )}

        </Box>
    );
};

const menuItemStyle = {
    px: 1.5,
    py: 1.2,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,

    '&:hover': {
        bgcolor: '#f3f4f6'
    }
};

export default memo(AttachmentActionMenu);