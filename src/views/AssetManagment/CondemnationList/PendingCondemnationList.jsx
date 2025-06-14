
import { format } from 'date-fns';
import { Button, Table } from '@mui/joy';
import { Box, Checkbox } from '@mui/joy';
import React, {
    memo, useCallback, useEffect, useMemo, useState
} from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getAssetUnderCondmnation, getSpareUnderCondmnation } from 'src/api/AssetApis';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { ActionTyps } from 'src/redux/constants/action.type'
import { axioslogin } from 'src/views/Axios/Axios';


const PendingCondemnationList = ({ empdept }) => {


    const dispatch = useDispatch();
    const [exports, setexport] = useState(0)
    const queryClient = useQueryClient()

    const { data: AsssetCodmnation, } = useQuery({
        queryKey: ['getAssetUnderCondmnation', empdept],
        queryFn: () => getAssetUnderCondmnation(empdept),
    });

    const { data: SpareCodmnation } = useQuery({
        queryKey: ['getSpareUnderCondmnation', empdept],
        queryFn: () => getSpareUnderCondmnation(empdept),
    });

    const CombinedCodm = useMemo(() => {
        const spareList = (SpareCodmnation || []).map(item => ({ ...item, type: 'spare' }));
        const assetList = (AsssetCodmnation || []).map(item => ({ ...item, type: 'asset' }));
        return [...assetList, ...spareList];
    }, [SpareCodmnation, AsssetCodmnation]);


    const [sortedData, setSortedData] = useState([]);
    useEffect(() => {
        setSortedData(CombinedCodm);
    }, [CombinedCodm]);

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);



    const handleSelectAllChange = () => {
        setSelectAll((prev) => {
            const newSelectAll = !prev;
            const newSelectedRows = newSelectAll ? CombinedCodm.map((item) => `${item.slno}-${item.type}`) : [];
            setSelectedRows(newSelectedRows);
            setSortedData([...CombinedCodm]);
            return newSelectAll;
        });
    };



    const handleRowSelection = (slno, type) => {
        setSelectedRows((prevSelected) => {
            const identifier = `${slno}-${type}`;
            const newSelected = prevSelected.includes(identifier)
                ? prevSelected.filter((id) => id !== identifier)
                : [...prevSelected, identifier];
            const selectedData = CombinedCodm.filter((item) => newSelected.includes(`${item.slno}-${item.type}`));
            const unselectedData = CombinedCodm.filter((item) => !newSelected.includes(`${item.slno}-${item.type}`));
            setTimeout(() => {
                setSortedData([...selectedData, ...unselectedData]);
            }, 400);
            return newSelected;
        });
    };

    useEffect(() => {
        if (exports === 1) {
            const sortedData = CombinedCodm.filter(item =>
                selectedRows.includes(`${item.slno}-${item.type}`)
            );

            if (sortedData.length === 0) {
                warningNotify("No rows selected for export");
                setexport(0);
                return;
            }

            const exportData = sortedData.map(val => ({
                'Asset No': val.spare_asset_no
                    ? `${val.spare_asset_no}/${(val.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
                    : `${val.item_asset_no}/${(val.item_asset_no_only ?? 0).toString().padStart(6, '0')}`,
                Category: val.category_name,
                'Item Name': val.item_name,
                Location: val.ticket_reg_location,
                'Ticket Id': val.complaint_slno,
                Reason: val.condm_transf_remarks,
                'Transferred Employee': val.condm_trans_emp,
                'Transferred Date': val.item_condm_date
                    ? format(new Date(val.item_condm_date), 'dd MMM yyyy, hh:mm a')
                    : ''
            }));

            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Condemnation');
            XLSX.writeFile(workbook, 'Selected_Condemnation_List.xlsx');
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 });
            setexport(0);
        } else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 });
        }
    }, [exports, CombinedCodm, selectedRows, dispatch]);



    const RemoveItem = useCallback(async () => {
        const filteredData = CombinedCodm.filter(item =>
            selectedRows.includes(`${item.slno}-${item.type}`)
        );
        if (filteredData.length === 0) {
            warningNotify("No Data To Remove, Please select the items");
            return;
        }
        try {
            const result = await axioslogin.patch('/SpareCondemService/submitCondemReport', filteredData);
            const { success, message } = result.data;
            if (success === 1 || success === 2) {
                succesNotify(message);
                queryClient.invalidateQueries('getAssetUnderCondmnation')
                queryClient.invalidateQueries('getSpareUnderCondmnation')
                setSelectedRows([])
            } else {
                warningNotify(message || 'Not Updated');
            }
        } catch (error) {
            errorNotify("An error occurred while updating data.");
        }
    }, [CombinedCodm, selectedRows]);






    const onExportClick = () => {
        if (sortedData?.length === 0) {
            warningNotify("No Data For Download, Please select the items")
            setexport(0)
        }
        else {
            setexport(1)
        }
    }

    return (
        <Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="success" variant="outlined" size="sm" sx={{ m: .5 }} onClick={onExportClick}>
                    Export to Excel
                </Button>
                <Button color="warning" variant="outlined" size="sm" sx={{ mr: 1, my: .5 }} onClick={RemoveItem}>
                    Remove Items
                </Button>


            </Box>
            {
                CombinedCodm?.length !== 0 ? (
                    <Box sx={{ flex: 1, flex: 1, height: '80vh', overflow: 'auto', mx: 1 }}>
                        <Table
                            variant="plain"
                            borderAxis="both"
                            stickyHeader
                            size='sm'
                            sx={{ '& thead th': { bgcolor: 'background.surface' } }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: 45, textAlign: 'center' }}>
                                        <Checkbox
                                            checked={selectAll}
                                            onChange={handleSelectAllChange}
                                            variant="outlined"
                                        />
                                    </th>
                                    <th style={{ width: 120, textAlign: 'center' }}>Asset No.</th>
                                    <th style={{ width: 'auto', textAlign: 'center' }}>Category</th>
                                    <th style={{ width: 'auto', textAlign: 'center' }}>Item Name</th>
                                    <th style={{ width: 'auto', textAlign: 'center' }}>Location</th>
                                    <th style={{ width: 80, textAlign: 'center' }}>Ticket Id</th>
                                    <th style={{ width: 'auto', textAlign: 'center' }}>Reason</th>
                                    <th style={{ width: 'auto', textAlign: 'center' }}>Transfered Employee</th>
                                    <th style={{ width: 140, textAlign: 'center' }}>Transfered Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map((val, index) => {
                                    const identifier = `${val.slno}-${val.type}`;
                                    const isSelected = selectedRows.includes(identifier);
                                    return (
                                        <tr
                                            key={identifier}
                                            style={{
                                                background: isSelected ? '#e0f7fa' : val.hold_color,
                                                transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        >
                                            <td style={{ textAlign: 'center' }}>
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => handleRowSelection(val.slno, val.type)}
                                                    variant="outlined"
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {val.spare_asset_no
                                                    ? `${val.spare_asset_no}/${(val.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
                                                    : `${val.item_asset_no}/${(val.item_asset_no_only ?? 0).toString().padStart(6, '0')}`}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{val.category_name}</td>
                                            <td style={{ textAlign: 'center' }}>{val.item_name}</td>
                                            <td style={{ textAlign: 'center' }}>{val.ticket_reg_location}</td>
                                            <td style={{ textAlign: 'center' }}>{val.complaint_slno}</td>
                                            <td style={{ textAlign: 'center' }}>{val.condm_transf_remarks}</td>
                                            <td style={{ textAlign: 'center' }}>{val.condm_trans_emp}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                {val.item_condm_date
                                                    ? format(new Date(val.item_condm_date), 'dd MMM yyyy,  hh:mm a')
                                                    : ''}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pt: 25,
                            fontWeight: 800,
                            fontSize: 25,
                            color: 'lightgrey',
                            height: '100%',
                        }}
                    >
                        Empty List
                    </Box>
                )
            }
        </Box >
    )
}

export default memo(PendingCondemnationList)