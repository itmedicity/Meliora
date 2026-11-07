import React, { memo, useState } from "react";
import {
    Box,
    Input,
    Typography,
    Button
} from "@mui/joy";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { axioslogin } from "src/views/Axios/Axios";
import EmployeeSuggestion from "./EmployeeSuggestion";
import EmployeeCard from "./EmployeeCard";

const EmployeeSearch = () => {

    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // 
    // SEARCH API
    // 

    const handlereset = () => {
        setEmployees([]);
        setSelectedEmployee(null);
        setHasSearched(false);
    }

    const handleSearch = async () => {

        const value = search.trim();

        if (!value) {
            setEmployees([]);
            setSelectedEmployee(null);
            setHasSearched(false);
            return;
        }

        try {

            setLoading(true);
            setHasSearched(true);

            const response = await axioslogin.get(
                `/employee/search?search=${encodeURIComponent(value)}`
            );

            const data = response?.data;

            if (data?.success === 2) {
                setEmployees(data?.data || []);
            } else {
                setEmployees([]);
            }

            setSelectedEmployee(null);

        } catch (error) {

            console.error(
                "Employee Search Error:",
                error
            );

            setEmployees([]);

        } finally {

            setLoading(false);

        }
    };

    // 
    // ENTER SEARCH
    // 

    const handleKeyDown = (event) => {

        if (event.key === "Enter") {
            handleSearch();
        }

    };

    // 
    // SELECT EMPLOYEE
    // 

    const handleSelectEmployee = (employee) => {

        setSelectedEmployee(employee);

        setSearch(employee.employee_name);

        setEmployees([]);

    };

    // 
    // CLEAR
    // 

    const handleClear = () => {

        setSearch("");
        setEmployees([]);
        setSelectedEmployee(null);

    };

    return (
        <Box
            sx={{
                width: "100%",
                border: "1px solid #e3d9eb",
                borderRadius: "14px",
                bgcolor: "#fff",
                p: 1.5,
                boxShadow: "0 3px 12px rgba(80, 40, 100, 0.05)",
                mt: 2,
                position: "relative"
            }}
        >

            {/* 
                SEARCH BAR
             */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    height: 46,
                    px: 1,
                    pl: 1.5,
                    borderRadius: "10px",
                    border: "1px solid #d9cbe3",
                    bgcolor: "#fcfaff",
                    transition: "0.2s",

                    "&:focus-within": {
                        borderColor: "#7c51a1",
                        boxShadow:
                            "0 0 0 3px rgba(124,81,161,0.08)"
                    }
                }}
            >

                <SearchIcon
                    sx={{
                        fontSize: 21,
                        color: "#7c51a1"
                    }}
                />

                <Input
                    variant="plain"
                    placeholder="Search employee ID or name..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setSelectedEmployee(null);
                        setEmployees([]);
                        setHasSearched(false);
                    }}
                    onKeyDown={handleKeyDown}
                    sx={{
                        flex: 1,
                        minWidth: 0,

                        "--Input-focusedThickness": "0px",
                        "--Input-focusedHighlight": "transparent",

                        "&:focus-within": {
                            outline: "none",
                            boxShadow: "none",
                            border: "none"
                        },

                        "& input": {
                            fontSize: 14,
                            fontWeight: 500,
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                            backgroundColor: "transparent"
                        },

                        "& input:focus": {
                            outline: "none",
                            border: "none",
                            boxShadow: "none"
                        },

                        "& input::placeholder": {
                            color: "#9a909f",
                            opacity: 1
                        }
                    }}
                />

                {/* CLEAR */}

                {search && (
                    <Button
                        variant="plain"
                        onClick={handleClear}
                        sx={{
                            minWidth: 30,
                            width: 30,
                            height: 30,
                            p: 0,
                            borderRadius: "7px",
                            color: "#999",

                            "&:hover": {
                                bgcolor: "#eee8f2",
                                color: "#555"
                            }
                        }}
                    >
                        <CloseIcon
                            sx={{
                                fontSize: 17
                            }}
                        />
                    </Button>
                )}

                {/* SEARCH BUTTON */}

                <Button
                    onClick={handleSearch}
                    loading={loading}
                    startDecorator={
                        !loading && (
                            <SearchIcon
                                sx={{
                                    fontSize: 18
                                }}
                            />
                        )
                    }
                    sx={{
                        height: 36,
                        px: 2,
                        borderRadius: "8px",
                        bgcolor: "#7c51a1",
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 600,
                        boxShadow:
                            "0 2px 5px rgba(124,81,161,0.18)",

                        "&:hover": {
                            bgcolor: "#684286"
                        }
                    }}
                >
                    Search
                </Button>

            </Box>


            {/* 
                SEARCH RESULTS
             */}

            {employees.length > 0 && (

                <Box
                    sx={{
                        mt: 1,
                        border: "1px solid #e8dff0",
                        borderRadius: "11px",
                        overflow: "hidden",
                        bgcolor: "#fff",
                        boxShadow:
                            "0 5px 16px rgba(50,30,70,0.07)",
                        maxHeight: 260,
                        overflowY: "auto",

                        "&::-webkit-scrollbar": {
                            width: 5
                        },

                        "&::-webkit-scrollbar-thumb": {
                            background: "#d6c5df",
                            borderRadius: 10
                        }
                    }}>


                    {/* RESULTS */}

                    {
                        employees?.length > 0 && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "calc(100% - 6px)",
                                    left: 12,
                                    right: 12,
                                    zIndex: 1000,
                                    border: "1px solid #e8dff0",
                                    borderRadius: "11px",
                                    overflow: "hidden",
                                    bgcolor: "#fff",
                                    boxShadow:
                                        "0 8px 24px rgba(50, 30, 70, 0.14)",
                                    maxHeight: 460,
                                    overflowY: "auto",
                                    "&::-webkit-scrollbar": {
                                        width: 5
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        background: "#d6c5df",
                                        borderRadius: 10
                                    }
                                }} >


                                {employees?.map((employee, index) => (
                                    <EmployeeSuggestion
                                        key={employee?.employee_id}
                                        employee={employee}
                                        onSelect={handleSelectEmployee}
                                        isLast={index === employees.length - 1}
                                    />
                                ))}

                            </Box>
                        )}

                </Box>

            )}


            {/* 
                NO RESULT
             */}

            {hasSearched &&
                !loading &&
                employees.length === 0 &&
                !selectedEmployee && (

                    <Box
                        sx={{
                            mt: 1,
                            py: 2,
                            textAlign: "center",
                            borderRadius: "9px",
                            bgcolor: "#faf8fc"
                        }}
                    >

                        <SearchIcon
                            sx={{
                                fontSize: 25,
                                color: "#c2b5c9",
                                mb: 0.5
                            }}
                        />

                        <Typography
                            level="body-sm"
                            sx={{
                                color: "#888"
                            }}
                        >
                            No employee found
                        </Typography>

                        <Typography
                            level="body-xs"
                            sx={{
                                color: "#aaa",
                                mt: 0.2
                            }}
                        >
                            Try another employee ID or name
                        </Typography>

                    </Box>
                )}

            {/*  SELECTED EMPLOYEE */}
            {selectedEmployee && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 65,
                        left: 0,
                        mt: 1.5,
                        border: "1px solid #e5dce9",
                        borderRadius: "10px",
                        bgcolor: "#6b097a",
                        display: "flex",
                        width: "100%",
                        boxSizing: "border-box",
                        zIndex: 9999
                    }}
                >


                    <EmployeeCard onfinish={handlereset} employee={selectedEmployee} />

                </Box>
            )}
        </Box>
    );
};



export default memo(EmployeeSearch);