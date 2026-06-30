// useConversationRoom.js

import { useEffect } from 'react';
import { ChatSocketService } from '../Services/ChatSocketService';


export const useConversationRoom = (
    selectedChat
) => {

    useEffect(() => {

        if (!selectedChat) {
            return;
        }

        const ids =
            selectedChat?.mergedConversationIds ||
            [selectedChat?.conversation_id];

        ids.forEach(id => {
            ChatSocketService.joinRoom(id);
        });

        return () => {

            ids.forEach(id => {
                ChatSocketService.leaveRoom(id);
            });

        };

    }, [selectedChat?.conversation_id,
    selectedChat?.mergedConversationIds]);

};