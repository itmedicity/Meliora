import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import {
    Avatar,
    Box,
    Sheet,
    Stack,

} from '@mui/joy';

import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

import IncidentTextComponent from '../Components/IncidentTextComponent';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import MessageAttachment from './Component/MessageAttachment';
import { formatTime } from '../CommonComponent/CommonFun';
import MessageDropdown from './Component/MessageDropdown';
import MessageSkeleton from './Component/MessageSkeleton';
import bgimagg from '../../../assets/images/caht3.png'


const DiscussionMessages = ({
    messages = [],
    logggedUserId,
    typingUsers = {},
    setReplyMessage,
    onMessageDelete,
    setEditMessage,
    selectedChat,
    loadMore,
    hasMore,
    isLoadingMore,
    LoadingMessage,
    isEmptyConversation
}) => {




    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    // Scroll handling
    const isNewChatRef = useRef(false);
    const loadingOlderRef = useRef(false);
    const previousHeightRef = useRef(0);

    const typingUser =
        Object.values(typingUsers || {})?.[0];


    // Load older messages when reaching top
    const handleScroll = useCallback(() => {
        const el = containerRef.current;

        if (!el || isLoadingMore || !hasMore) return;

        if (el.scrollTop <= 80) {
            previousHeightRef.current = el.scrollHeight;
            loadingOlderRef.current = true;
            loadMore();
        }
    }, [
        isLoadingMore,
        hasMore,
        loadMore
    ]);


    // Attach scroll listener
    useEffect(() => {
        const el = containerRef.current;

        if (!el) return;

        el.addEventListener('scroll', handleScroll);

        return () => {
            el.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    // Mark as new chat when selectedChat changes
    useEffect(() => {
        isNewChatRef.current = true;
    }, [selectedChat?.conversation_id]);


    // Scroll after messages actually load
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Older messages loaded — restore scroll position
        if (loadingOlderRef.current) {
            requestAnimationFrame(() => {
                const diff = el.scrollHeight - previousHeightRef.current;
                el.scrollTop += diff;
                loadingOlderRef.current = false;
            });
            return;
        }

        // Fresh chat switch — force scroll to bottom
        if (isNewChatRef.current) {
            requestAnimationFrame(() => {
                el.scrollTop = el.scrollHeight;
                isNewChatRef.current = false;
            });
            return;
        }

        // New incoming message — scroll only if near bottom
        requestAnimationFrame(() => {
            const distanceFromBottom =
                el.scrollHeight - el.scrollTop - el.clientHeight;

            if (distanceFromBottom < 200) {
                bottomRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            }
        });

    }, [messages]);

    // Typing indicator
    useEffect(() => {
        if (!typingUser) return;

        requestAnimationFrame(() => {
            bottomRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        });
    }, [typingUser]);


    const hanldeEdit = useCallback((msg) => {
        setEditMessage(msg);
    }, [setEditMessage]);


    const HandleReply = useCallback((msg) => {
        setReplyMessage(msg);
    }, [setReplyMessage]);


    const getMessageStatusIcon = useCallback((msg) => {
        if (msg.seen) {
            return (
                <DoneAllRoundedIcon
                    sx={{
                        fontSize: 14,
                        color: '#4fc3f7'
                    }}
                />
            );
        }
        if (msg.delivered) {
            return (
                <DoneAllRoundedIcon
                    sx={{
                        fontSize: 14,
                        color: '#9e9e9e'
                    }}
                />
            );
        }

        return (
            <DoneRoundedIcon
                sx={{
                    fontSize: 14,
                    color: '#9e9e9e'
                }}
            />
        );
    }, [])


    const displayMessages = useMemo(() => {
        return [...messages].reverse();
    }, [messages]);

    const isEmpyConv = Number(isEmptyConversation) === 0;

    return (

        <Box
            ref={containerRef}
            sx={{
                flex: 1,
                overflowY: 'auto',
                px: 2,
                py: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                ...(displayMessages.length === 0 && {
                    backgroundImage: `url(${bgimagg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover', // Fill entire area
                    minHeight: '80%',
                    width: '100%'
                }),

                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                // TYPING ANIMATION
                '@keyframes typingBlink': {
                    '0%': {
                        opacity: 0.3,
                        transform: 'translateY(0px)'
                    },
                    '50%': {
                        opacity: 1,
                        transform: 'translateY(-3px)'
                    },
                    '100%': {
                        opacity: 0.3,
                        transform: 'translateY(0px)'
                    }
                }
            }}
        >

            {!isEmpyConv && LoadingMessage && (
                <Box sx={{ textAlign: 'center', py: 1.5 }}>
                    <Stack spacing={1.5} sx={{ width: '100%' }}>
                        <MessageSkeleton isOwn={false} />
                        <MessageSkeleton isOwn={true} />
                        <MessageSkeleton isOwn={false} />
                        <MessageSkeleton isOwn={true} />
                        <MessageSkeleton isOwn={false} />
                        <MessageSkeleton isOwn={true} />
                    </Stack>
                </Box>
            )}
            {/* <div ref={topRef} /> */}
            {isLoadingMore && (
                <Box sx={{ textAlign: 'center', py: 1.5 }}>
                    <Stack spacing={1.5} sx={{ width: '100%' }}>
                        <MessageSkeleton isOwn={false} />
                        <MessageSkeleton isOwn={true} />
                    </Stack>
                </Box>
            )}
            {
                displayMessages?.map((msg) => {

                    const isOwn =
                        Number(msg.sender_emp_id) ===
                        Number(logggedUserId);

                    const reply = msg.reply_message_detail
                        ? JSON.parse(msg.reply_message_detail)
                        : null;

                    const isReplyOwn =
                        Number(reply?.sender_emp_id) ===
                        Number(logggedUserId);

                    const canEdit =
                        isOwn &&
                        msg?.message &&
                        (!msg?.attachments ||
                            msg.attachments.length === 0);

                    return (

                        <Box
                            key={msg.message_id}
                            sx={{
                                display: 'flex',
                                justifyContent:
                                    isOwn
                                        ? 'flex-end'
                                        : 'flex-start'
                            }}>
                            <Stack
                                spacing={0.3}
                                sx={{
                                    maxWidth: '72%'
                                }}>

                                {/* SENDER */}

                                {!isOwn && (

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center">

                                        <Avatar size="sm">
                                            {msg.sender_name?.[0]}
                                        </Avatar>

                                        <IncidentTextComponent
                                            text={msg.sender_name}
                                            color="#5b2c83"
                                            size={10}
                                            weight={700}
                                        />
                                    </Stack>
                                )}

                                {/* MESSAGE BUBBLE */}

                                <Sheet
                                    sx={{
                                        px:
                                            msg.attachments?.length
                                                ? 0.5
                                                : 1.2,

                                        py:
                                            msg.attachments?.length
                                                ? 0.5
                                                : 0.8,

                                        borderRadius: 16,

                                        bgcolor:
                                            isOwn
                                                ? '#1976d2'
                                                : '#ffffff',

                                        color:
                                            isOwn
                                                ? '#fff'
                                                : '#000',

                                        boxShadow: 'sm',

                                        border:
                                            isOwn
                                                ? 'none'
                                                : '1px solid #e0e0e0',

                                        position: 'relative'
                                    }}
                                >

                                    {/* TEXT */}
                                    {reply.message_id !== null && (
                                        <Box
                                            sx={{
                                                mb: 0.8,
                                                px: 1,
                                                py: 0.7,
                                                borderLeft: '4px solid',
                                                borderColor: isOwn ? '#90caf9' : '#1976d2',
                                                bgcolor: isOwn
                                                    ? 'rgba(255,255,255,0.15)'
                                                    : '#f5f5f5',
                                                borderRadius: 1
                                            }}>

                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                {!isReplyOwn && (
                                                    <Avatar
                                                        size="sm"
                                                        sx={{
                                                            width: 18,
                                                            height: 18,
                                                            fontSize: 10
                                                        }}
                                                    >

                                                        {reply?.sender_name?.charAt(0)}
                                                    </Avatar>
                                                )}

                                                <IncidentTextComponent
                                                    text={isReplyOwn ? 'You' : reply?.sender_name}
                                                    color={isOwn ? '#dbeafe' : '#1976d2'}
                                                    size={10}
                                                    weight={700}
                                                />
                                            </Stack>

                                            <IncidentTextComponent
                                                text={reply.message}
                                                color={isOwn ? '#ffffff' : '#555'}
                                                size={10}
                                                weight={400}
                                            />


                                        </Box>
                                    )}

                                    {msg.message && (

                                        <Box sx={{
                                            px: 0.5
                                        }}>

                                            <IncidentTextComponent
                                                text={msg.message}

                                                color={
                                                    isOwn
                                                        ? '#fff'
                                                        : '#000'
                                                }

                                                size={12}

                                                weight={500}
                                            />

                                        </Box>
                                    )}

                                    {/* ATTACHMENTS */}

                                    {msg.attachments?.map((file) => (

                                        <MessageAttachment
                                            key={file.file_id || file.file_name}
                                            file={file}
                                            baseUrl={
                                                PUBLIC_NAS_FOLDER
                                            }
                                        />
                                    ))}

                                    {/* FOOTER */}

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            mt: 0.3,
                                            px: 0.5
                                        }}>

                                        {/* TIME */}
                                        {
                                            msg.is_edited === 1 &&
                                            <IncidentTextComponent
                                                text={"Edited"}
                                                color={'#f0ecec'}
                                                size={9}
                                                weight={400}
                                            />

                                        }

                                        <span
                                            style={{
                                                fontSize: 10,

                                                color:
                                                    isOwn
                                                        ? '#dbeafe'
                                                        : '#888'
                                            }}
                                        >

                                            {formatTime(msg.created_at)}

                                        </span>

                                        {/* TICK */}

                                        {isOwn &&
                                            getMessageStatusIcon(msg)
                                        }

                                        {/* MENU */}

                                        <MessageDropdown
                                            isOwn={isOwn}
                                            onReply={() => HandleReply(msg)}
                                            onDelete={() => onMessageDelete(msg)}
                                            onEdit={() => hanldeEdit(msg)}
                                            canEdit={canEdit}
                                        />
                                    </Box>

                                </Sheet>

                            </Stack>

                        </Box>
                    );
                })}

            {/* TYPING BUBBLE */}

            {
                typingUser && (

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}
                    >

                        <Stack
                            direction="row"

                            spacing={1}

                            alignItems="flex-end">

                            <Avatar size="sm">
                                {typingUser?.[0]}
                            </Avatar>

                            <Sheet
                                sx={{
                                    px: 1.5,
                                    py: 1,
                                    borderRadius: 16,
                                    bgcolor: '#ffffff',
                                    border: '1px solid #e0e0e0',

                                    boxShadow: 'sm',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    minWidth: 60,
                                    height: 40
                                }}
                            >

                                <Box
                                    sx={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        bgcolor: '#9e9e9e',
                                        animation:
                                            'typingBlink 1s infinite'
                                    }}
                                />

                                <Box
                                    sx={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        bgcolor: '#9e9e9e',
                                        animation:
                                            'typingBlink 1s infinite 0.2s'
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        bgcolor: '#9e9e9e',
                                        animation:
                                            'typingBlink 1s infinite 0.4s'
                                    }}
                                />
                            </Sheet>
                        </Stack>
                    </Box>
                )
            }

            <div ref={bottomRef} />

        </Box>
    );
};

export default memo(DiscussionMessages);