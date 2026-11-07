import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();
const STORAGE_KEY = "APP_NOTIFICATIONS";

export const NotificationProvider = ({ children }) => {
    // Load from localStorage
    const [notifications, setNotifications] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // Persist on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    }, [notifications]);

    // Add new notification (prevent duplicates)
    const addNotification = (notification) => {
        setNotifications(prev => {
            const exists = prev.some(n => n.id === notification.id);
            if (exists) return prev;
            return [notification, ...prev];
        });
    };

    // Remove one (click)
    const markAsRead = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Remove all by type (route-based)
    const removeByType = (type) => {
        setNotifications(prev => prev.filter(n => n.type !== type));
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                markAsRead,
                removeByType,
                markAllAsRead
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
