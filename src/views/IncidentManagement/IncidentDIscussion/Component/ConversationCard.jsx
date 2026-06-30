import React, { memo, useCallback } from 'react';

import {
    Avatar,
    Badge,
    Box,
    Stack,
    Typography
} from '@mui/joy';

import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import { format } from 'date-fns';
import IncidentTextComponent from '../../Components/IncidentTextComponent';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';


const ConversationCard = ({
    chat,
    selectedChat,
    setSelectedChat,
    onlineUsers,
    unRead
}) => {




    const queryClient = useQueryClient();
    const { empid } = useSelector(state => {
        return state.LoginUserData
    });

    const isSelected =
        selectedChat?.conversation_id === chat?.conversation_id;


    const participantIds =
        chat?.participant_ids
            ?.split(',')
            ?.map(Number) || [];

    const isOnline =
        participantIds.some(id =>
            onlineUsers?.includes(id)
        );

    const handleSelectChat = useCallback(async (chat) => {
        setSelectedChat(chat);

        queryClient.setQueryData(['unread-count', empid], (old = []) =>
            old.map(item =>
                Number(item.conversation_id) === Number(chat.conversation_id)
                    ? { ...item, unread_count: 0 }
                    : item
            )
        );


        queryClient.setQueryData(
            ['all-unread-count', empid],
            (old = []) =>
                old.filter(
                    item =>
                        Number(item.conversation_id) !==
                        Number(chat.conversation_id)
                )
        );


        const unreadCount = Number(unRead?.unread_count || 0);

        if (unreadCount === 0) {
            return;
        }

        try {
            await axioslogin.post('/incidentMaster/mark-message-read',
                {
                    conversationId: chat.conversation_id,
                    empId: empid
                }
            );

        } catch (error) {
            queryClient.invalidateQueries({
                queryKey: ['unread-count', empid]
            });
        }
    }, [
        empid,
        queryClient,
        unRead?.unread_count
    ]);


    return (

        <Box
            onClick={() => handleSelectChat(chat)}
            sx={{
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderLeft: isSelected
                    ? '4px solid #74359c'
                    : '4px solid transparent',

                bgcolor: isSelected
                    ? '#f6f0fb'
                    : 'transparent',

                '&:hover': {
                    bgcolor: '#f5f7fa'
                }
            }}
        >

            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
            >

                {/* AVATAR */}
                <Badge
                    color="success"
                    variant="solid"
                    invisible={!isOnline}
                    size="sm"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                >
                    <Avatar
                        variant={
                            isSelected
                                ? 'solid'
                                : 'soft'
                        }
                        color="primary"
                        sx={{
                            width: 44,
                            height: 44
                        }}
                    >
                        {
                            chat?.is_group_chat === 1
                                ? <Groups2RoundedIcon />
                                : chat?.participants
                                    ?.trim()
                                    ?.charAt(0)
                                    ?.toUpperCase() || '?'
                        }
                    </Avatar>
                </Badge>
                {/* CHAT DETAILS */}

                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0
                    }}>

                    {/* HEADER */}

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">

                        <IncidentTextComponent
                            text={
                                chat?.is_group_chat === 1
                                    ? chat?.title
                                    : chat?.participants
                            }
                            color="#171717"
                            size={12}
                            weight={700}
                        />
                        <Box>
                            <IncidentTextComponent
                                text={
                                    chat?.last_message_time
                                        ? format(
                                            new Date(chat.last_message_time),
                                            'hh:mm a'
                                        )
                                        : format(
                                            new Date(),
                                            'hh:mm a'
                                        )
                                }
                                color="#6b6b6b"
                                size={8}
                                weight={500}
                            />
                            {
                                Number(unRead?.unread_count) > 0 &&
                                <Box sx={{
                                    width: 20,
                                    height: 20,
                                    bgcolor: '#8d09df',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <IncidentTextComponent
                                        text={unRead?.unread_count}
                                        color="#fffdfd"
                                        size={8}
                                        weight={500}
                                    />
                                </Box>
                            }
                        </Box>
                    </Stack>

                    {/* MESSAGE */}

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={0.5}>

                        <Box
                            sx={{
                                width: '80%',
                                overflow: 'hidden'
                            }}
                        >
                            <Typography sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: 10,
                                fontWeight: 500,
                                fontFamily: 'var(--roboto-font)',
                            }}>{
                                    chat?.last_message ||
                                    'No messages yet'
                                }
                            </Typography>

                        </Box>

                        {
                            chat?.unread > 0 && (

                                <Box
                                    sx={{
                                        minWidth: 20,
                                        height: 20,
                                        px: 0.8,
                                        borderRadius: 20,
                                        bgcolor: '#74359c',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >

                                    <IncidentTextComponent
                                        text={chat?.unread}
                                        color="#fff"
                                        size={8}
                                        weight={700}
                                    />

                                </Box>
                            )
                        }

                    </Stack>

                </Box>

            </Stack>

        </Box>
    );
};

export default memo(ConversationCard);