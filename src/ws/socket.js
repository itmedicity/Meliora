
import { io } from "socket.io-client";
import { API_URL } from "../views/Constant/Static";

// Detect environment and set correct backend URL
// const URL = "http://192.168.10.88:7070";
// Same host/port as the REST API (strip the trailing /api)
const URL = API_URL.replace(/\/api\/?$/, "");

// process.env.NODE_ENV === "development"
//     ? "http://192.168.10.88:7070"  //  backend IP + port
//     : undefined;

// Always use websocket transport for stability
export const socket = io(URL, {
    transports: ["websocket"],
    auth: {
        emp_id: null  //  Add this
    }
});
