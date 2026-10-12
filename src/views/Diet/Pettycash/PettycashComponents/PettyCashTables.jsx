import React, { memo, useCallback, useState } from "react";
import { AnimatePresence } from 'framer-motion'
import { Box } from '@mui/joy'
import PettyCashAllocationTable from "./PettyCashAllocationTable";
import PettyCashAssignmentModal from "./PettyCashAssignmentModal";


const PettyCashTables = ({
    tabledata,
    activetab
}) => {


    const [open, setOpen] = useState(false)
    const [rowdetail, setRowDetails] = useState({})

    //petty cash allocation Detail Function
    const HandlePettyAllocation = useCallback((row) => {
        setOpen(true)
        setRowDetails(row)
    }, []);



    return (
        <Box sx={{ mt: 1 }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <AnimatePresence>
                    <PettyCashAllocationTable
                        activetab={activetab}
                        data={tabledata}
                        onDetails={HandlePettyAllocation}
                    />
                </AnimatePresence>
            </Box>

            <PettyCashAssignmentModal
                open={open}
                rowdetail={rowdetail}
                onClose={() => {
                    setOpen(false);
                    setRowDetails({});
                }}
            />

        </Box>
    );
};

export default memo(PettyCashTables);
