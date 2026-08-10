import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {

    Box,
    Divider,
    IconButton,
    Sheet,
    Tooltip,
} from '@mui/joy';

import DiscussionSidebar from '../IncidentDIscussion/DiscussionSidebar';
import DiscussionMessageHeader from '../IncidentDIscussion/DiscussionMessageHeader';
import DiscussionMessageInput from '../IncidentDIscussion/DiscussionMessageInput';
import DiscussionMessages from '../IncidentDIscussion/DiscussionMessages';
import CreateDiscussionButton from '../IncidentDIscussion/CreateDiscussionButton';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import { formatDateTime } from '../CommonComponent/CommonFun';
import {
    useConverstionMessages,
    useEmployeeConversation,
    useEmployeeExternalConverstion,
    useExternalConversationMessage,
    useGetUnReadNotificationCount,
    useGroupEmployees
} from '../CommonComponent/useQuery';
import { useSelector } from 'react-redux';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { useChatSocket } from '../IncidentDIscussion/Hooks/useChatSocket';
import { useConversationRoom } from '../IncidentDIscussion/Hooks/useConversationRoom';
import { useOnlineStatus } from '../IncidentDIscussion/Hooks/useOnlineStatus';
import { useQueryClient } from '@tanstack/react-query';
import { useMobileConnectionListener } from '../IncidentDIscussion/Hooks/useMobileConnectionListener';
import { useSocketAuth } from '../IncidentDIscussion/Hooks/useSocketAuth';
import { formatName } from '../CommonComponent/CommonCode';


const IncidentDiscussionModal = ({
    items = {},
    CompanyName = '',
    CurrentYear = '',
    mode = "INCIDENT",
    chatState,
}) => {

    const {
        actionType,
        module,
        actionDetailSlno
    } = chatState || {};

    const { empid, empname } = useSelector(state => {
        return state.LoginUserData
    });

    const hasIncidentAccess = !!items?.inc_register_slno;


    // ─── Conversations ────────
    const {
        data: conversations = [],
        // isLoading,
        refetch: fetchCurrentEmployeeConversation
    } = useEmployeeConversation(
        empid,
        items?.inc_register_slno,
        actionDetailSlno,
        actionType,
        module
    );


    const {
        data: externalConversations = [],
        refetch: fetchExternalConversation
    } = useEmployeeExternalConverstion(
        !hasIncidentAccess ? empid : null
    );

    const finalConversations = hasIncidentAccess ? conversations : externalConversations;


    const [selectedChat, setSelectedChat] = useState(null);
    const [openSidebar, setOpenSidebar] = useState(true);
    const [message, setMessage] = useState('');
    const [openCreateChat, setOpenCreateChat] = useState(false)
    const [replymessage, setReplyMessage] = useState({});
    const [editMessage, setEditMessage] = useState(null);



    const queryClient = useQueryClient();

    // ─── Stable merged key for external message query ─────────────────
    const mergedKey = useMemo(() => {
        return JSON.stringify(selectedChat?.mergedConversationIds || []);
    }, [selectedChat?.mergedConversationIds]);

    // ─── Message Query Keys ───────────────────────────────────────────
    const myMessageQueryKey = useMemo(() =>
        ['employeemessage', empid, selectedChat?.conversation_id],
        [empid, selectedChat?.conversation_id]
    );

    const externalMessageQueryKey = useMemo(() =>
        ['externalMessage', empid, mergedKey],
        [empid, mergedKey]
    );

    const activeMessageQueryKey = hasIncidentAccess
        ? myMessageQueryKey
        : externalMessageQueryKey;

    const {
        data: myMessageData,
        isLoading: loadingMessageData,
        fetchNextPage: fetchMyNextPage,
        hasNextPage: hasMyNextPage,
        isFetchingNextPage: isMyFetchingNextPage
    } = useConverstionMessages(
        selectedChat?.conversation_id,
        empid
    );

    const {
        data: externalMessageData,
        isLoading: loadingExteranlMessageData,
        fetchNextPage: fetchExternalNextPage,
        hasNextPage: hasExternalNextPage,
        isFetchingNextPage: isExternalFetchingNextPage
    } = useExternalConversationMessage(
        selectedChat?.mergedConversationIds,
        empid
    );


    const handleLoadMore = useCallback(() => {

        if (hasIncidentAccess) {
            if (hasMyNextPage && !isMyFetchingNextPage) {
                fetchMyNextPage();
            }
        } else {
            if (hasExternalNextPage && !isExternalFetchingNextPage) {
                fetchExternalNextPage();
            }
        }
    }, [
        hasIncidentAccess,
        hasMyNextPage,
        isMyFetchingNextPage,
        fetchMyNextPage,
        hasExternalNextPage,
        isExternalFetchingNextPage,
        fetchExternalNextPage
    ]);
    const hasMore = hasIncidentAccess ? hasMyNextPage : hasExternalNextPage;

    const isLoadingMore = hasIncidentAccess ? isMyFetchingNextPage : isExternalFetchingNextPage;

    const isLoadMessage = hasIncidentAccess ? loadingMessageData : loadingExteranlMessageData;


    const { data: GroupEmployeees,
        refetch: refetchGroupMembers
    } = useGroupEmployees(
        selectedChat?.conversation_id,
        selectedChat?.is_group_chat
    );


    const { data: GetConverStationUnreadCount
    } = useGetUnReadNotificationCount(
        empid
    );



    const IsExitInGroup = useMemo(() =>
        GroupEmployeees?.some(emp => Number(emp.em_id) === Number(empid)),
        [GroupEmployeees, empid]
    );

    // ─── Socket Setup ─────────────────────────────────────────────────
    useSocketAuth(empid, selectedChat);
    useConversationRoom(selectedChat);
    useOnlineStatus(empid);


    const finalMessages = useMemo(() => {
        if (hasIncidentAccess) {
            return myMessageData?.pages?.flatMap(page => page ?? []) ?? [];
        }
        return externalMessageData?.pages?.flatMap(page => page ?? []) ?? [];
    }, [hasIncidentAccess, myMessageData, externalMessageData]);



    const isEmptyMessage = useMemo(() => finalMessages?.length, [finalMessages]);
    const isEmptyConversation = useMemo(() => finalConversations?.length, [finalConversations]);



    // ─── Auto-select first chat & sync selectedChat after refetch ─────
    useEffect(() => {
        if (!finalConversations?.length) return;

        if (!selectedChat) {
            setSelectedChat(finalConversations[0]);
            return;
        }
    }, [finalConversations, selectedChat]);

    /**
   * Invalidates message and conversation queries when
   * a new socket message arrives for the active conversation.
   */
    const handleNewMessage = useCallback(() => {
        if (!selectedChat) return;

        if (hasIncidentAccess) {
            fetchCurrentEmployeeConversation();
        } else {
            fetchExternalConversation();
        }

        queryClient.invalidateQueries({ queryKey: myMessageQueryKey });
        queryClient.invalidateQueries({ queryKey: externalMessageQueryKey });

    }, [
        hasIncidentAccess,
        selectedChat,
        empid,
        queryClient,
        myMessageQueryKey,
        externalMessageQueryKey
    ]);

    /**
         * Notifies and refreshes group members when the
         * current user is removed from a conversation.
         */
    const handleParticipantRemoved = useCallback((data) => {
        if (Number(data.EmployeeId) === Number(empid)) {
            warningNotify("You have been removed from this conversation");
            refetchGroupMembers();
        }
    }, [
        empid,
        refetchGroupMembers
    ]);

    /**
    * Notifies and refreshes conversations when the
    * current user is added to a new conversation.
    */
    const handleNewMember = useCallback((data) => {
        if (data.EmployeeIds?.includes(Number(empid))) {
            succesNotify("You have been added to a conversation");
            refetchGroupMembers();
            fetchExternalConversation()
            fetchCurrentEmployeeConversation()
        }
    }, [
        empid,
        refetchGroupMembers,
        fetchExternalConversation,
        fetchCurrentEmployeeConversation
    ]);



    const handleNotification = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: ['unread-count', empid]
        });
    }, [queryClient, empid]);

    const {
        onlineUsers,
        typingUsers
    } = useChatSocket({
        empid,
        onNewMessage: handleNewMessage,
        onParticipantRemoved: handleParticipantRemoved,
        onNewMember: handleNewMember,
        onNewNotification: handleNotification
    });




    const { mobileConnected
        // , clearMobileConnected 
    } = useMobileConnectionListener(empid)

    // ─── Online Status ────────────────────────────────────────────────
    // Parse participant IDs from comma-separated string to number array
    const Participants = useMemo(() =>
        selectedChat?.participant_ids
            ? selectedChat.participant_ids.split(',').map(Number)
            : [],
        [selectedChat?.participant_ids]
    );

    // For 1-on-1 chat: check if the other participant is online
    const isOnline = useMemo(() =>
        Participants.some(id => onlineUsers?.includes(id)),
        [Participants, onlineUsers]
    );

    // For group chat: list all online participants
    const onlineInGroup = useMemo(() =>
        onlineUsers?.filter(user => Participants.includes(user)),
        [onlineUsers, Participants]
    );

    // ─── Send Message ───────────
    const handleSendMessage = useCallback(async (messageData = {}) => {
        try {


            if (!selectedChat?.conversation_id) return warningNotify('Please select a conversation');
            const trimmedMessage = messageData?.message?.trim() || '';
            const attachments = messageData?.attachments || [];
            if (!trimmedMessage && attachments.length === 0) return warningNotify('Message or attachment required');

            let uploadedAttachments = [];
            // STEP 1: Upload attachments if any
            if (attachments?.length > 0) {
                const uploadFormData = new FormData();
                uploadFormData.append(
                    'incident_id',
                    items?.inc_register_slno
                );
                uploadFormData.append(
                    'entity_id',
                    actionDetailSlno
                );

                uploadFormData.append(
                    'conversation_id',
                    selectedChat?.conversation_id
                );

                uploadFormData.append(
                    'emp_id',
                    empid
                );

                uploadFormData.append(
                    'keptFiles',
                    JSON.stringify([])
                );

                attachments.forEach(file => {
                    uploadFormData.append(
                        'files',
                        file
                    );
                });

                const uploadResponse =
                    await axioslogin.post(
                        '/incidentMaster/uploadchatconv',
                        uploadFormData,
                        {
                            headers: {
                                'Content-Type':
                                    'multipart/form-data'
                            }
                        }
                    );

                const { success: uploadSuccess, files = [] } = uploadResponse?.data || {};
                if (uploadSuccess !== 1) return warningNotify('File upload failed');
                uploadedAttachments = files;
            }


            // STEP 2: Determine message type from first attachment MIME type
            let messageType = 'TEXT';
            if (uploadedAttachments.length > 0) {
                const firstFile = uploadedAttachments?.[0];

                if (
                    firstFile?.mime_type?.startsWith('image/')
                ) {
                    messageType = 'IMAGE';
                }
                else if (
                    firstFile?.mime_type?.startsWith('video/')
                ) {
                    messageType = 'VIDEO';
                }
                else if (
                    firstFile?.mime_type === 'application/pdf'
                ) {
                    messageType = 'PDF';
                }
                else {
                    messageType = 'FILE';
                }
            }


            // STEP 3: Send message payload

            const payload = {
                conversation_id:
                    selectedChat?.conversation_id,
                sender_emp_id: empid,
                sender_name: formatName(selectedChat?.title || selectedChat?.participants) || '',
                message_type: messageType,
                message: trimmedMessage,
                attachments: uploadedAttachments,
                reply_to_message_id: replymessage?.message_id
            };

            const response =
                await axioslogin.post(
                    '/incidentMaster/send-message',
                    payload
                );

            const { success, message } = response?.data || {};
            if (success !== 1) return warningNotify(message || 'Failed to send message');

            setMessage('');
            setReplyMessage({})
            queryClient.invalidateQueries({ queryKey: activeMessageQueryKey });
        } catch (error) {
            console.error(error);
            errorNotify('Error sending message');
        }
    }, [
        selectedChat, empid, empname,
        replymessage?.message_id,
        items?.inc_register_slno,
        actionDetailSlno,
        activeMessageQueryKey,
        queryClient
    ]);



    // ─── Edit Message ──────
    const handleEditMessage = useCallback(async (
        messageId,
        messageData = {}
    ) => {
        try {

            if (!messageId) return warningNotify('Message ID missing');

            const trimmedMessage = messageData?.message?.trim() || '';
            if (!trimmedMessage) {
                return warningNotify(
                    'Message cannot be empty'
                );
            }
            const payload = {
                message: trimmedMessage,
                message_id: messageId,
            };

            const response = await axioslogin.post('/incidentMaster/edit-messages', payload);
            const { success, message } = response?.data || {};

            if (success !== 1) {
                return warningNotify(
                    message || 'Failed to update message'
                );
            }

            setEditMessage({});
            setMessage('');

            // await fetchCurrentEmployeeConversation();
            queryClient.invalidateQueries({ queryKey: activeMessageQueryKey });

        } catch (error) {
            console.error(error);
            errorNotify('Error updating message');
        }
    }, [activeMessageQueryKey, queryClient]);


    const hanldeDelete = useCallback(async (msg) => {
        try {
            if (!msg?.message_id) return warningNotify('Please select a conversation');
            const response = await axioslogin.get(`/incidentMaster/delete-messages/${msg?.message_id}`);
            const { success, message } = response?.data || {};
            if (success !== 1) return warningNotify(message || 'Failed to Delete message');

            // await FetchMessages()
            // await FetchExternalMessage()
            queryClient.invalidateQueries({ queryKey: myMessageQueryKey });
            queryClient.invalidateQueries({ queryKey: externalMessageQueryKey });

            await fetchCurrentEmployeeConversation()
        } catch (error) {
            console.error(error);
            errorNotify('Error deleting message');
        }
    }, [myMessageQueryKey, externalMessageQueryKey, queryClient, fetchCurrentEmployeeConversation]);


    // ─── Incident display info ────────────────────────────────────────
    const incidentNo = useMemo(() =>
        hasIncidentAccess
            ? `${CompanyName || ''}${CurrentYear || ''}/${items.inc_register_slno}`
            : '',
        [hasIncidentAccess, CompanyName, CurrentYear, items.inc_register_slno]
    );

    const createdDate = useMemo(() =>
        hasIncidentAccess && items?.create_date
            ? formatDateTime(items.create_date, "dd/MM/yyyy hh:mm:ss a")
            : '',
        [hasIncidentAccess, items?.create_date]
    );

    return (
        <Sheet
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: 20,
                display: 'flex',
                bgcolor: '#f4f6f8',
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative'
            }} >



            <DiscussionSidebar
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
                conversations={finalConversations}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                hasIncidentAccess={hasIncidentAccess}
                onlineUsers={onlineUsers}
                UnReadCount={GetConverStationUnreadCount}
            />



            {
                !openSidebar && (
                    <IconButton
                        onClick={() => setOpenSidebar(true)}
                        sx={{
                            position: 'absolute',
                            top: 60,
                            left: 20,
                            zIndex: 100,
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            bgcolor: '#ffffff',
                            boxShadow: 'md',
                            '&:hover': {
                                bgcolor: '#f5f5f5'
                            }
                        }}>
                        →
                    </IconButton>
                )
            }

            {/* RIGHT PANEL */}

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#f8fafc'
                }}
            >

                {/* CHAT HEADER */}
                <DiscussionMessageHeader
                    isOnline={isOnline}
                    onlineInGroup={onlineInGroup}
                    typingUsers={typingUsers}
                    selectedChat={selectedChat}
                    GroupEmployeees={GroupEmployeees}
                    refetchGroupMembers={refetchGroupMembers}
                    incidentNo={incidentNo}
                    createdDate={createdDate}
                    mode={mode}
                    mobileConnected={mobileConnected}
                    isEmptyMessage={isEmptyMessage}
                />

                {/* MESSAGE AREA */}

                <DiscussionMessages
                    setReplyMessage={setReplyMessage}
                    logggedUserId={empid}
                    messages={finalMessages}
                    typingUsers={typingUsers}
                    onMessageDelete={hanldeDelete}
                    selectedChat={selectedChat}
                    LoadingMessage={isLoadMessage}
                    setEditMessage={setEditMessage}
                    //pagination
                    loadMore={handleLoadMore}
                    hasMore={hasMore}
                    isLoadingMore={isLoadingMore}
                    isEmptyConversation={isEmptyConversation}
                />

                <Divider />

                {/* MESSAGE INPUT */}
                <DiscussionMessageInput
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={handleSendMessage}
                    selectedChat={selectedChat}
                    empid={empid}
                    empname={empname}
                    onEditMessage={handleEditMessage}
                    replymessage={replymessage}
                    setReplyMessage={setReplyMessage}
                    editMessage={editMessage}
                    setEditMessage={setEditMessage}
                    disabled={(!selectedChat?.conversation_id) ||
                        (selectedChat?.is_group_chat === 1 && !IsExitInGroup)}
                />

            </Box>
            {
                mode === "INCIDENT" && hasIncidentAccess &&
                <IconButton
                    color="primary"
                    size="lg"
                    onClick={() => setOpenCreateChat(true)}
                    sx={{
                        position: 'absolute',
                        bottom: 80,
                        right: 5,
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        boxShadow: 'lg',
                        bgcolor: '#d26de9',
                        ":hover": {
                            bgcolor: "#d26de9"
                        }
                    }}
                >
                    <Tooltip arrow title="Start New Chat" color="neutral"
                        placement="top"
                        size="sm"
                        variant="outlined" >
                        <AddCommentRoundedIcon sx={{
                            color: 'white',
                            ':hover': {
                                color: "white"
                            }
                        }} />
                    </Tooltip>
                </IconButton>
            }

            <CreateDiscussionButton
                conversations={finalConversations}
                items={items}
                open={openCreateChat}
                setOpen={setOpenCreateChat}
                chatState={chatState}
                fetchDetail={fetchCurrentEmployeeConversation}
            />
        </Sheet >
    );
};

export default memo(IncidentDiscussionModal);