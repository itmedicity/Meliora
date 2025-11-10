import { Input } from "@mui/joy";
import React from "react";
import InputMask from "react-input-mask";

const IpMaskInput = ({ value, onChange }) => (
    <InputMask
        mask="999.999.999.999"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maskChar={null}
    >
        {(inputProps) => (
            <Input
                fullWidth
                sx={{ height: "100%", width: "100%" }}
                slotProps={{ input: { ...inputProps } }}
            />
        )}
    </InputMask>
);

export default IpMaskInput;
