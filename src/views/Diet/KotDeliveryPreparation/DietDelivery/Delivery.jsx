import React, { } from "react";
import DeliveryTableList from "./DeliveryTableList";
import { AnimatePresence } from 'framer-motion'
import { Box } from '@mui/joy'
import DietTextComponent from "../../DietComponent/DietTextComponent";

const Delivery = ({ filteredPatients }) => {
    return (
        <Box sx={{ mt: 1 }}>
            {filteredPatients.length === 0 ?
                <Box
                    sx={{
                        p: 1,
                        borderRadius: 6,
                        bgcolor: '#fff3f3',
                        border: '1px dashed #ffb3b3',
                        fontSize: 13
                    }}> No patients found for this diet </Box> :
                <>
                    <DietTextComponent
                        size={15}
                        value={`Patients (${filteredPatients.length})`}
                        color="#5a2d82"
                    />

                    <AnimatePresence>
                        <DeliveryTableList data={filteredPatients} />
                    </AnimatePresence>
                </>
            }

        </Box>
    );
};

export default Delivery;
