// NEW
import React, { useState, memo } from 'react';
import { Box } from "@mui/joy";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BiFoodMenu } from "react-icons/bi";
import DietWiseProcessing from './DietWiseProcessing';
// import DietNewOrderList from './DietNewOrderList';

const DietProcessing = () => {
    const [value, setValue] = useState("1");

    return (
        <>
            <Box className="h-dvh p-2">
                <Box
                    className="flex flex-col rounded-xl p-1 w-full"
                    sx={{
                        backgroundColor: "white",
                        height: "calc(100% - 50px)",
                        border: 0.03,
                        borderColor: "#d3d2d28c",
                        boxShadow: 'md'
                    }}>
                    <TabContext value={value}>
                        <Box sx={{
                            border: 0, borderBottom: 1.5,
                            borderColor: "#d3d2d245",
                            borderBottomColor: 'divider', borderWidth: 2
                        }}>
                            <TabList
                                onChange={(e, newValue) => setValue(newValue)}
                                aria-label="lab API tabs example"
                                sx={{
                                    minHeight: 0,
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: 'var(--rose-pink-400)',
                                    },
                                }}
                                className="flex justify-end items-center"
                            >
                                {

                                    [{ label: 'PROCESS LIST', value: '1' },
                                        // { label: 'NEW ORDER', value: '2' }
                                    ]?.map((val, inx) => {
                                        return (
                                            <Tab
                                                key={inx}
                                                icon={<BiFoodMenu color='white' />}
                                                label={val?.label}
                                                value={val?.value}
                                                iconPosition="start"
                                                sx={{
                                                    display: "flex",
                                                    minHeight: 0,
                                                    textTransform: "none",
                                                    color: 'white',
                                                    bgcolor: "var(--royal-purple-400)",
                                                    borderRadius: 1,
                                                    borderBottomLeftRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                    minWidth: '15%',
                                                    fontSize: { xs: 10, sm: 14 },
                                                    '&.Mui-selected': {
                                                        color: 'white',
                                                        bgcolor: 'var(--royal-purple-400)',
                                                    },
                                                    mr: 1
                                                }}
                                            />
                                        )
                                    })
                                }
                            </TabList>
                        </Box>
                        {/* <TabPanel name value="2" className="overflow-scroll" sx={{ p: 1 }}>
                            <Box sx={{ minHeight: 700 }}>
                                <DietNewOrderList />
                            </Box>
                        </TabPanel> */}
                        <TabPanel value="1" className="overflow-scroll" sx={{ p: 1 }}>
                            <Box sx={{ minHeight: 700 }}>
                                <DietWiseProcessing />
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>

        </>
    );
};

export default memo(DietProcessing);

