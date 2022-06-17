import 'react-toastify/dist/ReactToastify.css';
import { Flip, toast } from 'react-toastify';


export const succesNotify = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

export const errorNotify = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});

export const warningNotify = (message) => toast.warning(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});
export const infoNotify = (message) => toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: "colored"
});
