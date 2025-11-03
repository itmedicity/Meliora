
import { FormHelperText, Input } from "@mui/joy";
import React, { useCallback } from 'react'

const ContactNumberInput = ({ value, onChange }) => {
    // Custom handler: only digits allowed
    const handleChange = useCallback(
        (e) => {
            let val = e.target.value.replace(/\D/g, ""); // digits only
            onChange({ target: { name: "contact_no", value: val } });
        },
        [onChange]
    );

    return (
        <>
            <Input
                placeholder="Enter contact number"
                type="text"
                name="contact_no"
                value={value}
                onChange={handleChange}
                inputProps={{ maxLength: 11 }} // let them go 1 extra so error shows
                color={value.length > 10 ? 'danger' : 'primary'}
                style={{
                    color: value.length > 10 ? "darkred" : "inherit",
                }}
            />

            {value.length > 10 && (
                <FormHelperText sx={{ color: "darkred", display: "flex", alignItems: "center" }}>
                    Oops! Contact number cannot exceed 10 digits.
                </FormHelperText>
            )}
        </>
    );
};

export default ContactNumberInput;
