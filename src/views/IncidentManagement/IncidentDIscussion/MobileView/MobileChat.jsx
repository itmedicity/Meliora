import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import {
    Box,
    IconButton,
    Sheet
} from '@mui/joy';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
    useConverstionMessages,
    useExternalConversationMessage,
    useGroupEmployees
} from '../../CommonComponent/useQuery';
import { useSelector } from 'react-redux';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import MobileDiscussionMessageHeader from './MobileDiscussionMessageHeader';
import MobileDiscussionMessageInput from './MobileDiscussionMessageInput';
import MobileDiscussionMessages from './MobileDiscussionMessages';
import { useChatSocket } from '../Hooks/useChatSocket';
import { useOnlineStatus } from '../Hooks/useOnlineStatus';
import IncidentTextComponent from '../../Components/IncidentTextComponent';
import { socket } from 'src/ws/socket';
import { useSocketAuth } from '../Hooks/useSocketAuth';
import { formatName } from '../../CommonComponent/CommonCode';

const MobileChat = () => {

    const location = useLocation();

    const queryClient = useQueryClient();

    //  Extract ALL params from URL
    const params = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        let mergedIdArray = [];
        const mergedIdValue = searchParams.get('MergedId');
        //  If it's already an array, use it
        if (Array.isArray(mergedIdValue)) {
            mergedIdArray = mergedIdValue;
        }
        //  If it's a string (single value like "13"), convert to array
        else if (mergedIdValue && typeof mergedIdValue === 'string' && mergedIdValue.trim() !== '') {
            try {
                const parsed = JSON.parse(mergedIdValue);
                mergedIdArray = Array.isArray(parsed) ? parsed : [parsed];  //  ["13"] -> ["13"] or [13] -> [13]
            } catch (error) {
                //  Not JSON, treat as single value
                mergedIdArray = [mergedIdValue.trim()];  //  "13" -> ["13"]
            }
        }
        return {
            accessToken: searchParams.get('access_token'),
            employeeId: searchParams.get('employee_id'),
            SingleId: searchParams.get('SingleId'),
            MergedId: mergedIdArray,
            GroupChat: searchParams.get('group_chat'),
            incidentNo: searchParams.get('incidentNo'),
            chatTitle: searchParams.get('chat_title'),
            mode: searchParams.get('mode') || 'INCIDENT'
        };
    }, [location.search]);
    //  Save token
    useEffect(() => {
        if (params.accessToken) {
            sessionStorage.setItem('access_token', params.accessToken);
        }
    }, [params.accessToken]);

    //  Get empid
    const { empid: reduxEmpid, empname } = useSelector(state => state.LoginUserData);
    const empid = reduxEmpid || params.employeeId;

    //  Incident access
    const hasIncidentAccess = !(params.mode === 'EXTERNAL');

    //  selectedChat
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [replymessage, setReplyMessage] = useState({});
    const [editMessage, setEditMessage] = useState(null);


    useEffect(() => {
        const mergedIdArray = params.MergedId || [];

        if (params.SingleId || mergedIdArray.length > 0) {
            const chatData = {
                conversation_id: params.SingleId,
                mergedConversationIds: mergedIdArray,
                is_group_chat: params.GroupChat === '1' ? 1 : 0,
                title: params.chatTitle || '',
                participant_ids: params.SingleId ? params.SingleId : ''
            };
            setSelectedChat(chatData);
        }
    }, [params.SingleId, params.MergedId, params.GroupChat, params.chatTitle]);



    //  Query Keys
    const mergedKey = useMemo(() => {
        return JSON.stringify(params.MergedId || []);
    }, [params.MergedId]);

    const myMessageQueryKey = useMemo(() =>
        ['employeemessage', empid, Number(params.SingleId)],
        [empid, params.SingleId]
    );

    const externalMessageQueryKey = useMemo(() =>
        ['externalMessage', empid, mergedKey],
        [empid, mergedKey]
    );

    const activeMessageQueryKey = hasIncidentAccess
        ? myMessageQueryKey
        : externalMessageQueryKey;

    //  Fetch Messages - FIXED!  No JSON.parse here
    const {
        data: myMessageData,
        isLoading: loadingMessageData,
        fetchNextPage: fetchMyNextPage,
        hasNextPage: hasMyNextPage,
        isFetchingNextPage: isMyFetchingNextPage
    } = useConverstionMessages(
        Number(params.SingleId),
        empid
    );

    const {
        data: externalMessageData,
        isLoading: loadingExteranlMessageData,
        fetchNextPage: fetchExternalNextPage,
        hasNextPage: hasExternalNextPage,
        isFetchingNextPage: isExternalFetchingNextPage
    } = useExternalConversationMessage(
        params.MergedId || [], //  Already array!
        empid
    );


    //  Load More
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
        hasIncidentAccess, hasMyNextPage, isMyFetchingNextPage, fetchMyNextPage,
        hasExternalNextPage, isExternalFetchingNextPage, fetchExternalNextPage
    ]);

    const hasMore = hasIncidentAccess ? hasMyNextPage : hasExternalNextPage;
    const isLoadingMore = hasIncidentAccess ? isMyFetchingNextPage : isExternalFetchingNextPage;
    //  Check if data exists instead of just isLoading
    const isLoadMessage = hasIncidentAccess
        ? loadingMessageData
        : (loadingExteranlMessageData && !externalMessageData);  //  Only loading if no data

    //  Group Members
    const { data: GroupEmployeees, refetch: refetchGroupMembers } = useGroupEmployees(
        params.SingleId,
        Number(params.GroupChat)
    );

    const IsExitInGroup = useMemo(() =>
        GroupEmployeees?.some(emp => Number(emp.em_id) === Number(empid)),
        [GroupEmployeees, empid]
    );

    useOnlineStatus(empid);
    useSocketAuth(empid, true);

    //  Messages
    // Messages - Handle both paginated and direct array
    const finalMessages = useMemo(() => {
        if (hasIncidentAccess) {
            // Incident uses paginated data (pages[])
            return myMessageData?.pages?.flatMap(page => page ?? []) ?? [];
        }
        // External uses direct array (data[])
        if (Array.isArray(externalMessageData)) {
            return externalMessageData;
        }
        // Fallback for paginated external
        return externalMessageData?.pages?.flatMap(page => page ?? []) ?? [];
    }, [hasIncidentAccess, myMessageData, externalMessageData]);

    //  Socket
    const handleNewMessage = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: activeMessageQueryKey });
    }, [queryClient, activeMessageQueryKey]);

    const handleParticipantRemoved = useCallback((data) => {
        if (Number(data.EmployeeId) === Number(empid)) {
            warningNotify("You have been removed from this conversation");
            refetchGroupMembers();
        }
    }, [empid, refetchGroupMembers]);

    const handleNewMember = useCallback((data) => {
        if (data.EmployeeIds?.includes(Number(empid))) {
            succesNotify("You have been added to a conversation");
            refetchGroupMembers();
        }
    }, [empid, refetchGroupMembers]);

    const { onlineUsers, typingUsers } = useChatSocket({
        empid,
        onNewMessage: handleNewMessage,
        onParticipantRemoved: handleParticipantRemoved,
        onNewMember: handleNewMember
    });

    //  Online Status
    const Participants = useMemo(() =>
        selectedChat?.participant_ids
            ? selectedChat.participant_ids.split(',').map(Number)
            : [],
        [selectedChat?.participant_ids]
    );

    const isOnline = useMemo(() =>
        Participants.some(id => onlineUsers?.includes(id)),
        [Participants, onlineUsers]
    );

    const onlineInGroup = useMemo(() =>
        onlineUsers?.filter(user => Participants.includes(user)),
        [onlineUsers, Participants]
    );

    //  Send Message
    const handleSendMessage = useCallback(async (messageData = {}) => {
        try {
            if (!params.SingleId) return warningNotify('Please select a conversation');
            const trimmedMessage = messageData?.message?.trim() || '';
            const messageAttachments = messageData?.attachments || [];

            if (!trimmedMessage && messageAttachments.length === 0) return warningNotify('Message or attachment required');

            let uploadedAttachments = [];

            if (messageAttachments?.length > 0) {
                const uploadFormData = new FormData();
                uploadFormData.append('incident_id', params.incidentNo);
                uploadFormData.append('entity_id', '');
                uploadFormData.append('conversation_id', selectedChat?.conversation_id);
                uploadFormData.append('emp_id', empid);
                uploadFormData.append('keptFiles', JSON.stringify([]));

                messageAttachments.forEach(file => {
                    uploadFormData.append('files', file);
                });

                const uploadResponse = await axioslogin.post(
                    '/incidentMaster/uploadchatconv',
                    uploadFormData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );

                const { success: uploadSuccess, files = [] } = uploadResponse?.data || {};
                if (uploadSuccess !== 1) return warningNotify('File upload failed');
                uploadedAttachments = files;
            }

            let messageType = 'TEXT';
            if (uploadedAttachments.length > 0) {
                const firstFile = uploadedAttachments?.[0];
                if (firstFile?.mime_type?.startsWith('image/')) messageType = 'IMAGE';
                else if (firstFile?.mime_type?.startsWith('video/')) messageType = 'VIDEO';
                else if (firstFile?.mime_type === 'application/pdf') messageType = 'PDF';
                else messageType = 'FILE';
            }

            const payload = {
                conversation_id: selectedChat?.conversation_id,
                sender_emp_id: empid,
                sender_name: formatName(selectedChat?.title) || '',
                message_type: messageType,
                message: trimmedMessage,
                attachments: uploadedAttachments,
                reply_to_message_id: replymessage?.message_id
            };

            const response = await axioslogin.post('/incidentMaster/send-message', payload);
            const { success, message } = response?.data || {};
            if (success !== 1) return warningNotify(message || 'Failed to send message');

            setMessage('');
            setReplyMessage({});
            // queryClient.invalidateQueries({ queryKey: activeMessageQueryKey });

            queryClient.invalidateQueries({ queryKey: myMessageQueryKey });
            queryClient.invalidateQueries({ queryKey: externalMessageQueryKey });
        } catch (error) {
            console.error(error);
            errorNotify('Error sending message');
        }
    }, [
        params.SingleId, params.incidentNo, selectedChat, empid, empname,
        replymessage?.message_id, myMessageQueryKey, queryClient, externalMessageQueryKey
    ]);

    //  Edit & Delete
    const handleEditMessage = useCallback(async (messageId, messageData = {}) => {
        try {
            if (!messageId) return warningNotify('Message ID missing');
            const trimmedMessage = messageData?.message?.trim() || '';
            if (!trimmedMessage) return warningNotify('Message cannot be empty');

            const payload = { message: trimmedMessage, message_id: messageId };
            const response = await axioslogin.post('/incidentMaster/edit-messages', payload);
            const { success, message } = response?.data || {};

            if (success !== 1) return warningNotify(message || 'Failed to update message');

            setEditMessage({});
            setMessage('');
            queryClient.invalidateQueries({ queryKey: activeMessageQueryKey });
        } catch (error) {
            console.error(error);
            errorNotify('Error updating message');
        }
    }, [activeMessageQueryKey, queryClient]);

    const hanldeDelete = useCallback(async (msg) => {
        try {
            if (!msg?.message_id) return warningNotify('Message ID missing');
            const response = await axioslogin.get(`/incidentMaster/delete-messages/${msg?.message_id}`);
            const { success, message } = response?.data || {};
            if (success !== 1) return warningNotify(message || 'Failed to Delete message');

            queryClient.invalidateQueries({ queryKey: myMessageQueryKey });
            queryClient.invalidateQueries({ queryKey: externalMessageQueryKey });
        } catch (error) {
            console.error(error);
            errorNotify('Error deleting message');
        }
    }, [myMessageQueryKey, externalMessageQueryKey, queryClient]);

    const incidentNo = useMemo(() => params.incidentNo || '', [params.incidentNo]);
    const createdDate = useMemo(() => '', []);


    // Add this useEffect
    useEffect(() => {
        //  Only if QR was scanned (has accessToken)
        if (params.accessToken) {
            // Wait for socket to connect first
            if (socket.connected) {
                // Send connected event to server
                socket.emit('user-connected', {
                    empid: empid,
                    title: params.chatTitle
                });
            } else {
                // Wait for socket to connect
                socket.once('connect', () => {
                    socket.emit('user-connected', {
                        empid: empid,
                        title: params.chatTitle
                    });
                });
            }
        }
    }, [params.accessToken, empid, params.chatTitle]);

    const handleClose = useCallback(() => {
        socket.emit('mobile-connect-disconnected', {
            empid,
            title: params.chatTitle,
        });

        window.close();
    }, [empid, params.chatTitle]);


    useEffect(() => {
        if (params.accessToken) {
            document.cookie = `accessToken=${params.accessToken}; path=/; SameSite=Lax`;
            sessionStorage.setItem('access_token', params.accessToken);
        }
    }, [params.accessToken]);

    return (
        <Sheet
            sx={{
                height: '90vh', // important
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            {/* HEADER - Fixed height */}
            <Box
                sx={{
                    px: 1,
                    py: 0.8,
                    bgcolor: '#ffffff',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0  //  Don't shrink
                }}
            >
                <IncidentTextComponent text="DISCUSSIONS" color="#74359c" size={14} weight={700} />
                <IconButton size="sm"
                    variant="soft"
                    color="neutral"
                    onClick={handleClose}
                    sx={{ borderRadius: 8 }}>
                    <CloseRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
            </Box>

            <MobileDiscussionMessageHeader
                isOnline={isOnline}
                onlineInGroup={onlineInGroup}
                typingUsers={typingUsers}
                selectedChat={selectedChat}
                GroupEmployeees={GroupEmployeees}
                refetchGroupMembers={refetchGroupMembers}
                incidentNo={incidentNo}
                createdDate={createdDate}
                mode={params.mode}
            />



            <MobileDiscussionMessages
                setReplyMessage={setReplyMessage}
                logggedUserId={empid}
                messages={finalMessages}
                typingUsers={typingUsers}
                onMessageDelete={hanldeDelete}
                selectedChat={selectedChat}
                LoadingMessage={isLoadMessage}
                setEditMessage={setEditMessage}
                loadMore={handleLoadMore}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
            />


            <Box
                sx={{
                    flexShrink: 0,  //  Always stay at bottom, don't shrink
                    zIndex: 10
                }}
            >
                <MobileDiscussionMessageInput
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={handleSendMessage}
                    selectedChat={selectedChat}
                    empid={empid}
                    emp={empname}
                    onEditMessage={handleEditMessage}
                    replymessage={replymessage}
                    setReplyMessage={setReplyMessage}
                    editMessage={editMessage}
                    setEditMessage={setEditMessage}
                    disabled={params?.GroupChat === 1 && !IsExitInGroup}
                />
            </Box>
        </Sheet >
    );
};

export default memo(MobileChat);