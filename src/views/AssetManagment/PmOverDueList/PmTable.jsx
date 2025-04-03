import React, { memo, useState } from 'react';
import { Box, Table, Sheet, Typography, CssVarsProvider, Input, Menu, MenuItem } from '@mui/joy';
import DownloadIcon from '@mui/icons-material/Download';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import { Paper } from '@mui/material';
import CusIconButton from 'src/views/Components/CusIconButton';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import CloseIcon from '@mui/icons-material/Close';

const PmTable = ({ tableData }) => {
    const exportState = useSelector((state) => state.changeStateAggrid.aggridstate);
    const [columnDefs] = useState([
        { headerName: "SlNo", field: "slno", width: 65 },
        { headerName: "Asset No", field: "assetNo", width: 140 },
        { headerName: "Item Name", field: "item_name", width: 280 },
        { headerName: "Department Section", field: "sec_name", width: 250 },
        { headerName: "Room no", field: "roomname", width: 150 },
        { headerName: "Sub Room No", field: "subroom", width: 150 },
        { headerName: "Serial No", field: "am_manufacture_no", width: 200 },
        { headerName: "Installation date", field: "instalation_date", width: 120 },
        { headerName: "Due date", field: "due_date", width: 100 },
    ]);

    const [searchQuery, setSearchQuery] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedColumn, setSelectedColumn] = useState(null);

    const handleSearchChange = (event, column) => {
        setSearchQuery({
            ...searchQuery,
            [column]: event.target.value.toLowerCase(),
        });

    };
    const [heardernaMe, setheardernaMe] = useState('')
    const handleMenuOpen = (event, column, headerName) => {
        setAnchorEl(event.currentTarget);
        setSelectedColumn(column);
        setheardernaMe(headerName)
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedColumn(null);
        setheardernaMe('');
        setSearchQuery((prev) => {
            const updatedQuery = { ...prev };
            delete updatedQuery[selectedColumn];
            return updatedQuery;
        });
    };


    const filteredData = tableData.filter((row) =>
        columnDefs.every((col) => {
            const query = searchQuery[col.field] || '';
            return String(row[col.field]).toLowerCase().includes(query);
        })
    );

    const exportToCSV = () => {
        if (filteredData.length > 0) {
            const csvData = [
                columnDefs.map(col => col.headerName).join(","),
                ...filteredData.map(row => columnDefs.map(col => row[col.field]).join(","))
            ].join("\n");

            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'report.csv');
        }
    };

    if (exportState > 0) {
        exportToCSV();
    }

    return (
        <Box>
            <Paper
                square
                sx={{
                    backgroundColor: '#f0f3f5',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row-reverse',
                    gap: 0.1,
                    padding: 1,
                }}
            >
                <Box>
                    <CusIconButton variant="outlined" size="sm" color="success" onClick={exportToCSV}>
                        <DownloadIcon />
                    </CusIconButton>
                </Box>
            </Paper>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <CssVarsProvider>
                    <Menu
                        placement='top'
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        sx={{ padding: 2, border: 1, borderColor: '#055CAA' }}
                    >
                        <Box sx={{ flex: 1, display: 'flex', cursor: 'pointer', px: .5 }}>
                            <Typography sx={{ flex: 1, }}>
                                {heardernaMe}
                            </Typography>
                            <CloseIcon onClick={handleMenuClose} />
                        </Box>
                        {selectedColumn && (
                            <MenuItem sx={{ padding: 0, border: 0, borderColor: 'white' }}>
                                <Input
                                    placeholder={`Search ${heardernaMe}`}
                                    value={searchQuery[selectedColumn] || ''}
                                    onChange={(e) => handleSearchChange(e, selectedColumn)}
                                    sx={{
                                        width: 200,
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </MenuItem>
                        )}
                    </Menu>
                    <Sheet sx={{ height: '70vh', width: 1800 }}>
                        <Table stickyHeader>
                            <thead>
                                <tr>
                                    {columnDefs.map((col, index) => (
                                        <th key={index} style={{ textAlign: 'left', width: col.width }}>
                                            <Box sx={{ display: "flex" }} >
                                                <FilterListOutlinedIcon
                                                    sx={{ p: .2, color: 'grey', cursor: 'pointer', width: 20, height: 20 }}
                                                    onClick={(e) => handleMenuOpen(e, col.field, col.headerName)}
                                                />
                                                <Typography>
                                                    {col.headerName}
                                                </Typography>

                                            </Box>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((row, rowIndex) => (
                                        <tr key={rowIndex} >
                                            {columnDefs.map((col, colIndex) => (
                                                <td key={colIndex} style={{ paddingLeft: 15, }}>
                                                    {row[col.field] || '-'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columnDefs.length} align="center">
                                            <Typography level="body2">No data available</Typography>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Sheet>
                </CssVarsProvider>
            </Box>
        </Box >
    );
};

export default memo(PmTable);
