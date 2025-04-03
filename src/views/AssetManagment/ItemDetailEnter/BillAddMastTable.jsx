import React, { useEffect, memo, useState, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider, IconButton, Input, Menu, MenuItem, Typography } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';

const BillAddMastTable = ({ count, rowSelect }) => {

    const [tabledata, setTabledata] = useState([]);
    const [filters, setFilters] = useState({
        billlNo: '',
        suppplier: '',
        billlDate: ''
    });

    useEffect(() => {
        const getBillMaster = async () => {
            try {
                const result = await axioslogin.get('ItemMapDetails/BillMasterview');
                const { success, data } = result.data;
                if (success === 2) {
                    setTabledata(data);
                } else {
                    warningNotify('Error occurred');
                    setTabledata([]);
                }
            } catch {
                warningNotify('Error fetching data');
            }
        };
        getBillMaster();
    }, [count]);

    const handleFilterChange = (e, field) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value
        }));
    };

    const [anchorEl, setAnchorEl] = useState({
        billlNo: null,
        suppplier: null,
        billlDate: null
    });

    const handleMenuOpen = (event, menuType) => {
        setAnchorEl((prev) => ({ ...prev, [menuType]: event.currentTarget }));
    };

    const handleMenuClose = (menuType) => {
        setAnchorEl((prev) => ({ ...prev, [menuType]: null }));
        setFilters((prevFilters) => ({ ...prevFilters, [menuType]: '' }));
    };

    const filteredAssetListInstock = useMemo(() => {
        return tabledata.filter((item) => {
            return (
                item.am_bill_no.toLowerCase().includes(filters.billlNo.toLowerCase()) &&
                item.it_supplier_name.toLowerCase().includes(filters.suppplier.toLowerCase()) &&
                item.am_bill_date.toLowerCase().includes(filters.billlDate.toLowerCase())
            );
        });
    }, [tabledata, filters]);

    return (
        <Box sx={{
            minHeight: 100, maxHeight: 240,
            border: 1, borderColor: 'lightgray',
            overflow: 'auto',
        }}>
            <CssVarsProvider>
                <Table stickyHeader size='sm'  >
                    <thead>
                        <tr>
                            <th style={{ width: 50 }}>
                                <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                    Action
                                </IconButton>
                            </th>
                            <th style={{ width: 55 }}>
                                <IconButton sx={{ color: 'black', fontSize: 13 }}>
                                    Sl No.
                                </IconButton>
                            </th>
                            {['billlNo', 'suppplier', 'billlDate'].map((field) => (
                                <th key={field} style={{ width: field === 'suppplier' ? 380 : 150, }}>
                                    <Menu
                                        placement="top-start"
                                        anchorEl={anchorEl[field]}
                                        open={Boolean(anchorEl[field])}
                                        sx={{
                                            zIndex: 1301,
                                            padding: 2, border: 1, borderColor: '#055CAA',
                                        }}>
                                        <Box sx={{ display: 'flex', cursor: 'pointer', px: 0.5 }}>
                                            <Typography sx={{ flex: 1 }}>{field === 'billlNo' ? 'Bill No.' : field === 'suppplier' ? 'Supplier' : 'Bill Date'}</Typography>
                                            <CloseIcon onClick={() => handleMenuClose(field)} />
                                        </Box>
                                        <MenuItem sx={{ padding: 0, border: 0, borderColor: 'white' }}>
                                            <Input
                                                placeholder={`Search ${field === 'billlNo' ? 'Bill No.' : field === 'suppplier' ? 'Supplier' : 'Bill Date'}`}
                                                value={filters[field]}
                                                onChange={(e) => handleFilterChange(e, field)}
                                            />
                                        </MenuItem>
                                    </Menu>
                                    <IconButton onClick={(e) => handleMenuOpen(e, field)}>
                                        <Box sx={{ display: 'flex' }}>
                                            <FilterListOutlinedIcon sx={{ py: 0.2, color: 'grey', cursor: 'pointer', width: 20, height: 20 }} />
                                            <Typography sx={{ fontWeight: 600, color: 'black', fontSize: 14 }}>
                                                {field === 'billlNo' ? 'Bill No.' : field === 'suppplier' ? 'Supplier' : 'Bill Date'}
                                            </Typography>
                                        </Box>
                                    </IconButton>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {filteredAssetListInstock.map((val, index) => (
                            <tr key={index} >
                                <td>
                                    <EditIcon size={6} onClick={() => rowSelect(val)} sx={{ cursor: 'pointer', ml: 1 }} />
                                </td>
                                <td style={{ paddingLeft: 10 }}>{val.am_bill_mastslno}</td>
                                <td style={{ paddingLeft: 15 }}>{val.am_bill_no}</td>
                                <td style={{ paddingLeft: 15 }}>{val.it_supplier_name}</td>
                                <td style={{ paddingLeft: 15 }}>{val.am_bill_date ? format(new Date(val.am_bill_date), 'dd-MM-yyyy') : ''}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </CssVarsProvider>
        </Box>
    )
}
export default memo(BillAddMastTable)