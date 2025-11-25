import React, { useEffect, memo, useCallback, useState } from 'react';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, CircularProgress, Table } from '@mui/joy';
import { editicon, } from 'src/color/Color';
import ItemQrDisplayModel from '../ItemListView/ItemQrDisplayModel';
import FloatingSearch from 'src/views/Components/FloatingSearch';


const ItemListViewTable = ({ assetSpare, displayarry, AddDetails, loading }) => {

    const [disArry, setDisArry] = useState([]);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        if (!Array.isArray(displayarry) || displayarry.length === 0) return;

        const mapped = displayarry.map((val, index) => {
            const base = {
                slno: index + 1,
                deptname: val.deptname,
                secname: val.secname,
                category_name: val.category_name,
                item_name: val.item_name,
                due_date: val.due_date,
                am_manufacture_no: val.am_manufacture_no,
                serialno: val.am_manufacture_no !== null ? val.am_manufacture_no : 'Not Updated'
            };

            if (assetSpare === 1) {
                return {
                    ...base,
                    am_item_map_slno: val.am_item_map_slno,
                    item_creation_slno: val.item_creation_slno,
                    item_dept_slno: val.item_dept_slno,
                    item_deptsec_slno: val.item_deptsec_slno,
                    am_custodian_name: val.am_custodian_name,
                    item_asset_no: val.item_asset_no,
                    item_asset_no_only: val.item_asset_no_only,
                    assetno:
                        val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0')
                };
            } else {
                return {
                    ...base,
                    am_spare_item_map_slno: val.am_spare_item_map_slno,
                    spare_creation_slno: val.spare_creation_slno,
                    spare_dept_slno: val.spare_dept_slno,
                    spare_deptsec_slno: val.spare_deptsec_slno,
                    am_custodian_name: val.am_custodian_name,
                    spare_asset_no: val.spare_asset_no,
                    spare_asset_no_only: val.spare_asset_no_only,
                    assetno:
                        val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0')
                };
            }
        });

        setDisArry(mapped);
    }, [displayarry, assetSpare]);

    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const openQRModel = useCallback(row => {
        setSelectedData(row);
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const filteredData = disArry.filter((row) =>
        Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(filterText.toLowerCase())
    );

    return (
        <Box>

            {open && <ItemQrDisplayModel open={open} handleClose={handleClose} selectedData={selectedData} />}
            {loading ? (
                <Box sx={{ p: 4 }}>
                    <CircularProgress size="md" />
                </Box>
            ) : (
                <Box
                    sx={{
                        overflow: 'auto',
                        height: '65vh',
                        position: "relative"
                    }}
                >
                    <FloatingSearch
                        value={filterText}
                        setValue={setFilterText}
                    />




                    <Table stickyHeader stickyFooter >
                        <thead>
                            <tr>
                                <th style={{ width: 50 }}>#</th>
                                <th style={{ width: 80 }} >Add Details</th>
                                <th style={{ width: 80 }}>QR Code</th>
                                <th >Department Section</th>
                                <th >Category</th>
                                <th >Asset No</th>
                                <th >Serial No</th>
                                <th >Item Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td style={empty} colSpan={8}>No Data Available</td>
                                </tr>
                            ) : (
                                filteredData.map((row, idx) => (
                                    <tr key={idx} style={rowStyle}>
                                        <td style={colIndex}>{row.slno}</td>

                                        <td >
                                            <Box
                                                onClick={() => AddDetails(row)}
                                                sx={{ cursor: 'pointer', color: editicon }}
                                            >
                                                <DescriptionIcon />
                                            </Box>
                                        </td>

                                        <td >
                                            <Box
                                                onClick={() => openQRModel(row)}
                                                sx={{ cursor: 'pointer', color: editicon }}
                                            >
                                                <QrCode2Icon />
                                            </Box>
                                        </td>

                                        <td >{row.secname}</td>
                                        <td >{row.category_name}</td>
                                        <td >{row.assetno}</td>
                                        <td >{row.serialno}</td>
                                        <td >{row.item_name}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Box>
            )}

        </Box>
    );
};

export default memo(ItemListViewTable);


const rowStyle = {
    borderBottom: '1px solid rgba(0,0,0,0.05)',
};

const colIndex = {
    padding: '10px 12px',
    fontWeight: 600,
    width: 40,
};



const empty = {
    padding: '16px',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)'
};
