import React, { memo, useMemo } from "react";
import { Box, Paper } from "@mui/material";
import { formatCurrency } from "../../CommonData/Common";
import DietTextComponent from "../../DietComponent/DietTextComponent";



// HELPERS


const numberValue = (value) => Number(value || 0);

const moneyValue = (value) =>
    formatCurrency(numberValue(value));



// CELL


const Cell = ({
    children,
    flex = 1,
    justifyContent = "flex-start",
    sx = {},
}) => (
    <Box
        sx={{
            flex,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent,
            px: 1.25,
            ...sx,
        }}
    >
        {children}
    </Box>
);



// MONEY


const Money = ({
    value = 0,
    color = "#202020",
    weight = 600,
    size = 16,
}) => (
    <DietTextComponent
        value={moneyValue(value)}
        size={size}
        weight={weight}
        color={color}
    />
);



// COUNT


const Count = ({
    value = 0,
    color = "#202020",
    weight = 600,
}) => (
    <DietTextComponent
        value={numberValue(value)}
        size={16}
        weight={weight}
        color={color}
    />
);


const ClosingSummaryTable = ({
    data = [],
}) => {

    const Summary = data?.[0] || {};


    const sections = useMemo(
        () => [
            {
                type: "INPATIENT",
                label: "INPATIENT BILLED",

                rows: [
                    {
                        type: "DIET",
                        label: "Diet Billed",

                        count: Summary?.discharge_bills || 0,
                        gross: Summary?.discharge_amount || 0,
                        collected: Summary?.discharge_collected || 0,
                        pending_count: Summary?.discharge_collected_bills || 0,
                        cash: Summary?.discharge_cash || 0,
                        upi: Summary?.discharge_upi || 0,
                        bank_transfer:
                            Summary?.discharge_upi || 0,
                    },

                    {
                        type: "BYSTANDER",
                        label: "Bystander Billed",

                        count: Summary?.bystander_bills || 0,
                        gross: Summary?.bystander_amount || 0,
                        collected:
                            Summary?.bystander_collected || 0,
                        pending_count: Summary?.bystander_collected_bills || 0,
                        cash: Summary?.bystander_cash || 0,
                        upi: Summary?.bystander_upi || 0,
                        bank_transfer:
                            Summary?.bystander_bank_transfer || 0,
                    },
                ],
            },

            {
                type: "RESTAURANT",
                label: "RESTAURANT BILLED",

                rows: [
                    {
                        type: "RESTAURANT",
                        label: "Restaurant",

                        count:
                            Summary?.restaurant_bills || 0,

                        gross:
                            Summary?.restaurant_amount || 0,

                        collected:
                            Summary?.restaurant_collected || 0,
                        pending_count: 0,
                        cash:
                            Summary?.restaurant_cash || 0,

                        upi:
                            Summary?.restaurant_upi || 0,

                        bank_transfer:
                            Summary?.restaurant_bank_transfer || 0,
                    },

                    {
                        type: "STAFF",
                        label: "Staff",

                        count:
                            Summary?.staff_bills || 0,

                        gross:
                            Summary?.staff_amount || 0,

                        collected:
                            Summary?.staff_collected || 0,
                        pending_count: 0,
                        cash:
                            Summary?.staff_cash || 0,

                        upi:
                            Summary?.staff_upi || 0,

                        bank_transfer:
                            Summary?.staff_bank_transfer || 0,
                    },

                    {
                        type: "DOCTOR",
                        label: "Doctor",

                        count:
                            Summary?.doctor_bills || 0,

                        gross:
                            Summary?.doctor_amount || 0,

                        collected:
                            Summary?.doctor_collected || 0,
                        pending_count: 0,
                        cash:
                            Summary?.doctor_cash || 0,

                        upi:
                            Summary?.doctor_upi || 0,

                        bank_transfer:
                            Summary?.doctor_bank_transfer || 0,
                    },
                ],
            },
            {
                type: "SETTLED",
                label: "TODAY SETTLED",

                rows: [
                    {
                        type: "INPATIENT SETTLED",
                        label: "Inpatient Settled",

                        count: Summary?.settled_bills || 0,
                        gross: Summary?.settled_amount || 0,
                        collected: Summary?.settled_collected || 0,
                        pending_count: Summary?.settled_bills || 0,

                        cash: Summary?.settled_cash || 0,
                        upi: Summary?.settled_upi || 0,
                        bank_transfer:
                            Summary?.settled_bank_transfer || 0,
                    },

                    {
                        type: "STAFF MONTHLY",
                        label: "Staff Montly Settle",

                        count: 0,
                        gross: 0,
                        collected:
                            0,

                        cash: 0,
                        upi: 0,
                        bank_transfer: 0,
                    },
                ],
            },
        ],
        [Summary]
    );



    // TOTALS



    const totalCollected =
        numberValue(Summary?.diet_collected) +
        numberValue(Summary?.bystander_collected) +
        numberValue(Summary?.restaurant_collected) +
        numberValue(Summary?.staff_collected) +
        numberValue(Summary?.doctor_collected) +
        numberValue(Summary?.discharge_collected);


    const totals = useMemo(() => {

        const result = {
            count: 0,
            gross: 0,
            collected: 0,

            cash: 0,
            upi: 0,
            bank_transfer: 0,
        };

        sections?.forEach((section) => {

            // TODAY SETTLED should not be included
            // in the main TOTAL
            if (section.type === "SETTLED") {
                return;
            }

            section.rows.forEach((row) => {
                result.count += numberValue(row.count);

                result.gross += numberValue(row.gross);

                result.collected += numberValue(row.collected);

                result.cash += numberValue(row.cash);

                result.upi += numberValue(row.upi);

                result.bank_transfer += numberValue(row.bank_transfer);

            });

        });


        // =====================================================
        // DISCHARGE
        //
        // Add discharge collected to TOTAL COLLECTED
        // =====================================================

        result.collected += numberValue(
            Summary?.discharge_collected
        );

        return result;

    }, [sections, Summary]);
    // RENDER


    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "60vh",
            }}
        >

            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    overflow: "hidden",

                    border: "1px solid #dedede",
                    borderRadius: 1.5,

                    bgcolor: "#ffffff",
                }}
            >

                {/* 
                    LEVEL 1 HEADER
                    INCOME | BILLED | COLLECTION
                 */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "stretch",

                        minHeight: 48,

                        bgcolor: "#7c51a1",
                    }}
                >

                    {/* ================= INCOME ================= */}

                    <Cell
                        flex={3}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(255,255,255,0.25)",
                        }}
                    >
                        <DietTextComponent
                            value="INCOME"
                            size={16}
                            weight={800}
                            color="#ffffff"
                        />
                    </Cell>


                    {/* ================= BILLED ================= */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(255,255,255,0.25)",
                        }}
                    >
                        <DietTextComponent
                            value="BILL"
                            size={16}
                            weight={800}
                            color="#ffffff"
                        />
                    </Cell>


                    {/* ================ COLLECTION ================ */}

                    <Cell
                        flex={3}
                        justifyContent="center"
                    >
                        <DietTextComponent
                            value="COLLECTION"
                            size={16}
                            weight={800}
                            color="#ffffff"
                        />
                    </Cell>

                </Box>


                {/* 
                    LEVEL 2 HEADER

                    Income Type | Count | Gross |
                    Collected |
                    Cash | UPI | Bank Transfer
                 */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "stretch",

                        minHeight: 46,

                        bgcolor: "#f4f1f7",

                        borderBottom:
                            "1px solid #dedede",

                    }}
                >

                    {/* Income Type */}

                    <Cell
                        flex={1}
                        justifyContent="flex-start"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="Income Type"
                            size={14}
                            weight={800}
                            color="#5b367b"

                        />
                    </Cell>


                    {/* Count */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgb(8, 8, 8)",
                        }}
                    >
                        <DietTextComponent
                            value="Count"
                            size={14}
                            weight={800}
                            color="#5b367b"
                        />
                    </Cell>


                    {/* Gross */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(12, 11, 11, 0.98)",
                        }}
                    >
                        <DietTextComponent
                            value="Gross"
                            size={14}
                            weight={800}
                            color="#5b367b"
                        />
                    </Cell>


                    {/* Collected */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="Collected Count"
                            size={14}
                            weight={800}
                            color="#5b367b"
                        />
                    </Cell>


                    {/* Cash */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="Cash"
                            size={14}
                            weight={800}
                            color="#5b367b"
                        />
                    </Cell>


                    {/* UPI */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="UPI"
                            size={14}
                            weight={800}
                            color="#5b367b"
                        />
                    </Cell>


                    {/* Bank Transfer */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="Bank Transfer"
                            size={14}
                            weight={800}
                            color="#5b367b"
                        />
                    </Cell>

                </Box>


                {/* 
                    BILLING SECTIONS
                 */}

                {sections?.map((section) => (
                    <Box key={section.type}>

                        {/* -----------------------------------------
                            SECTION HEADER
                        ----------------------------------------- */}

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                minHeight: 40,

                                bgcolor: "#ebd9fc",

                                borderBottom:
                                    "1px solid #e5e1e8",

                                borderTop:
                                    "1px solid #e5e1e8",
                            }}
                        >

                            <Cell
                                flex={1}
                                justifyContent="flex-start"
                            >
                                <DietTextComponent
                                    value={section.label}
                                    size={14}
                                    weight={800}
                                    color="#5b367b"
                                />
                            </Cell>


                            {/* Empty Count */}

                            <Cell
                                flex={1}
                            />


                            {/* Empty Gross */}

                            <Cell
                                flex={1}
                            />


                            {/* Empty Collected */}

                            <Cell
                                flex={1}
                            />


                            {/* Empty Cash */}

                            <Cell
                                flex={1}
                            />


                            {/* Empty UPI */}

                            <Cell
                                flex={1}
                            />


                            {/* Empty Bank */}

                            <Cell
                                flex={1}
                            />

                        </Box>


                        {/* -----------------------------------------
                            CHILD ROWS
                        ----------------------------------------- */}

                        {section.rows.map((row, index) => (
                            <Box
                                key={`${section.type}-${row.type}`}
                                sx={{
                                    display: "flex",
                                    alignItems: "stretch",

                                    minHeight: 46,

                                    bgcolor:
                                        index % 2 === 0
                                            ? "#ffffff"
                                            : "#fcfcfc",

                                    borderBottom:
                                        "1px solid #eeeeee",
                                }}
                            >

                                {/* -------------------------------
                                    INCOME TYPE
                                -------------------------------- */}

                                <Cell
                                    flex={1}
                                    justifyContent="center"
                                    sx={{
                                        borderRight:
                                            "1px solid rgba(2, 2, 2, 0.94)",
                                    }}
                                >
                                    <DietTextComponent
                                        value={row.label}
                                        size={15}
                                        weight={600}
                                        color="#333333"
                                    />
                                </Cell>


                                {/* -------------------------------
                                    COUNT
                                -------------------------------- */}

                                <Cell
                                    flex={1}
                                    justifyContent="center"
                                    sx={{
                                        borderRight:
                                            "1px solid rgba(2, 2, 2, 0.94)",
                                    }}
                                >
                                    <Count
                                        value={row.count}
                                    />
                                </Cell>


                                {/* -------------------------------
                                    GROSS
                                -------------------------------- */}

                                <Cell
                                    flex={1}
                                    justifyContent="center"
                                    sx={{
                                        borderRight:
                                            "1px solid rgba(2, 2, 2, 0.94)",
                                    }}
                                >
                                    <Money
                                        value={row.gross}
                                    />
                                </Cell>


                                {/* -------------------------------
                                    COLLECTED
                                -------------------------------- */}

                                <Cell
                                    flex={1}
                                    justifyContent="center"
                                    sx={{
                                        borderRight:
                                            "1px solid rgba(2, 2, 2, 0.94)",
                                    }}
                                >
                                    <Money
                                        value={row.pending_count}
                                        color={
                                            numberValue(
                                                row.collected
                                            ) > 0
                                                ? "#16803c"
                                                : "#6b7280"
                                        }
                                        weight={700}
                                    />
                                </Cell>


                                {/* -------------------------------
                                    CASH
                                -------------------------------- */}

                                <Cell
                                    flex={1}
                                    justifyContent="center"
                                    sx={{
                                        borderRight:
                                            "1px solid rgba(2, 2, 2, 0.94)",
                                    }}
                                >
                                    <Money
                                        value={row.cash}
                                    />
                                </Cell>


                                {/* -------------------------------
                                    UPI
                                -------------------------------- */}

                                <Cell
                                    flex={1}
                                    justifyContent="center"
                                    sx={{
                                        borderRight:
                                            "1px solid rgba(2, 2, 2, 0.94)",
                                    }}
                                >
                                    <Money
                                        value={row.upi}
                                    />
                                </Cell>


                                {/* -------------------------------
                                    BANK TRANSFER
                                -------------------------------- */}

                                <Cell
                                    flex={1}
                                    justifyContent="center"
                                    sx={{
                                        borderRight:
                                            "1px solid rgba(2, 2, 2, 0.94)",
                                    }}
                                >
                                    <Money
                                        value={
                                            row.bank_transfer
                                        }
                                    />
                                </Cell>

                            </Box>
                        ))}

                    </Box>
                ))}


                {/* 
                    PETTY CASH
                 */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "stretch",

                        minHeight: 48,

                        bgcolor: "#fffdf7",

                        borderTop:
                            "1px solid #e4e0d8",

                        borderBottom:
                            "1px solid #eeeeee",
                    }}
                >

                    {/* Income Type */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="PETTY CASH"
                            size={15}
                            weight={700}
                            color="#76551b"
                        />
                    </Cell>


                    {/* Count */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="—"
                            size={16}
                            weight={600}
                            color="#9ca3af"
                        />
                    </Cell>


                    {/* Gross */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="—"
                            size={16}
                            weight={600}
                            color="#9ca3af"
                        />
                    </Cell>


                    {/* Collected */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={
                                numberValue(
                                    Summary?.petty_cash_cash
                                ) +
                                numberValue(
                                    Summary?.petty_cash_upi
                                ) +
                                numberValue(
                                    Summary?.petty_cash_bank_transfer
                                )
                            }
                            color="#76551b"
                            weight={700}
                        />
                    </Cell>


                    {/* Cash */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={
                                Summary?.petty_cash_cash
                            }
                        />
                    </Cell>


                    {/* UPI */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={
                                Summary?.petty_cash_upi
                            }
                        />
                    </Cell>


                    {/* Bank */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={
                                Summary?.petty_cash_bank_transfer
                            }
                        />
                    </Cell>

                </Box>




                {/* 
                    FINAL TOTAL
                 */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "stretch",

                        minHeight: 58,

                        bgcolor: "#f3f0f7",

                        borderTop:
                            "2px solid #7c51a1",
                    }}
                >

                    {/* TOTAL */}

                    <Cell
                        flex={1}
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <DietTextComponent
                            value="TOTAL"
                            size={16}
                            weight={800}
                            color="#5b367b"
                        />
                    </Cell>


                    {/* TOTAL COUNT */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Count
                            value={totals.count}
                            color="#5b367b"
                            weight={800}
                        />
                    </Cell>


                    {/* TOTAL GROSS */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={totals.gross}
                            color="#5b367b"
                            weight={800}
                        />
                    </Cell>


                    {/* TOTAL COLLECTED */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={totalCollected}
                            color="#16803c"
                            weight={800}
                        />
                    </Cell>


                    {/* TOTAL CASH */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={totals.cash}
                            color="#16803c"
                            weight={800}
                        />
                    </Cell>


                    {/* TOTAL UPI */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={totals.upi}
                            color="#16803c"
                            weight={800}
                        />
                    </Cell>


                    {/* TOTAL BANK */}

                    <Cell
                        flex={1}
                        justifyContent="center"
                        sx={{
                            borderRight:
                                "1px solid rgba(2, 2, 2, 0.94)",
                        }}
                    >
                        <Money
                            value={totals.bank_transfer}
                            color="#16803c"
                            weight={800}
                        />
                    </Cell>

                </Box>

            </Paper>

        </Box>
    );
};


export default memo(ClosingSummaryTable);