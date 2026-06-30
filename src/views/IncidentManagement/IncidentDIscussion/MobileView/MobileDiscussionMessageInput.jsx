import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Box,
    IconButton,
    Textarea,
    Sheet,
    Tooltip,
    Stack
} from '@mui/joy';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import VideoFileRoundedIcon from '@mui/icons-material/VideoFileRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import {
    FILE_ACCEPT_MAPPING,
    validateFiles,
    formatFileSize
} from '../../CommonComponent/CommonCode';

import { socket } from 'src/ws/socket';
import { warningNotify } from 'src/views/Common/CommonCode';
import IncidentTextComponent from '../../Components/IncidentTextComponent';

const attachmentOptions = [
    {
        id: 1,
        title: 'Image',
        icon: <ImageRoundedIcon />,
        color: '#1976d2'
    },
    {
        id: 2,
        title: 'Video',
        icon: <VideoFileRoundedIcon />,
        color: '#d32f2f'
    },
    {
        id: 3,
        title: 'PDF',
        icon: <PictureAsPdfRoundedIcon />,
        color: '#ef5350'
    },
    {
        id: 4,
        title: 'Document',
        icon: <DescriptionRoundedIcon />,
        color: '#7b1fa2'
    },
    {
        id: 5,
        title: 'Camera',
        icon: <CameraAltRoundedIcon />,
        color: '#00897b'
    }
];

const MobileDiscussionMessageInput = ({
    message,
    setMessage,
    onSendMessage,
    selectedChat,
    empid,
    empname,
    replymessage,
    setReplyMessage,
    editMessage,
    setEditMessage,
    onEditMessage,
    disabled
}) => {

    const [openAttachment, setOpenAttachment] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const inputRef = useRef(null);
    const [openAttachmentType, setOpenAttachmentType] = useState('');
    const fileInputRef = useRef(null);

    const typingTimerRef = useRef(null);
    const isTypingRef = useRef(false);

    const handleChooseFile = useCallback((type) => {


        const accept = FILE_ACCEPT_MAPPING[type] || '*';
        const multiple = type !== 'Camera';

        setOpenAttachmentType(type);

        if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
            fileInputRef.current.multiple = multiple;

            if (type === 'Camera') {
                fileInputRef.current.setAttribute('capture', 'environment');
            } else {
                fileInputRef.current.removeAttribute('capture');
            }

            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }

        setOpenAttachment(false);
    }, []);
    const handleFileChange = useCallback((e) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) {
            e.target.value = '';
            return;
        }

        const { validFiles, errors } = validateFiles(files, openAttachmentType, attachments);

        if (errors.length > 0) {
            warningNotify(errors.join('\n'));
        }

        if (validFiles.length > 0) {
            setAttachments(prev => [...prev, ...validFiles]);
        }

        e.target.value = '';

        if (validFiles.length === 0 && errors.length > 0) {
            setOpenAttachment(false);
        }
    }, [openAttachmentType, attachments]);

    const handleRemoveAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const conversationIds = useMemo(() => {
        return Array.isArray(selectedChat?.mergedConversationIds) &&
            selectedChat.mergedConversationIds.length > 0
            ? selectedChat.mergedConversationIds
            : selectedChat?.conversation_id
                ? [selectedChat.conversation_id]
                : [];
    }, [selectedChat?.mergedConversationIds, selectedChat?.conversation_id]);

    const stopTyping = useCallback(() => {
        if (!isTypingRef.current) return;
        isTypingRef.current = false;

        socket.emit("typing-stop", {
            conversation_ids: conversationIds,
            sender_emp_id: empid
        });
    }, [conversationIds, empid]);

    const handleTyping = useCallback((e) => {
        const value = e.target.value;
        setMessage(value);

        if (conversationIds.length === 0) return;

        if (!isTypingRef.current) {
            isTypingRef.current = true;
            socket.emit("typing-start", {
                conversation_ids: conversationIds,
                sender_emp_id: empid,
                sender_name: empname
            });
        }

        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = setTimeout(stopTyping, 1000);
    }, [empid, empname, conversationIds]);

    useEffect(() => {
        return () => clearTimeout(typingTimerRef.current);
    }, []);

    const resetInputState = useCallback(() => {
        setMessage('');
        setAttachments([]);
        setOpenAttachment(false);
    }, [setMessage]);

    const handleSend = useCallback(() => {
        if (!message?.trim() && attachments.length === 0) {
            return;
        }

        if (editMessage?.message_id) {
            onEditMessage(editMessage.message_id, {
                message,
                attachments
            });
            setEditMessage(null);
            setReplyMessage({});
            resetInputState();
            return;
        }

        onSendMessage({
            message,
            attachments
        });
        resetInputState();
    }, [message, attachments, editMessage, onSendMessage, onEditMessage,
        setEditMessage, setReplyMessage, resetInputState]);

    useEffect(() => {
        if (editMessage?.message_id) {
            setMessage(editMessage.message || '');
            setAttachments([]);
            inputRef.current?.focus();
        }
    }, [editMessage, setMessage]);

    return (
        <Box
            sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                bgcolor: '#ffffff',
                borderTop: '1px solid',
                borderColor: 'divider',
                position: 'relative'
            }}
        >
            {/* HIDDEN FILE INPUT */}
            <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="*"
                multiple
                capture=""
                onChange={handleFileChange}
            />

            {/* ATTACHMENT PICKER */}
            {openAttachment && (
                <Sheet
                    sx={{
                        position: 'absolute',
                        bottom: 65,
                        left: 10,
                        right: 10,
                        p: 1.5,
                        borderRadius: 16,
                        bgcolor: '#ffffff',
                        boxShadow: 'lg',
                        border: '1px solid',
                        borderColor: 'divider',
                        zIndex: 9999
                    }}
                >
                    <IncidentTextComponent
                        text="Share Attachment"
                        color="#74359c"
                        size={13}
                        weight={800}
                    />

                    <IncidentTextComponent
                        text="Choose file type"
                        color="#666"
                        size={10}
                        weight={500}
                    />

                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                        mt={1.5}
                    >
                        {attachmentOptions?.map((item) => (
                            <Box
                                key={item.id}
                                onClick={() => handleChooseFile(item.title)}
                                sx={{
                                    width: '48%',
                                    p: 1.2,
                                    borderRadius: 12,
                                    cursor: 'pointer',
                                    border: '1px solid #ececec',
                                    transition: '0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 0.8,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'md',
                                        bgcolor: '#fafafa'
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        bgcolor: `${item.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: item.color
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                <IncidentTextComponent
                                    text={item.title}
                                    color="#222"
                                    size={10}
                                    weight={700}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Sheet>
            )}

            {/* ATTACHMENT PREVIEW */}
            {attachments.length > 0 && (
                <Sheet
                    sx={{
                        position: 'absolute',
                        bottom: 70,
                        left: 10,
                        right: 10,
                        p: 1,
                        borderRadius: 12,
                        bgcolor: '#ffffff',
                        boxShadow: 'md',
                        border: '1px solid',
                        borderColor: 'divider',
                        zIndex: 1000
                    }}
                >
                    <Stack spacing={0.8}>
                        {attachments.map((file, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 0.5
                                }}
                            >
                                <Box sx={{ overflow: 'hidden', flex: 1 }}>
                                    <IncidentTextComponent
                                        text={`${file?.name} (${formatFileSize(file.size)})`}
                                        color="#222"
                                        size={9}
                                        weight={600}
                                    />
                                </Box>

                                <IconButton
                                    size="sm"
                                    color="danger"
                                    onClick={() => handleRemoveAttachment(index)}
                                    sx={{ minWidth: 24, height: 24 }}
                                >
                                    ×
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                </Sheet>
            )}

            {/* REPLY BOX */}
            {replymessage?.message_id && (
                <Sheet
                    sx={{
                        position: 'absolute',
                        bottom: 140,
                        left: 10,
                        right: 10,
                        p: 0.8,
                        borderRadius: 8,
                        bgcolor: '#f5f5f5',
                        borderLeft: '3px solid #731790',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                >
                    <Box sx={{ flex: 1, overflow: 'hidden' }}>
                        <IncidentTextComponent
                            text={`Replying to ${replymessage?.sender_name}`}
                            color="#7010ac"
                            size={10}
                            weight={700}
                        />

                        <IncidentTextComponent
                            text={replymessage?.message}
                            color="#444"
                            size={9}
                            weight={500}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        />
                    </Box>

                    <IconButton
                        size="sm"
                        color="danger"
                        onClick={() => setReplyMessage({})}
                        sx={{ minWidth: 24, height: 24 }}
                    >
                        ✕
                    </IconButton>
                </Sheet>
            )}

            {/* ATTACHMENT BUTTON */}
            <Tooltip title="Attachment">
                <IconButton
                    size="sm"
                    variant="plain"
                    onClick={() => setOpenAttachment(prev => !prev)}
                    sx={{ minWidth: 36, height: 36 }}
                >
                    <AttachFileRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
            </Tooltip>

            {/* MESSAGE INPUT */}
            <Textarea
                disabled={disabled}
                ref={inputRef}
                value={message}
                onFocus={() => setOpenAttachment(false)}
                onChange={handleTyping}
                minRows={1}
                maxRows={3}
                placeholder="Type your message..."
                variant="soft"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                }}
                sx={{
                    flex: 1,
                    borderRadius: 16,
                    '--Textarea-focusedThickness': '2px',
                    '& textarea': {
                        resize: 'none',
                        overflowY: 'auto',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        scrollbarWidth: 'none',
                        fontSize: 13,
                        padding: '6px 10px',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }
                }}
            />

            {/* SEND BUTTON */}
            <IconButton
                size="sm"
                color="primary"
                onClick={handleSend}
                sx={{
                    borderRadius: '50%',
                    minWidth: 38,
                    height: 38
                }}
            >
                <SendRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
        </Box>
    );
};

export default memo(MobileDiscussionMessageInput);