import { FormControl, Option, Select } from "@mui/joy";
import React from "react";

const DeitMastComponent = ({ setDietType, dietType, dietTypes }) => {

    return (
        <FormControl sx={{ m: 0.5 }}>
            <Select
                value={dietType}
                onChange={(event, value) => setDietType(Number(value))}
                placeholder="Select diet type"
            >
                {dietTypes?.map((item) => (
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                ))}
            </Select>
        </FormControl>
    );
};

export default DeitMastComponent;





