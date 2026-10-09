import React from "react";
import 'react-toastify/dist/ReactToastify.css'
import { toast, Bounce } from 'react-toastify'
import ChatNotification from '../IncidentManagement/IncidentDIscussion/Component/ChatNotification'
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Box, Typography } from "@mui/joy";

const DeliveryToast = ({ meal, status }) => {

  const statusConfig = {
    DELIVERED: {
      icon: <CheckCircleRoundedIcon />,
      title: "Delivery Completed",
      color: "#2e7d32",
      bg: "#edf7ed"
    },
    CANCELLED: {
      icon: <CancelRoundedIcon />,
      title: "Delivery Cancelled",
      color: "#d32f2f",
      bg: "#fff1f1"
    },
    RETURNED: {
      icon: <ReplayRoundedIcon />,
      title: "Meal Returned",
      color: "#ed6c02",
      bg: "#fff7ed"
    },
    UNDELIVERED: {
      icon: <ErrorOutlineRoundedIcon />,
      title: "Delivery Unsuccessful",
      color: "#0288d1",
      bg: "#eef8ff"
    }
  };

  const config = statusConfig[status] || {
    icon: <LocalShippingRoundedIcon />,
    title: "Delivery Updated",
    color: "#1976d2",
    bg: "#eef5ff"
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        minWidth: 300,
        p: 1.4,
        borderRadius: "16px",
        background: "#fff",
      }}
    >

      {/* Icon */}
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: config.bg,
          color: config.color,
          flexShrink: 0,

          "& svg": {
            fontSize: 23
          }
        }}
      >
        {config.icon}
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>

        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 800,
            color: "#222",
            lineHeight: 1.2,
            mb: 0.4
          }}
        >
          {config.title}
        </Typography>

        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#555",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {meal || "Meal"}{" "}
          <Box
            component="span"
            sx={{
              color: config.color,
              fontWeight: 800
            }}
          >
            • {status}
          </Box>
        </Typography>

      </Box>

      {/* Delivery icon */}
      <LocalShippingRoundedIcon
        sx={{
          fontSize: 19,
          color: config.color,
          opacity: 0.7
        }}
      />

    </Box>
  );
};

export const deliveryNotify = (meal, status) =>
  toast(
    <DeliveryToast
      meal={meal}
      status={status}
    />,
    {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: true,
      closeButton: false,
      icon: false,
      className: "delivery-toast"
    }
  );

export const succesNotify = message =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    theme: 'light'
  })

export const errorNotify = message =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    theme: 'light'
  })

export const warningNotify = message =>
  toast.warning(message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    theme: 'light'
  })
export const infoNotify = message =>
  toast.info(message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    theme: 'light'
  })


export const confirmNotify = (message = "Are you sure?") => {
  return new Promise((resolve) => {

    toast.warn(
      ({ closeToast }) => (
        <div>

          <div
            style={{
              fontSize: 14,
              marginBottom: 10,
              fontWeight: 500
            }}
          >
            {message}
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end"
            }}
          >

            <button
              onClick={() => {
                closeToast();
                resolve(false); //  cancel
              }}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                closeToast();
                resolve(true); //  confirm
              }}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: 6,
                background: "#d32f2f",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Yes
            </button>

          </div>

        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        transition: Bounce,
        theme: "light"
      }
    );
  });
};

export const chatNotify = (title, message) =>
  toast(
    <ChatNotification
      title={title}
      message={message}
    />,
    {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
      theme: 'light',
      icon: false,
      style: {
        padding: 0,
        background: 'transparent',
        boxShadow: 'none'
      }
    }
  );

