
import React, { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { Box, Paper } from "@mui/material";
import PregnantWomanTwoToneIcon from '@mui/icons-material/PregnantWomanTwoTone';
import DetailsIcon from "@mui/icons-material/Details";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import DietButton from "../../DietComponent/DietButton";
import { formatCurrency } from "../../CommonData/Common";


/*  CELL */

const Cell = ({
    flex = 1,
    children,
    justifyContent = "flex-start",
}) => (
    <Box
        sx={{
            flex: `${flex} 1 0`,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent,
            boxSizing: "border-box",
            overflow: "hidden",
        }}
    >
        {children}
    </Box>
);


/* 
   STATUS
 */




/* 
   PETTY CASH ALLOCATION TABLE
 */

const PettyCashAllocationTable = ({
    data = [],
    onDetails,
    // activetab
}) => {

    return (
        <Paper
            sx={{
                width: "100%",
                overflow: "hidden",
                mt: 1,
                borderRadius: "10px",
                boxShadow: "none",
                border: "1px solid #e8e1ed",
            }}
        >

            {/* 
                HEADER
             */}

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",

                    bgcolor: "#7c51a1",

                    py: 0.7,
                    px: 1,

                    boxSizing: "border-box",

                    borderBottom: "1px solid lightgrey",
                }}
            >

                {/* SL NO */}

                <Cell flex={0.5}>
                    <DietTextComponent
                        value="Sl.No"
                        weight={600}
                        color="white"
                    />
                </Cell>


                {/* EMPLOYEE */}

                <Cell flex={1.5}>
                    <DietTextComponent
                        value="Employee"
                        weight={600}
                        color="white"
                    />
                </Cell>


                <Cell
                    flex={1}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Cash Given At"
                        weight={600}
                        color="white"
                    />
                </Cell>

                {/* ALLOCATED */}

                <Cell
                    flex={1}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Petty"
                        weight={600}
                        color="white"
                    />
                </Cell>


                {/* COLLECTED */}

                <Cell
                    flex={1}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Pending"
                        weight={600}
                        color="white"
                    />
                </Cell>


                {/* PENDING */}

                <Cell
                    flex={1}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Settled"
                        weight={600}
                        color="white"
                    />
                </Cell>


                <Cell
                    flex={1.6}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Cash Given By"
                        weight={600}
                        color="white"
                    />
                </Cell>

                {/* STATUS */}

                <Cell
                    flex={3.5}
                    justifyContent="center"
                >
                    <DietTextComponent
                        value="Remarks"
                        weight={600}
                        color="white"
                        wrap
                    />
                </Cell>


                {/* DETAILS */}

                <Cell
                    flex={1}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Details"
                        weight={600}
                        color="white"

                    />
                </Cell>

            </Box>


            {/* 
                BODY
             */}

            <Virtuoso
                style={{
                    height: "40vh",
                    width: "100%",
                }}
                data={data}
                itemContent={(index, row) => {
                    return (

                        <Box
                            key={`${row?.employee_id}-${index}`}
                            sx={{
                                width: "100%",

                                display: "flex",
                                alignItems: "center",

                                boxSizing: "border-box",

                                px: 1,

                                minHeight: 42,

                                borderBottom: "1px solid #eee",

                                backgroundColor:
                                    row?.bgcolor || "white",

                                "&:hover": {
                                    backgroundColor: "#fafafa",
                                },
                            }}
                        >

                            {/* 
                                SL NO
                             */}

                            <Cell flex={0.5}>

                                <DietTextComponent
                                    value={index + 1}
                                    size={12}
                                />

                            </Cell>


                            {/* 
                                EMPLOYEE
                             */}

                            <Cell flex={1.5}>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.8,

                                        minWidth: 0,
                                        overflow: "hidden",
                                    }}
                                >



                                    <PregnantWomanTwoToneIcon
                                        sx={{
                                            fontSize: 16,
                                            color: "#7c51a1",
                                        }}
                                    />

                                    <DietTextComponent
                                        value={row?.employee_name || "-"}
                                        size={12}
                                        weight={600}
                                    />
                                </Box>

                            </Cell>

                            {/* 
                                ALLOCATED
                             */}

                            <Cell
                                flex={1}
                                justifyContent="flex-end"
                            >

                                <DietTextComponent
                                    value={row?.given_at || "-"}
                                    size={12}
                                    weight={700}
                                />

                            </Cell>


                            {/* 
                                COLLECTED
                             */}

                            <Cell
                                flex={1}
                                justifyContent="flex-end"
                            >

                                <DietTextComponent
                                    value={formatCurrency(row?.petty_cash_amount)}
                                    size={12}
                                    weight={700}
                                    color="success.main"
                                />

                            </Cell>


                            {/* 
                                PENDING
                             */}

                            <Cell
                                flex={1}
                                justifyContent="flex-end"
                            >

                                <DietTextComponent
                                    value={formatCurrency(
                                        row.pending_amount
                                    )}
                                    size={12}
                                    weight={700}
                                    color={
                                        row.petty_cash_amount > 0
                                            ? "warning.main"
                                            : "success.main"
                                    }
                                />

                            </Cell>

                            <Cell
                                flex={1}
                                justifyContent="flex-end"
                            >

                                <DietTextComponent
                                    value={row?.settled_amount}
                                    size={12}
                                    weight={700}
                                />

                            </Cell>
                            <Cell
                                flex={1.6}
                                justifyContent="flex-end">

                                <DietTextComponent
                                    value={row?.given_by_employee || "-"}
                                    size={12}
                                    weight={700}
                                />

                            </Cell>

                            {/* REMARKS */}
                            <Cell
                                flex={3.5}
                                justifyContent="center">
                                <DietTextComponent
                                    value={row?.remarks || "-"}
                                    size={12}
                                    weight={700}
                                />

                            </Cell>


                            {/* 
                                DETAILS
                             */}

                            <Cell
                                flex={1}
                                justifyContent="flex-end"
                            >

                                <DietButton
                                    onClick={() => {
                                        if (onDetails) {
                                            onDetails(row);
                                        }
                                    }}
                                    name="Details"
                                    width={90}
                                    icon={DetailsIcon}
                                />

                            </Cell>

                        </Box>

                    );
                }}
            />

        </Paper>
    );
};


export default memo(PettyCashAllocationTable);
