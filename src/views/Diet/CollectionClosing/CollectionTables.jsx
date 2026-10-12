

import React, { useState } from "react";
import { AnimatePresence } from 'framer-motion'
import { Box } from '@mui/joy'
import SummaryTable from "./CollecitonComponent/SummaryTable";
import BillDetailTable from "./CollecitonComponent/BillDetailTable";
import CloseIcon from '@mui/icons-material/Close';
import DietButton from "../DietComponent/DietButton";
import DenominationForm from "./CollecitonComponent/DenominationForm";
import CashClosingDetails from "./CollecitonComponent/CashClosingDetails";


const CollectionTables = ({
    billSummary,
    setViewDetails,
    billdetails,
    isDetailChecked,
    setOpenDenomination,
    opendenomination
}) => {


    const [employeedata, setEmployeeData] = useState({});


    return (
        <Box sx={{ mt: 1 }}>
            {
                isDetailChecked && billdetails === 0 ?
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 6,
                            bgcolor: '#fff3f3',
                            border: '1px dashed #ffb3b3',
                            fontSize: 13
                        }}> No Bill Detail Found </Box> :

                    <>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            {
                                isDetailChecked &&
                                <DietButton
                                    onClick={() => setViewDetails({})}
                                    name="close"
                                    width={120}
                                    icon={CloseIcon}
                                />
                            }
                        </Box>

                        <AnimatePresence>
                            {
                                billdetails?.length > 0 || isDetailChecked ?
                                    <BillDetailTable data={billdetails} /> :
                                    !opendenomination ?
                                        <SummaryTable
                                            data={billSummary}
                                            setData={setViewDetails}
                                            setOpen={setOpenDenomination}
                                            setEmployeeData={setEmployeeData}
                                        /> :
                                        <>
                                            {employeedata?.closing_status === 'CLOSED' ? (
                                                <CashClosingDetails
                                                    data={employeedata}
                                                    onCancel={() => {
                                                        setOpenDenomination(false)
                                                    }}
                                                />
                                            ) : (
                                                <DenominationForm
                                                    collectionAmount={employeedata?.open_bill_amount}
                                                    employeedata={employeedata}
                                                    onCancel={() => {
                                                        setOpenDenomination(false)
                                                    }}
                                                />
                                            )}</>
                            }
                        </AnimatePresence>
                    </>
            }
        </Box>
    );
};

export default CollectionTables;
