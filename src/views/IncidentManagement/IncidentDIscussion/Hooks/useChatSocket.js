import { useEffect, useState } from 'react';
import { socket } from 'src/ws/socket';

export const useChatSocket = ({
    empid,
    onNewMessage,
    onNewMember,
    onParticipantRemoved,
    onNewNotification
}) => {

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState({});

    useEffect(() => {

        socket.on(
            'online-users',
            setOnlineUsers
        );

        socket.on(
            'new-message',
            onNewMessage
        );

        socket.on(
            'new-member',
            onNewMember
        );

        socket.on(
            'ParticipantRemoved',
            onParticipantRemoved
        );
        socket.on(
            'new-notification',
            onNewNotification
        );

        socket.on(
            'user-typing',
            (data) => {

                if (
                    Number(data.sender_emp_id) ===
                    Number(empid)
                ) {
                    return;
                }

                setTypingUsers(prev => ({
                    ...prev,
                    [data.sender_emp_id]:
                        data.sender_name
                }));

            }
        );

        socket.on(
            'user-stop-typing',
            (data) => {

                setTypingUsers(prev => {

                    const updated = {
                        ...prev
                    };

                    delete updated[
                        data.sender_emp_id
                    ];

                    return updated;

                });

            }
        );

        return () => {

            socket.off('online-users');

            socket.off(
                'new-message',
                onNewMessage
            );

            socket.off(
                'new-member',
                onNewMember
            );

            socket.off(
                'new-notification',
                onNewNotification
            );

            socket.off(
                'ParticipantRemoved',
                onParticipantRemoved
            );

            socket.off('user-typing');

            socket.off('user-stop-typing');
        };

    }, [
        empid,
        onNewMessage,
        onNewMember,
        onParticipantRemoved,
        onNewNotification
    ]);

    return {
        onlineUsers,
        typingUsers
    };

};