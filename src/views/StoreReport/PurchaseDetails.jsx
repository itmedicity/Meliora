import React, { memo } from 'react'
import { TableVirtuoso } from 'react-virtuoso'
import { Box, Typography } from '@mui/joy'
import { formatDateTime } from './StoreCommonCode/CommonStyle'

const columns = [
    { label: 'Sl.No', width: 40, align: "center" },
    { label: 'Purchase Date', width: 100, key: 'PURCHASE DATE', align: "center" },
    { label: 'Su_code', width: 100, key: 'SU_CODE', align: "center" },
    { label: 'SUPPLIER', width: 300, key: 'SUPPLIER', align: "left" },
    { label: 'It_Code', width: 100, key: 'IT_CODE', align: "center" },
    { label: 'Item', width: 350, key: 'ITEM', align: "left" },
    { label: 'Qty', width: 100, key: 'QTY', align: "center" },
    { label: 'GST %', width: 100, key: 'GST %', align: "center" },
    { label: 'PND_Taxper', width: 100, key: 'PDN_TAXPER', align: "center" },
    { label: 'Cost Rate', width: 100, key: 'COST RATE', align: "right" },
    { label: 'GST Amt', width: 100, key: 'GST AMT', align: "right" },
    { label: 'Cost_Incl_GST', width: 100, key: 'COST INCL GST', align: "right" },
    { label: 'MRP_Wout_GST', width: 100, key: 'MRP WOUT GST', align: "right" },
    { label: 'MRP_Incl_GST', width: 100, key: 'MRP INCL GST', align: "right" },
    { label: 'PDN_Free', width: 100, key: 'PDN_FREE', align: "right" },
    { label: 'PDN_Disper', width: 100, key: 'PDN_DISPER', align: "right" },
    { label: 'Margin', width: 100, key: 'MARGIN %', align: "center" },
]

const PurchaseDetails = ({ detailArr }) => {
    return (
        <Box sx={{ mx: 1, boxShadow: '0px 8px 10px rgba(0,0,0,0.16)', border: 0.5, borderColor: "#D0BFFF" }}>
            <TableVirtuoso
                data={detailArr}
                style={{ height: 420 }}
                fixedHeaderContent={() => (
                    <tr style={{ background: '#E5D9F2' }}>
                        {columns.map((col, index) => (
                            <th key={index} style={{ width: col.width * 100, textAlign: col.align }}>
                                <Typography fontSize={13} fontWeight={550}>
                                    {col.label}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                )}
                itemContent={(index, item) => (
                    <>
                        <td style={{ width: 40, textAlign: 'center', borderBottom: "1px solid lightgrey" }}>
                            <Typography fontSize={12}>{index + 1}</Typography>
                        </td>

                        {columns.slice(1).map((col, i) => {
                            let value = item[col.key];
                            if (["PURCHASE DATE"].includes(col.key)) {
                                value = formatDateTime(value);
                            }

                            if (["GST AMT", "COST INCL GST", "MRP WOUT GST", "MRP INCL GST"].includes(col.key)) {
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
