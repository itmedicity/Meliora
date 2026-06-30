import React, { memo, useCallback, useState } from 'react';

import {
    Avatar,
    Box,
    IconButton,
    Stack,
    Tooltip
} from '@mui/joy';

import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { Typography } from '@mui/material';

import GroupMemberDrawer from './Component/GroupMemberDrawer';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MobileChatQRModal from './MobileView/MobileChatQRModal';

const DiscussionMessageHeader = ({
    selectedChat,
    incidentNo,
    createdDate,
    isOnline,
    typingUsers,
    GroupEmployeees = [],
    refetchGroupMembers,
    onlineInGroup,
    mode,
    mobileConnected,
    isEmptyMessage
}) => {
    const typingText = Object.values(typingUsers || {})?.[0];
    const isEmpty = Number(isEmptyMessage) === 0;



    const onlineCount = onlineInGroup?.length;
    const [openQR, setOpenQR] = useState(false);


    const { empid } = useSelector(state => {
        return state.LoginUserData
    });
    const [openMembers, setOpenMembers] = useState(false);

    const handleRemoveMember = useCallback(async (emp) => {
        if (!selectedChat?.conversation_id) {
            return warningNotify('Conversation not found');
        }
        if (!emp?.emp_id) {
            return warningNotify('Employee not found');
        }
        if (Number(emp.emp_id) === Number(empid)) {
            return warningNotify('You cannot remove yourself from the group');
        }
        try {
            const response = await axioslogin.patch(`/incidentMaster/conversation-member/remove/${selectedChat.conversation_id}/${emp.emp_id}`);
            const {
                success,
                message
            } = response?.data || {};
            if (success !== 1) {
                return warningNotify(
                    message || 'Failed to remove member'
                );
            }
            succesNotify(message);
            refetchGroupMembers();

        } catch (error) {
            console.error(error);
            errorNotify('Failed to remove member');
        }
    }, [
        selectedChat?.conversation_id,
        empid,
        refetchGroupMembers
    ]);

    return (
        <Box
            sx={{
                px: 2,
                py: 1.5,
                bgcolor: '#ffffff',
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>

            {/* LEFT SIDE */}

            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
            >

                <Avatar
                    variant="soft"
                    color="primary"
                >
                    {
                        selectedChat?.is_group_chat === 1
                            ? <Groups2RoundedIcon
                                sx={{ cursor: 'pointer' }}
                                onClick={() => setOpenMembers(true)}
                            />
                            : selectedChat?.participants
                                ?.trim()
                                ?.charAt(0)
                                ?.toUpperCase() || '?'
                    }

                </Avatar>

                <Box>

                    <IncidentTextComponent
                        text={selectedChat?.title || selectedChat?.participants || ''}
                        color="#484849"
                        size={14}
                        weight={700}
                    />

                    {
                        typingText && (
                            <Typography
                                level="body-xs"
                                sx={{
                                    color: '#22c55e',
                                    fontWeight: 600
                                }}
                            >
                                typing...
                            </Typography>
                        )
                    }

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        {
                            (isOnline || selectedChat?.participants)
                            &&
                            !selectedChat?.title
                            &&
                            <CircleRoundedIcon
                                sx={{
                                    fontSize: 10,
                                    color: isOnline ? '#2e7d32' : "#484848"
                                }}
                            />

                        }


                        <IncidentTextComponent
                            text={isOnline ? "Online" : selectedChat?.title ? `${onlineCount + 1} online` : 'Offline'}
                            color="#6b6b6b"
                            size={9}
                            weight={600}
                        />
                    </Stack>
                </Box>
            </Stack>

            {/* RIGHT SIDE */}

            <Stack
                alignItems="flex-end"
            >

                <IncidentTextComponent
                    text={incidentNo || ""}
                    color="#484849"
                    size={10}
                    weight={800}
                />

                <IncidentTextComponent
                    text={createdDate || ""}
                    color="#6b6b6b"
                    size={8}
                    weight={700}
                />
                {
                    !isEmpty &&

                    <Tooltip title="Attachment">
                        <IconButton
                            variant="plain"
                            onClick={() => setOpenQR(true)}>
                            <QrCodeScannerIcon sx={{
                                cursor: 'pointer'
                            }} />
                        </IconButton>
                    </Tooltip>
                }

            </Stack>

            <GroupMemberDrawer
                open={openMembers}
                onClose={() => setOpenMembers(false)}
                members={GroupEmployeees || []}
                groupName={selectedChat?.title}
                onRemoveMember={handleRemoveMember}
                loggedEmp={empid}
                ConversationId={selectedChat?.conversation_id}
                refetchGroupMembers={refetchGroupMembers}
                onlineInGroup={onlineInGroup}
            />

            <MobileChatQRModal
                open={openQR}
                onClose={() => setOpenQR(false)}
                incidentNo={incidentNo}
                chatTitle={
                    selectedChat?.title ||
                    selectedChat?.participants
                }
                qrValue="https://your-mobile-chat-link"
                mode={mode}
                selectedChat={selectedChat}
                mobileConnected={mobileConnected}
            />
        </Box>
    );
};

export default memo(DiscussionMessageHeader);