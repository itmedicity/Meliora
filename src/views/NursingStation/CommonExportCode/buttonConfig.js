import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import RamenDiningIcon from '@mui/icons-material/RamenDining'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import TimerIcon from '@mui/icons-material/Timer'
import TimelapseIcon from '@mui/icons-material/Timelapse'

// pass taskColor from component (recommended)
export const getButtonConfig = (taskColor, dietIconRef) => [
    {
        key: "allList",
        title: "All List",
        icon: <DashboardIcon fontSize="small" />,
        color: taskColor.purple
    },
    {
        key: "notMarked",
        title: "Not Marked",
        icon: <DoNotDisturbIcon fontSize="small" />,
        color: "darkred"
    },
    {
        key: "dietType",
        title: "Diet Type",
        icon: <RamenDiningIcon fontSize="small" />,
        color: "#8E3801",
        ref: dietIconRef,
        toggle: true
    },
    {
        key: "findPatient",
        title: "Find Patient",
        icon: <PersonIcon fontSize="small" />,
        color: "blue"
    },
    {
        key: "orderStatus",
        title: "Order Status",
        icon: <ShoppingBagIcon fontSize="small" />,
        color: "brown"
    },
    {
        key: "notUnderDiet",
        title: "Not Under Diet",
        icon: <DoNotDisturbOnIcon fontSize="small" />,
        color: "black"
    },
    {
        key: "foodTime",
        title: "Food Time",
        icon: <NotificationsActiveIcon fontSize="small" />,
        color: "#BC922D"
    },
    {
        key: "deliveredOnTime",
        title: "Delivered On Time",
        icon: <TimerIcon fontSize="small" />,
        color: "green"
    },
    {
        key: "deliveryDelayed",
        title: "Delivery Delayed",
        icon: <TimelapseIcon fontSize="small" />,
        color: "red"
    }
]