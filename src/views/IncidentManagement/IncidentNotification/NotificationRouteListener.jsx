import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNotifications } from "./NotificationContext";

const NotificationRouteListener = () => {
  const location = useLocation();
  const { removeByType } = useNotifications();

  useEffect(() => {
    if (location.pathname === "/Home/Departmentdatacollection") {
      removeByType("DATA_COLLECTION");
    }
    if (location.pathname === "/Home/Incidentaction") {
      removeByType("ACTION_REQUEST");
    }

  }, [location.pathname]);

  return null;
};

export default NotificationRouteListener;
