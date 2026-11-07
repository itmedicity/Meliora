import React, { memo, useEffect, useRef, useState } from "react";
import { Typography } from "@mui/joy";
import DigitRoll from "./DigitRoll";

const SmartRealtimeCounter = ({ value }) => {
    const prevValueRef = useRef(value);
    const [digits, setDigits] = useState(String(value).split("").map(Number)); // value = 520 → digits = [5, 2, 0]

    // This is for also study purpose read and understant : Rohith krishna
    useEffect(() => {
        // 1 Convert the previous value to a string
        //    e.g., prevValueRef.current = 99 → "99"
        //    padStart ensures it has the same length as the current value
        const prevStr = String(prevValueRef.current).padStart(
            String(value).length,
            "0"
        );

        // 2 Convert the current value to a string
        //    e.g., value = 105 → "105"
        //    padStart ensures the strings are the same length
        const currStr = String(value).padStart(prevStr.length, "0");

        // 3 Create an array of objects for each digit
        //    Each object has:
        //      prev → the old digit
        //      new  → the new digit
        //    e.g., "099" → "105" becomes:
        //    [{prev:0,new:1},{prev:9,new:0},{prev:9,new:5}]
        const mappedDigits = currStr.split("").map((d, i) => ({
            prev: Number(prevStr[i]),
            new: Number(d),
        }));

        // 4 Update the state with the new mapped digits
        //    This triggers the component to re-render
        setDigits(mappedDigits);

        // 5 Update the prevValueRef to the current value
        //    So next time the counter updates, we know the previous value
        prevValueRef.current = value;

    }, [value]); //  Run this effect every time the "value" prop changes


    return (
        <Typography
            sx={{
                display: "flex",
                fontSize: 28,
                fontFamily: "Bahnschrift",
                fontWeight: 500,
                mb: 1
            }}
        >
            {digits?.map(({ prev, new: newDigit }, i) => (
                <DigitRoll key={i} prevDigit={prev} newDigit={newDigit} />
            ))}
        </Typography>
    );
};

export default memo(SmartRealtimeCounter);
