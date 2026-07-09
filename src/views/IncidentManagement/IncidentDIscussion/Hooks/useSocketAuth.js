import { useEffect } from "react";
import { socket } from "src/ws/socket";

export const useSocketAuth = (empid, isSelectedChat = false) => {
    useEffect(() => {
        if (empid) {
            socket.auth = { emp_id: empid };

            if (!socket.connected) {
                socket.connect();
            }
        }
    }, [empid]);

    //  Join/Leave personal room based on chat selection
    useEffect(() => {
        if (empid && isSelectedChat) {
            socket.emit('join-personal-room', empid);
        } else if (empid && !isSelectedChat) {
            socket.emit('leave-personal-room', empid); 
        }
    }, [empid, isSelectedChat]);

    return () => {
        socket.off('connect');
    };
};