import React, { memo, useCallback, useState } from "react";
import { Box, Checkbox, Typography } from "@mui/joy";
import { useAllOrderPartyType } from "src/views/Diet/CommonData/UseQuery";
import RoomPriceListSkeleton from "src/views/Diet/DietSkeleton/RoomPriceListSkeleton";
import RoomPriceListError from "src/views/Diet/DietErrorComponent/RoomPriceListError";
import { applyColumnToAll } from "src/views/Diet/CommonData/CommonFun";

const RoomPriceList = ({ prices, setPrices }) => {

    const {
        data: allPartyType = [],
        isLoading,
        isError
    } = useAllOrderPartyType();

    const [applyGST, setApplyGST] = useState(false);
    const [applyDiscount, setApplyDiscount] = useState(false);
    const [applyDiscountRate, setApplyDiscountRate] = useState(false);

    // Update Field
    const handleChange = useCallback((partyId, field, value) => {
        setPrices(prev => ({
            ...prev,
            [partyId]: {
                ...prev?.[partyId],
                [field]: value
            }
        }));
    }, [setPrices]);


    const applyGSTAll = (checked) => {
        applyColumnToAll(
            "gst_rate",
            checked,
            allPartyType,
            prices,
            setPrices,
            setApplyGST
        );
    };

    const applyDiscountAll = (checked) => {
        applyColumnToAll(
            "discount",
            checked,
            allPartyType,
            prices,
            setPrices,
            setApplyDiscount
        );
    };

    const applyDiscountRateAll = (checked) => {
        applyColumnToAll(
            "discount_rate",
            checked,
            allPartyType,
            prices,
            setPrices,
            setApplyDiscountRate
        );
    };

    const preventInvalidNumberInput = (e) => {
        if (["-", "+", "e", "E"].includes(e.key)) {
            e.preventDefault();
        }
    };

    // Loading UI
    if (isLoading) return <RoomPriceListSkeleton />

    // Error UI
    if (isError) return <RoomPriceListError message="Failed to load party types" />;

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f5f5f5" }}>
                        <th style={th}>Party Type</th>
                        <th style={th}>Price (₹)</th>
                        <th style={th}>
                            <Box sx={headerBox}>
                                GST %
                                <Checkbox
                                    size="sm"
                                    checked={applyGST}
                                    onChange={(e) => applyGSTAll(e.target.checked)}
                                />
                            </Box>
                        </th>

                        <th style={th}>
                            <Box sx={headerBox}>
                                Discount ₹
                                <Checkbox
                                    size="sm"
                                    checked={applyDiscount}
                                    onChange={(e) => applyDiscountAll(e.target.checked)}
                                />
                            </Box>
                        </th>

                        <th style={th}>
                            <Box sx={headerBox}>
                                Discount %
                                <Checkbox
                                    size="sm"
                                    checked={applyDiscountRate}
                                    onChange={(e) =>
                                        applyDiscountRateAll(e.target.checked)
                                    }
                                />
                            </Box>
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {allPartyType?.map((party) => {
                        const id = party?.party_type_id;
                        return (

                            <tr key={id}>

                                <td style={td}>
                                    <Typography fontSize={13} fontWeight={500}>
                                        {party?.party_name}
                                    </Typography>
                                </td>


                                <td style={td}>
                                    <input
                                        type="number"
                                        min={0}
                                        value={prices?.[id]?.price || ""}
                                        onKeyDown={preventInvalidNumberInput}
                                        onChange={(e) =>
                                            handleChange(id, "price", e.target.value)
                                        }
                                        style={input}
                                    />
                                </td>


                                <td style={td}>
                                    <input
                                        type="number"
                                        min={0}
                                        onKeyDown={preventInvalidNumberInput}
                                        value={prices?.[id]?.gst_rate || ""}
                                        onChange={(e) =>
                                            handleChange(id, "gst_rate", e.target.value)
                                        }
                                        style={input}
                                    />
                                </td>


                                <td style={td}>
                                    <input
                                        type="number"
                                        min={0}
                                        onKeyDown={preventInvalidNumberInput}
                                        value={prices?.[id]?.discount || ""}
                                        onChange={(e) =>
                                            handleChange(id, "discount", e.target.value)
                                        }
                                        style={input}
                                    />
                                </td>


                                <td style={td}>
                                    <input
                                        type="number"
                                        min={0}
                                        onKeyDown={preventInvalidNumberInput}
                                        value={prices?.[id]?.discount_rate || ""}
                                        onChange={(e) =>
                                            handleChange(id, "discount_rate", e.target.value)
                                        }
                                        style={input}
                                    />
                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </Box>
    );
};


const th = {
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: 12,
    textAlign: "center"
};

const td = {
    padding: "6px",
    border: "1px solid #ddd"
};

const input = {
    width: "100%",
    padding: "6px",
    borderRadius: 4,
    border: "1px solid #ccc"
};

const headerBox = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    fontSize: 12
};

export default memo(RoomPriceList);