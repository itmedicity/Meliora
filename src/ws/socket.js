
import { io } from "socket.io-client";

// Detect environment and set correct backend URL
const URL = "http://192.168.10.88:7070";
// const URL = "http://192.168.22.5:7000";

// process.env.NODE_ENV === "development"
//     ? "http://192.168.10.88:7070"  //  backend IP + port
//     : undefined;

// Always use websocket transport for stability
export const socket = io(URL, {
    transports: ["websocket"],
});
