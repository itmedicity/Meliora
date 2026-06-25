
import React, { memo } from "react";
import { Input, Button, Box } from "@mui/joy";

const AbhaPatientSearch = ({ value, onChange, onClick, placeholder }) => {

    return (
        <Box>
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Button
                    onClick={onClick}
                    size="md"
                    sx={{
                        width: "100%",
                        maxWidth: { xs: "140px", sm: "160px", md: "180px" },
                        borderRadius: "55px",
                        fontWeight: 600,
                        backgroundColor: "#916EB1",
                        "&:hover": { backgroundColor: "#7f5ca0" },
                    }}
                >
                    Search
                </Button>
            </Box>
        </Box>
    )
}
export default memo(AbhaPatientSearch)






