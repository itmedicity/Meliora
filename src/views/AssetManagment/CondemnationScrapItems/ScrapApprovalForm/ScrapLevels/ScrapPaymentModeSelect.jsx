
import { Option, Select } from "@mui/joy";
import React from "react";

const ScrapPaymentModeSelect = ({ paymentMode, setPaymentMode, }) => {





    return (
        <Select
            size="sm"
            name="paymentMode"
            value={paymentMode || ""}
            onChange={(e, newValue) => {
                setPaymentMode(prev => ({
                    ...prev,
                    paymentMode: newValue,
                }));
            }}
        >
            <Option value="Cash">Cash</Option>
            <Option value="UPI">UPI</Option>
            <Option value="Net Banking">Net Banking</Option>
            <Option value="Cheque">Cheque</Option>
        </Select>
    );
};

export default ScrapPaymentModeSelect;





