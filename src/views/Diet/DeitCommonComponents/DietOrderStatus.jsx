
import { FormControl, Option, Select } from "@mui/joy";
import React from "react";

const DietOrderStatus = ({
    orderStatus,
    orderStatusList,
    setorderStatus,
}) => {
    return (
        <FormControl sx={{ m: 0.5 }}>
            <Select
                value={orderStatus}
                onChange={(event, value) => setorderStatus(Number(value))}
                placeholder="Select Order Status"
            >
                {orderStatusList?.map((item) => (
                    <Option key={item.orderStatusId} value={item.orderStatusId}>
                        {item.label}
                    </Option>
                ))}
            </Select>
        </FormControl>
    );
};

export default DietOrderStatus;