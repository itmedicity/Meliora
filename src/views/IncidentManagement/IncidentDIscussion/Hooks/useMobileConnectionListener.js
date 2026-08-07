import { useEffect, useState, useCallback } from 'react';
import { socket } from 'src/ws/socket';

export const useMobileConnectionListener = (empid) => {
    const [mobileConnected, setMobileConnected] = useState(null);

    const clearMobileConnected = useCallback(() => {
        setMobileConnected(null);
    }, []);

    useEffect(() => {
        if (!empid) return;

        socket.emit('desktop-connected', { empid });

        const handleConnect = (data) => {
            if (Number(data.empId) === Number(empid)) {
                setMobileConnected(data);
            }
        };

        const handleDisconnectedByMobile = (data) => {
            if (Number(data.empid) === Number(empid)) {
                setMobileConnected(null);
            }
        };

        socket.on('user-connected-from-mobile', handleConnect);
        socket.on('mobile-connect-disconnected', handleDisconnectedByMobile);

        return () => {
            socket.off('user-connected-from-mobile', handleConnect);
            socket.off('mobile-connect-disconnected', handleDisconnectedByMobile);
        };
    }, [empid]);

    return {
        mobileConnected,
        clearMobileConnected,
    };
};