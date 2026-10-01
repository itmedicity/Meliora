import React, { memo } from "react";
import {
    Box,
    Stack,
    Radio,
} from "@mui/material";

import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import DietTextComponent from "../../DietComponent/DietTextComponent";


const BillPayTypeSelector = ({
    value,
    onChange,
    // onConfirm,
    onClose
}) => {

    const options = [
        {
            value: "INPATIENT_CREDIT",
            label: "Inpatient Credit",
            description: "Add to patient's hospital account",
            icon: CreditCardOutlinedIcon
        },
        {
            value: "CASH",
            label: "Cash",
            description: "Payment collected in cash",
            icon: PaymentsOutlinedIcon
        },
        {
            value: "BYSTANDER_CREDIT",
            label: "Bystander Credit",
            description: "Charge to bystander",
            icon: PersonOutlineOutlinedIcon
        }
    ];

    return (
        <Box
            sx={{
                p: 1.5,
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "grey.50",
                my: 2
            }}
        >

            <DietTextComponent
                value="Bill Payment Type"
                size={12}
                fontWeight={800}
            />

            <DietTextComponent
                value="Select how this proforma should be billed"
                size={8}
                color="text.secondary"
            />

            <Stack
                direction="row"
                spacing={1}
                sx={{
                    mt: 1
                }}
            >

                {options?.map(option => {

                    const Icon = option.icon;

                    const selected =
                        value === option.value;

                    return (
                        <Box
                            key={option.value}
                            onClick={() =>
                                onChange(option.value)
                            }
                            sx={{
                                flex: 1,
                                cursor: "pointer",
                                border: "1px solid",
                                borderColor: selected
                                    ? "primary.main"
                                    : "divider",
                                borderRadius: 1.5,
                                p: 1,
                                backgroundColor: selected
                                    ? "primary.50"
                                    : "background.paper",

                                "&:hover": {
                                    borderColor:
                                        "primary.main"
                                }
                            }}
                        >

                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.4}
                            >

                                <Radio
                                    checked={selected}
                                    size="small"
                                    sx={{
                                        p: 0.1
                                    }}
                                />

                                <Icon
                                    sx={{
                                        fontSize: 17,
                                        color: selected
                                            ? "primary.main"
                                            : "text.secondary"
                                    }}
                                />

                                <DietTextComponent
                                    value={option.label}
                                    size={9}
                                    fontWeight={700}
                                />

                            </Stack>

                        </Box>
                    );

                })}

            </Stack>

            <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={0.7}
                sx={{
                    mt: 1
                }}
            >

                <Box
                    component="button"
                    type="button"
                    onClick={onClose}
                    sx={{
                        height: 30,
                        px: 1.2,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1.5,
                        backgroundColor: "background.paper",
                        cursor: "pointer"
                    }}
                >
                    <DietTextComponent
                        value="Cancel"
                        size={9}
                        fontWeight={700}
                    />
                </Box>

                <Box
                    component="button"
                    type="button"
                    disabled={!value}
                    onClick={onClose}
                    sx={{
                        height: 30,
                        px: 1.4,
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: 1.5,
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        cursor: value
                            ? "pointer"
                            : "not-allowed",
                        opacity: value ? 1 : 0.5
                    }}
                >
                    <DietTextComponent
                        value="Confirm Payment Type"
                        size={9}
                        fontWeight={800}
                        color="inherit"
                    />
                </Box>

            </Stack>

        </Box>
    );
};

export default memo(BillPayTypeSelector);