// useOnlineStatus.js

import { useEffect } from 'react';
import { ChatSocketService } from '../Services/ChatSocketService';


export const useOnlineStatus = (empid) => {

    useEffect(() => {

        if (!empid) return;

        ChatSocketService.setOnline(empid);

        // Cleanup: Modal closed - mark as offline
        return () => {
            ChatSocketService.setOffline(empid);
        };

    }, [empid]);

};