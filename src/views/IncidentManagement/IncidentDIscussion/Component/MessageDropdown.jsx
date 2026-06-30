import React, {
    memo,
    useEffect,
    useRef,
    useState
} from 'react';

import {
    Box,
    IconButton,
    Sheet
} from '@mui/joy';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';

const MessageDropdown = ({
    isOwn = false,
    onReply = () => { },
    onDelete = () => { },
    onEdit = () => { },
    canEdit
}) => {

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };

    }, []);

    return (

        <Box
            ref={menuRef}
            sx={{
                position: 'relative'
            }}
        >

            <IconButton
                size="sm"
                variant="plain"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(prev => !prev);
                }}
                sx={{
                    minHeight: 18,
                    minWidth: 18,
                    p: 0
                }}
            >

                <KeyboardArrowDownRoundedIcon
                    sx={{
                        fontSize: 16
                    }}
                />

            </IconButton>

            {
                open && (

                    <Sheet
                        variant="outlined"
                        sx={{
                            position: 'absolute',
                            top: 24,
                            right: 0,
                            minWidth: 100,
                            zIndex: 9999,
                            borderRadius: 10,
                            bgcolor: 'background.body',
                            boxShadow: 'lg',
                            py: 0.5
                        }}
                    >

                        <Box
                            sx={menuItemStyle}
                            onClick={() => {
                                onReply();
                                setOpen(false);
                            }}
                        >
                            Reply
                        </Box>


                        {
                            isOwn && (
                                <Box>
                                    <Box
                                        sx={{
                                            ...menuItemStyle,
                                            color: 'danger.500'
                                        }}
                                        onClick={() => {
                                            onDelete();
                                            setOpen(false);
                                        }}
                                    >

                                        <DeleteRoundedIcon
                                            sx={{
                                                fontSize: 16
                                            }} />

                                        Delete

                                    </Box>
                                    {
                                        canEdit &&

                                        <Box
                                            sx={{
                                                ...menuItemStyle,
                                                color: "#21c8fa"
                                            }}
                                            onClick={() => {
                                                onEdit();
                                                setOpen(false);
                                            }}>

                                            <EditIcon
                                                sx={{
                                                    fontSize: 16
                                                }} />

                                            Edit

                                        </Box>
                                    }
                                </Box>
                            )
                        }

                    </Sheet>
                )
            }

        </Box>
    );
};

const menuItemStyle = {
    px: 1.5,
    py: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    fontSize: 13,
    '&:hover': {
        bgcolor: '#f5f5f5'
    }
};

export default memo(MessageDropdown);