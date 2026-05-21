//@not Using 
import React, { memo, useEffect, useState } from "react";
import { Typography } from "@mui/joy";

const NumberCounter = ({ target = 200, duration = 1500 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target, duration]);

    return (

        <Typography
            sx={{
                fontSize: 28,
                fontWeight: 500,
                color: 'black',
                fontFamily: 'Bahnschrift',
                whiteSpace: 'nowrap',
                textAlign: 'center'
            }}
        >
            {count}
        </Typography>
    );
};

export default memo(NumberCounter);
