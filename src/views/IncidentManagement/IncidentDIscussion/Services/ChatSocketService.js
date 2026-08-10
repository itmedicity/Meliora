import { socket } from 'src/ws/socket';

export const ChatSocketService = {

    joinRoom(conversationId) {
        socket.emit(
            'join-room',
            `conv_${conversationId}`
        );
    },

    leaveRoom(conversationId) {
        socket.emit(
            'leave-room',
            `conv_${conversationId}`
        );
    },

    setOnline(empid) {
        socket.emit(
            'user-online',
            empid
        );
    },

    setOffline(empid) {
        socket.emit(
            'user-offline',
            empid
        );
    },

    sendTyping(data) {
        socket.emit(
            'typing',
            data
        );
    },

    stopTyping(data) {
        socket.emit(
            'stop-typing',
            data
        );
    }

};