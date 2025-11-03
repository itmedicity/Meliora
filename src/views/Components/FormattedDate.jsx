import React, { memo } from "react";
import { format } from "date-fns";

const FormattedDate = ({ date, formatString = "dd MMM yyyy, hh:mm a" }) => {
    if (!date) return <span>Invalid Date</span>;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return <span>Invalid Date</span>;

    return <span>{format(parsedDate, formatString)}</span>;
};

export default memo(FormattedDate);
