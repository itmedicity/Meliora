import React from "react";
import { Virtuoso } from "react-virtuoso";
import { Box, Paper, Chip } from "@mui/material";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import DietButton from "../../DietComponent/DietButton";
import DetailsIcon from '@mui/icons-material/Details';
import MoneyIcon from '@mui/icons-material/Money';
import { formatCurrency } from "../../CommonData/Common";


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



const SummaryTable = ({ data = [], setData, setOpen, setEmployeeData }) => {



    return (
        <Paper
            sx={{
                width: "100%",
                overflow: "hidden",
                mt: 1,
            }}
        >

            {/* ================= HEADER ================= */}
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
                <Cell flex={2}>
                    <DietTextComponent
                        value="Employee"
                        weight={600}
                        color="white"
                    />
                </Cell>

                {/* BILLS */}
                <Cell
                    flex={1}
                    justifyContent="center"
                >
                    <DietTextComponent
                        value="Bills"
                        weight={600}
                        color="white"
                    />
                </Cell>

                {/* BILL AMOUNT */}
                <Cell
                    flex={1.5}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Bill Amount"
                        weight={600}
                        color="white"
                    />
                </Cell>

                {/* COLLECTED */}
                <Cell
                    flex={1.5}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Collected"
                        weight={600}
                        color="white"
                    />
                </Cell>

                {/* PENDING */}
                <Cell
                    flex={1.5}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Pending"
                        weight={600}
                        color="white"
                    />
                </Cell>


                {/* STATUS */}


                {/* PENDING */}
                <Cell
                    flex={1.5}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="cash close"
                        weight={600}
                        color="white"
                    />
                </Cell>
                <Cell
                    flex={1.5}
                    justifyContent="flex-end"
                >
                    <DietTextComponent
                        value="Details"
                        weight={600}
                        color="white"
                    />
                </Cell>


            </Box>


            {/* ================= BODY ================= */}
            <Virtuoso
                style={{
                    height: "62vh",
                    width: "100%",
                }}
                data={data}
                itemContent={(index, row) => {

                    const isStatusClose = row?.closing_status === 'CLOSED';

                    const totalAmount = isStatusClose ? Number(
                        row?.total_bill_amount || 0
                    ) : Number(
                        row?.open_bill_amount || 0
                    );
                    const paidAmount =isStatusClose ?  Number(
                        row?.counted_amount || 0
                    )  : Number(
                        row?.paid_amount || 0
                    );

                    const pendingAmount = Number(
                        row?.pending_amount || 0
                    );





                    return (
                        <Box
                            key={`${row?.employee_id}-${index}`}
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                boxSizing: "border-box",

                                px: 1,
                                borderBottom: "1px solid #eee",

                                backgroundColor:
                                    row?.bgcolor || "white",

                                "&:hover": {
                                    backgroundColor: "#fafafa",
                                },
                            }}
                        >

                            {/* ================= SL NO ================= */}
                            <Cell flex={0.5}>
                                <DietTextComponent
                                    value={index + 1}
                                    size={12}
                                />
                            </Cell>


                            {/* ================= EMPLOYEE ================= */}
                            <Cell flex={2}>
                                <Box
                                    sx={{
                                        minWidth: 0,
                                        overflow: "hidden",
                                    }}
                                >
                                    <DietTextComponent
                                        value={
                                            row?.employee_name || "-"
                                        }
                                        size={12}
                                        weight={600}
                                    />
                                </Box>
                            </Cell>


                            {/* ================= BILL COUNT ================= */}
                            <Cell
                                flex={1}
                                justifyContent="center"
                            >
                                <Chip
                                    label={row?.bill_count || 0}
                                    size="small"
                                    sx={{
                                        height: 14,
                                        minWidth: 45,
                                        borderRadius: "6px",
                                        fontSize: 11,
                                        fontWeight: 800,

                                        backgroundColor:
                                            "rgba(124, 81, 161, 0.10)",

                                        color: "#7c51a1",
                                    }}
                                />
                            </Cell>


                            {/* ================= BILL AMOUNT ================= */}
                            <Cell
                                flex={1.5}
                                justifyContent="flex-end"
                            >
                                <DietTextComponent
                                    value={formatCurrency(totalAmount)}
                                    size={12}
                                    weight={600}
                                />
                            </Cell>


                            {/* ================= COLLECTED ================= */}
                            <Cell
                                flex={1.5}
                                justifyContent="flex-end"
                            >
                                <DietTextComponent
                                    value={formatCurrency(paidAmount)}
                                    size={12}
                                    weight={600}
                                    color="success.main"
                                />
                            </Cell>


                            {/* ================= PENDING ================= */}
                            <Cell
                                flex={1.5}
                                justifyContent="flex-end"
                            >
                                <DietTextComponent
                                    value={formatCurrency(pendingAmount)}
                                    size={12}
                                    weight={600}
                                    color={
                                        pendingAmount > 0
                                            ? "warning.main"
                                            : "success.main"
                                    }
                                />
                            </Cell>


                            {/* ================= PENDING ================= */}
                            <Cell
                                flex={1.5}
                                justifyContent="flex-end"
                            >
                                <DietButton
                                    name="cash close"
                                    width={100}
                                    icon={MoneyIcon}
                                    onClick={() => {
                                        setOpen(true)
                                        setEmployeeData(row)
                                    }}

                                />

                            </Cell>
                            <Cell
                                flex={1.5}
                                justifyContent="flex-end"
                            >
                                <DietButton
                                    onClick={() => setData(row)}
                                    name="Details"
                                    width={100}
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

export default SummaryTable;