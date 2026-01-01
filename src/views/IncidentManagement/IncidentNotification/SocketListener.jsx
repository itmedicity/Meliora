import { useEffect } from "react";
import { socket } from "src/ws/socket";
import { useNotifications } from "./NotificationContext";
import { playNotificationSound } from "./notificationSound";
import { useSelector } from "react-redux";

const SocketListener = () => {
    const { addNotification } = useNotifications();
    // Department and Department Section of Loggin User
    const { empid, empdept } = useSelector((state) => {
        return state.LoginUserData
    })

    useEffect(() => {
        const handler = (data) => {
            const requestEmpId = data?.requestdetail?.[0]?.inc_req_collect_emp;
            const IncidentSlno = data?.Incident_slno;

            // FILTER: show notification only for that employee
            if (Number(requestEmpId) !== Number(empid)) {
                return; //  not for this user → ignore
            }

            addNotification({
                id: data.inc_data_collection_slno || Date.now(),
                incidentNo: IncidentSlno,
                type: "DATA_COLLECTION",
                title: "New Data Collection Request",
                path: "/Home/Departmentdatacollection",
                message: `Requested by ${data.requestdetail?.[0]?.Requested_user}`,
                payload: data,
                read: false,
                createdAt: data.createdAt
            });

            //  PLAY SOUND WHEN DATA ARRIVES
            playNotificationSound();
        };

        socket.on("new_data_collection_request", handler);

        return () => {
            socket.off("new_data_collection_request", handler);
        };
    }, []);

    useEffect(() => {
        const handler = (data) => {

            const IncidentSlno = data?.inc_register_slno;
            const requestedDep = data?.actionDetail?.[0]?.inc_action_collect_dep;
            const acitonSlno = data?.actionDetail?.[0]?.inc_dep_action_detail_slno;

            // only visible to the deparment with Rights
            if (Number(empdept) !== Number(requestedDep)) {
                return; //  not for this user → ignore
            }

            addNotification({
                id: acitonSlno || Date.now(),
                incidentNo: IncidentSlno,
                type: "ACTION_REQUEST",
                title: "New Action Request",
                path: "/Home/Incidentaction",
                message: `Requested by ${data.actionDetail?.[0]?.requested_employee}`,
                payload: data,
                read: false,
                createdAt: data.createdAt
            });

            //  PLAY SOUND WHEN DATA ARRIVES
            playNotificationSound();
        };

        socket.on("new_action_requested", handler);

        return () => {
            socket.off("new_action_requested", handler);
        };
    }, []);

    return null;
};

export default SocketListener;
