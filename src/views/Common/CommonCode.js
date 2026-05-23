import React from "react";
import 'react-toastify/dist/ReactToastify.css'
import { toast, Bounce } from 'react-toastify'

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