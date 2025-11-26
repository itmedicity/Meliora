import React from "react";
import { Box, Button, Input } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import { taskColor } from "src/color/Color";

const FloatingSearch = ({ value, setValue }) => {
    const isOpen = value !== "";

    return (
        <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 20 }}>
            {/* If search is empty → show round button */}
            {!isOpen ? (
                <Box
                    onClick={() => setValue(" ")} // open input
                    sx={{
                        width: 45,
                        height: 45,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        bgcolor: taskColor.purple,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    }}
                >
                    <SearchIcon sx={{ color: 'white' }} />
                </Box>
            ) : (
                // Expanded Search Input
                <Input
                    autoFocus
                    value={value.trimStart()}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search..."
                    sx={{
                        width: 260,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                        transition: "width .2s",
                        bgcolor: "white"
                    }}
                    endDecorator={
                        <Button
                            onClick={() => setValue("")}
                            variant="soft"
                            color="danger"
                        >
                            Clear
                        </Button>
                    }
                />
            )}
        </Box>
    );
};

export default FloatingSearch;
