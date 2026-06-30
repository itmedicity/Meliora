import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import {
    Avatar,
    Box,
    Sheet,
    Stack
} from '@mui/joy';

import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

import { formatTime } from '../../CommonComponent/CommonFun';
import IncidentTextComponent from '../../Components/IncidentTextComponent';
import MessageAttachment from '../Component/MessageAttachment';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import MessageDropdown from '../Component/MessageDropdown';
import MessageSkeleton from '../Component/MessageSkeleton';

const MobileDiscussionMessages = ({
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
    LoadingMessage
}) => {

    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    //  Scroll handling refs
    const isNewChatRef = useRef(false);
    const loadingOlderRef = useRef(false);
    const previousHeightRef = useRef(0);

    const typingUser = Object.values(typingUsers || {})?.[0];

    //  FIXED: Load older messages when reaching TOP
    const handleScroll = useCallback(() => {
        const el = containerRef.current;

        if (!el || isLoadingMore || !hasMore) return;

        if (el.scrollTop <= 50) {
            previousHeightRef.current = el.scrollHeight;
            loadingOlderRef.current = true;
            el.removeEventListener('scroll', handleScroll);
            loadMore();
        }
    }, [isLoadingMore, hasMore, loadMore]);
    //  FIXED: Attach scroll listener AFTER mount
    useEffect(() => {
        const el = containerRef.current;

        if (!el) return;

        el.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            el.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    //  Re-add listener after loadMore completes
    useEffect(() => {
        if (!loadingOlderRef.current) return;

        const el = containerRef.current;
        if (!el) return;

        //  Re-add after new messages loaded
        if (!isLoadingMore) {
            requestAnimationFrame(() => {
                const diff = el.scrollHeight - previousHeightRef.current;
                el.scrollTop += diff;
                loadingOlderRef.current = false;

                //  Re-add scroll listener
                el.addEventListener('scroll', handleScroll, { passive: true });
            });
        }
    }, [isLoadingMore, handleScroll]);

    // Mark as new chat when selectedChat changes
    useEffect(() => {
        isNewChatRef.current = true;
    }, [selectedChat?.conversation_id]);

    //  Scroll after messages load
    useEffect(() => {
        const el = containerRef.current;
        if (!el || loadingOlderRef.current) return;

        //  Fresh chat switch — scroll to bottom
        if (isNewChatRef.current) {
            requestAnimationFrame(() => {
                el.scrollTop = el.scrollHeight;
                isNewChatRef.current = false;
            });
            return;
        }

        //  New message — scroll if near bottom
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
                        fontSize: 12,
                        color: '#4fc3f7'
                    }}
                />
            );
        }
        if (msg.delivered) {
            return (
                <DoneAllRoundedIcon
                    sx={{
                        fontSize: 12,
                        color: '#9e9e9e'
                    }}
                />
            );
        }

        return (
            <DoneRoundedIcon
                sx={{
                    fontSize: 12,
                    color: '#9e9e9e'
                }}
            />
        );
    }, []);

    const displayMessages = useMemo(() => {
        return [...messages].reverse();
    }, [messages]);

    return (
        <Box
            ref={containerRef}
            sx={{
                flex: 1,
                overflowY: 'auto',  //  Scrollable
                overflowX: 'hidden',
                px: 1,
                py: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.8,
                scrollbarWidth: 'none',
                minHeight: 0,  //  IMPORTANT for flex scrolling
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                '@keyframes typingBlink': {
                    '0%': { opacity: 0.3, transform: 'translateY(0px)' },
                    '50%': { opacity: 1, transform: 'translateY(-2px)' },
                    '100%': { opacity: 0.3, transform: 'translateY(0px)' }
                }
            }}
        >
            {/* Loading Older Messages - TOP */}
            {isLoadingMore && (
                <Box sx={{ textAlign: 'center', py: 0.8 }}>
                    <Stack spacing={0.8} sx={{ width: '100%' }}>
                        <MessageSkeleton isOwn={false} />
                        <MessageSkeleton isOwn={true} />
                    </Stack>
                </Box>
            )}

            {/* Loading Skeleton - Initial */}
            {LoadingMessage && (
                <Box sx={{ textAlign: 'center', py: 1 }}>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <MessageSkeleton isOwn={false} />
                        <MessageSkeleton isOwn={true} />
                        <MessageSkeleton isOwn={false} />
                        <MessageSkeleton isOwn={true} />
                        <MessageSkeleton isOwn={false} />
                    </Stack>
                </Box>
            )}

            {/* Messages */}
            {displayMessages?.map((msg) => {
                const isOwn = Number(msg.sender_emp_id) === Number(logggedUserId);

                const reply = msg.reply_message_detail
                    ? JSON.parse(msg.reply_message_detail)
                    : null;

                const isReplyOwn = Number(reply?.sender_emp_id) === Number(logggedUserId);

                const canEdit =
                    isOwn &&
                    msg?.message &&
                    (!msg?.attachments || msg.attachments.length === 0);

                return (
                    <Box
                        key={msg.message_id}
                        sx={{
                            display: 'flex',
                            justifyContent: isOwn ? 'flex-end' : 'flex-start'
                        }}
                    >
                        <Stack
                            spacing={0.2}
                            sx={{ maxWidth: '85%' }}
                        >
                            {/* SENDER NAME */}
                            {!isOwn && (
                                <IncidentTextComponent
                                    text={msg.sender_name}
                                    color="#5b2c83"
                                    size={10}
                                    weight={600}
                                />
                            )}

                            {/* MESSAGE BUBBLE */}
                            <Sheet
                                sx={{
                                    px: msg.attachments?.length ? 0.5 : 1,
                                    py: msg.attachments?.length ? 0.5 : 0.7,
                                    borderRadius: 12,
                                    bgcolor: isOwn ? '#1976d2' : '#ffffff',
                                    color: isOwn ? '#fff' : '#000',
                                    boxShadow: 'none',
                                    border: isOwn ? 'none' : '1px solid #e8e8e8',
                                    position: 'relative'
                                }}
                            >
                                {/* REPLY THREAD */}
                                {reply?.message_id && (
                                    <Box
                                        sx={{
                                            mb: 0.5,
                                            px: 0.8,
                                            py: 0.5,
                                            borderLeft: '3px solid',
                                            borderColor: isOwn ? '#90caf9' : '#1976d2',
                                            bgcolor: isOwn ? 'rgba(255,255,255,0.15)' : '#f5f5f5',
                                            borderRadius: 1
                                        }}
                                    >
                                        <Stack direction="row" spacing={0.3} alignItems="center">
                                            {!isReplyOwn && (
                                                <Avatar
                                                    size="sm"
                                                    sx={{ width: 16, height: 16, fontSize: 9 }}
                                                >
                                                    {reply?.sender_name?.charAt(0)}
                                                </Avatar>
                                            )}
                                            <IncidentTextComponent
                                                text={isReplyOwn ? 'You' : reply?.sender_name}
                                                color={isOwn ? '#dbeafe' : '#1976d2'}
                                                size={9}
                                                weight={600}
                                            />
                                        </Stack>
                                        <IncidentTextComponent
                                            text={reply.message}
                                            color={isOwn ? '#ffffff' : '#555'}
                                            size={9}
                                            weight={400}
                                        />
                                    </Box>
                                )}

                                {/* MESSAGE TEXT */}
                                {msg.message && (
                                    <Box sx={{ px: 0.3 }}>
                                        <IncidentTextComponent
                                            text={msg.message}
                                            color={isOwn ? '#fff' : '#000'}
                                            size={13}
                                            weight={400}
                                        />
                                    </Box>
                                )}

                                {/* ATTACHMENTS */}
                                {msg.attachments?.map((file) => (
                                    <MessageAttachment
                                        key={file.file_id || file.file_name}
                                        file={file}
                                        baseUrl={PUBLIC_NAS_FOLDER}
                                    />
                                ))}

                                {/* FOOTER */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        gap: 0.3,
                                        mt: 0.2,
                                        px: 0.3
                                    }}
                                >
                                    {msg.is_edited === 1 && (
                                        <IncidentTextComponent
                                            text="Edited"
                                            color={isOwn ? '#dbeafe' : '#9e9e9e'}
                                            size={8}
                                            weight={400}
                                        />
                                    )}

                                    <span
                                        style={{
                                            fontSize: 9,
                                            color: isOwn ? '#dbeafe' : '#888',
                                            lineHeight: 1
                                        }}
                                    >
                                        {formatTime(msg.created_at)}
                                    </span>

                                    {isOwn && getMessageStatusIcon(msg)}

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

            {/* TYPING INDICATOR */}
            {typingUser && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Stack direction="row" spacing={0.8} alignItems="flex-end">
                        <Avatar
                            size="sm"
                            sx={{ width: 28, height: 28, fontSize: 12 }}
                        >
                            {typingUser?.charAt(0)}
                        </Avatar>
                        <Sheet
                            sx={{
                                px: 1,
                                py: 0.6,
                                borderRadius: 12,
                                bgcolor: '#ffffff',
                                border: '1px solid #e0e0e0',
                                boxShadow: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.3,
                                minWidth: 50,
                                height: 32
                            }}
                        >
                            <Box
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#9e9e9e',
                                    animation: 'typingBlink 1s infinite'
                                }}
                            />
                            <Box
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#9e9e9e',
                                    animation: 'typingBlink 1s infinite 0.2s'
                                }}
                            />
                            <Box
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    bgcolor: '#9e9e9e',
                                    animation: 'typingBlink 1s infinite 0.4s'
                                }}
                            />
                        </Sheet>
                    </Stack>
                </Box>
            )}

            <div ref={bottomRef} />
        </Box>
    );
};

export default memo(MobileDiscussionMessages);