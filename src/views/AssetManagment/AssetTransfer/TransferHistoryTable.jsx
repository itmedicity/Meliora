import { Box, Radio, RadioGroup, Table } from '@mui/joy'
import { format } from 'date-fns';
import React, { memo, useCallback, useState } from 'react'
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import { FormControlLabel } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import TextComponent from 'src/views/Components/TextComponent';

const TransferHistoryTable = ({ historyData, loading }) => {

    const [selectedRadio, setSelectedRadio] = useState(2);
    const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [selectDateFlag, setselectDateFlag] = useState(0)

    const handleFromDateChange = useCallback((event) => {
        const selectedFromDate = event.target.value;
        setFromDate(selectedFromDate);
        if (toDate && selectedFromDate > toDate) {
            setToDate('');
        }
    }, [toDate]);

    const handleToDateChange = useCallback((event) => {
        setToDate(event.target.value)
    }, [])

    const handleRadioChange = useCallback((event) => {
        const value = Number(event.target.value);
        setSelectedRadio(value);
        if (value === 2) {
            setFromDate(format(new Date(), 'yyyy-MM-dd'));
            setToDate(format(new Date(), 'yyyy-MM-dd'));
            setselectDateFlag(0);
        } else if (value === 3) {
            setselectDateFlag(1);
            setFromDate(format(new Date(), 'yyyy-MM-dd'));
            setToDate(format(new Date(), 'yyyy-MM-dd'));
        } else if (value === 1) {
            setFromDate(null);
            setToDate(null);
            setselectDateFlag(0);
        }
    }, [setToDate, setFromDate, setselectDateFlag,]);

    return (
        <Box sx={{ border: 1, flex: 1, borderColor: 'lightgray', mx: 1, p: 1, mt: .5, }}>
            <Box sx={{ flex: 1, display: 'flex', py: .5 }}>
                <FilterAltSharpIcon />
                <TextComponent
                    text={"Filter Date :"}
                    sx={{ fontWeight: 500, pt: .1 }} />

                <RadioGroup value={selectedRadio} onChange={handleRadioChange} sx={{ display: 'flex', flexDirection: 'row', ml: 3, gap: 2 }}>
                    <FormControlLabel
                        sx={{ gap: .5, fontWeight: 500, }}
                        value={1}
                        control={<Radio color="neutral" />}
                        label="All"
                    />
                    <FormControlLabel
                        sx={{ gap: .5, fontWeight: 500, }}
                        value={2}
                        control={<Radio color="neutral" />}
                        label="Today's"
                    />
                    <FormControlLabel
                        sx={{ gap: .5, fontWeight: 500, }}
                        value={3}
                        control={<Radio color="neutral" />}
                        label="Select Date"
                    />
                </RadioGroup>
                {selectDateFlag === 1 ?
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextComponent
                            text={"From "}
                            sx={{ fontWeight: 500, pt: .5, ml: 1 }} />
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="fromDate"
                            value={fromDate}
                            onchange={handleFromDateChange}
                        ></TextFieldCustom>

                        <TextComponent
                            text={"To "}
                            sx={{ fontWeight: 500, pt: .5, ml: 2 }} />
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="toDate"
                            value={toDate}
                            onchange={handleToDateChange}
                        ></TextFieldCustom>
                    </Box> : null}
            </Box>
            {loading && <p>Loading...</p>}
            <Box sx={{ overflow: 'auto' }}>
                <Box sx={{ flex: 1, width: 3000, height: '48vh' }}>
                    <Table borderAxis="both" size="sm" stickyHeader>
                        <thead>
                            <tr>
                                <th rowSpan={2} style={{ width: '60px' }}>Sl. No.</th>
                                <th rowSpan={2} style={{ width: '130px' }}>Asset No.</th>
                                <th rowSpan={2} style={{ width: '120px' }}> Transferred Date</th>
                                <th rowSpan={2} style={{ width: '200px' }}>Transferred User</th>
                                <th colSpan={4} style={{ textAlign: 'center', fontWeight: 750 }}>
                                    Transferred To
                                </th>
                                <th rowSpan={2} >Item Name</th>
                                <th colSpan={4} style={{ textAlign: 'center', fontWeight: 750 }}>
                                    Transferred From
                                </th>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <th>Department Section</th>
                                <th>Room</th>
                                <th>Sub Room</th>
                                <th>Department</th>
                                <th>Department Section</th>
                                <th>Room</th>
                                <th>Sub Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData?.map((val, index) => {
                                return (
                                    <tr key={index}
                                        style={{
                                            backgroundColor: val.am_custodian_trans_status === 1 ? 'lightblue' : 'transparent',
                                        }}
                                    >
                                        <td>&nbsp;{index + 1}</td>
                                        <td> {val.item_asset_no}/{String(val.item_asset_no_only).padStart(6, '0')}</td>
                                        <td> {val.create_date ? format(new Date(val.create_date), 'dd-MM-yy - HH:mm') : 'N/A'}</td>
                                        <td> {val.em_name}</td>
                                        <td> {val.trans_dept_name}</td>
                                        <td> {val.trans_deptsec_name}</td>
                                        <td> {val.trans_room_name}</td>
                                        <td> {val.trans_subroom_name}</td>
                                        <td> {val.item_name}</td>
                                        <td> {val.trans_from_dept_name}</td>
                                        <td> {val.trans_from_deptsec_name}</td>
                                        <td> {val.trans_from_room_name}</td>
                                        <td> {val.trans_from_subroom_name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Box>
            </Box>

        </Box >
    )
}

export default memo(TransferHistoryTable)