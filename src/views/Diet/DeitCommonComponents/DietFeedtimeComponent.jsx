import { FormControl, Option, Select } from "@mui/joy";
import React from "react";

const DietFeedtimeComponent = ({ feedingTime, eatingTimes, setfeedingTime }) => {
    return (
        <FormControl sx={{ m: 0.5 }}>
            <Select
                value={feedingTime}
                onChange={(event, value) => setfeedingTime(Number(value))}
                placeholder="Select Feeding time"
            >
                {eatingTimes?.map((item) => (
                    <Option key={item.feedTimeId} value={item.feedTimeId}>
                        {item.name} ({item.from} - {item.to})
                    </Option>
                ))}
            </Select>
        </FormControl>
    );
};

export default DietFeedtimeComponent;
