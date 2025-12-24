
import React, { memo, useState } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import { Box, Typography, IconButton } from '@mui/joy'
import { formatDateTime } from './StoreCommonCode/CommonStyle'

const columns = [
    { label: 'Slno', width: 40, align: "center" },
    { label: 'Purchase_date', width: 100, key: 'PURCHASE DATE', align: "center" },
    { label: 'Supplier', width: 300, key: 'SUPPLIER', align: "left" },
    { label: 'Qty', width: 100, key: 'QTY', align: "center" },
    { label: 'Gst %', width: 100, key: 'GST %', align: "center" },
    { label: 'Tax_percentage', width: 100, key: 'PDN_TAXPER', align: "center" },
    { label: 'Cost_rate', width: 100, key: 'COST RATE', align: "right" },
    { label: 'Gst_amount', width: 100, key: 'GST AMT', align: "right" },
    { label: 'Free_quantity', width: 100, key: 'PDN_FREE', align: "center" },
    { label: 'Discount_percentage', width: 100, key: 'PDN_DISPER', align: "center" },
    { label: 'Margin', width: 100, key: 'MARGIN %', align: "center" },
]

const hiddenColumns = [
    { label: 'Cost_include_gst', width: 100, key: 'COST INCL GST', align: "right" },
    { label: 'Mrp_without_gst', width: 100, key: 'MRP WOUT GST', align: "right" },
    { label: 'Mrp_include_gst', width: 100, key: 'MRP INCL GST', align: "right" },
]

const PurchaseDetails = ({ detailArr }) => {
    const [showHiddenColumns, setShowHiddenColumns] = useState(false);

    const toggleColumns = () => {
        setShowHiddenColumns(!showHiddenColumns);
    };

    const visibleColumns = [...columns, ...(showHiddenColumns ? hiddenColumns : [])];

    return (
        <Box sx={{ mx: 1, boxShadow: '0px 8px 10px rgba(0,0,0,0.16)', border: 0.5, borderColor: "#D0BFFF" }}>
            <TableVirtuoso
                data={detailArr}
                style={{ height: 420 }}
                fixedHeaderContent={() => (
                    <tr style={{ background: '#E5D9F2' }}>
                        {visibleColumns.map((col, index) => (
                            <th key={index} style={{ width: col.width * 100, textAlign: col.align }}>
                                <Typography fontSize={13} fontWeight={550}>
                                    {col.label}
                                </Typography>
                            </th>
                        ))}
                        <th style={{ width: 40, textAlign: 'center' }}>
                            <IconButton onClick={toggleColumns}>
                                <Typography fontSize={20}>
                                    {showHiddenColumns ? '<<' : '>>'}
                                </Typography>
                            </IconButton>
                        </th>
                    </tr>
                )}
                itemContent={(index, item) => (
                    <>
                        <td style={{ width: 40, textAlign: 'center', borderBottom: "1px solid lightgrey" }}>
                            <Typography fontSize={12}>{index + 1}</Typography>
                        </td>

                        {visibleColumns.slice(1).map((col, i) => {
                            let value = item[col.key];
                            if (["PURCHASE DATE"].includes(col.key)) {
                                value = formatDateTime(value);
                            }

                            if (["GST AMT", "COST INCL GST", "MRP WOUT GST", "MRP INCL GST", "COST RATE"].includes(col.key)) {
                                value = Math.round(value);
                            }
                            const isGreenField = ["QTY", "GST %"].includes(col.key);
                            const isYellowField = ["PDN_FREE", "PDN_DISPER", "MARGIN %"].includes(col.key);
                            return (
                                <td key={i}
                                    style={{
                                        width: col.width, textAlign: col.align,
                                        borderBottom: "1px solid lightgrey",
                                        backgroundColor: isGreenField
                                            ? "#E8F5E9"
                                            : isYellowField
                                                ? "#FAF3F0"
                                                : "transparent",
                                    }}>
                                    <Typography fontSize={12}>{value}</Typography>
                                </td>
                            );
                        })}
                    </>
                )}
            />
        </Box>
    )
}

export default memo(PurchaseDetails)

