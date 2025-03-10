import { Box, Checkbox } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query';
import { Virtuoso } from 'react-virtuoso';
import { getAssetUnderCondmnation, getSpareUnderCondmnation } from 'src/api/AssetApis';
import { infoNotify } from 'src/views/Common/CommonCode';
import CusIconButton from 'src/views/Components/CusIconButton';
import { format } from 'date-fns';
import CondemSubmitionModal from './CondemSubmitionModal';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';

const PendingCondemnationList = ({ empdept, empId }) => {

    const [condemCount, setcondemCount] = useState(0)

    const { data: AsssetCodmnation, } = useQuery({
        queryKey: ['getAssetUnderCondmnation', empdept, condemCount],
        queryFn: () => getAssetUnderCondmnation(empdept),
    });
    const { data: SpareCodmnation } = useQuery({
        queryKey: ['getSpareUnderCondmnation', empdept, condemCount],
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
    const [modalFlag, setmodalFlag] = useState(0);
    const [modalOpen, setmodalOpen] = useState(false);
    const [itemList, setitemList] = useState([])
    const [condemMastslno, setcondemMastslno] = useState(0)



    const SubmitForCondem = useCallback(() => {
        const selectedItems = CombinedCodm.filter((item) =>
            selectedRows.includes(`${item.slno}-${item.type}`)
        );
        setitemList(selectedItems);
        const PostForm = {
            create_user: empId,
            deatilData: selectedItems
        };
        CreateForm(PostForm);

        console.log("PostForm", PostForm);

    }, [CombinedCodm, selectedRows, empId]);

    const CreateForm = async (PostForm) => {
        try {
            const result = await axioslogin.post('/AssetCondemnation/insertCondemMasterData', PostForm);
            const { success, condem_mast_slno } = result.data;
            if (success === 1) {
                setcondemMastslno(condem_mast_slno)
                setmodalFlag(1);
                setmodalOpen(true);

            } else {

            }
        } catch (error) {

        }
    };

    const handleRowSelection = (slno, type) => {
        setSelectedRows((prevSelected) => {
            const identifier = `${slno}-${type}`;
            const newSelected = prevSelected.includes(identifier)
                ? prevSelected.filter((id) => id !== identifier)
                : [...prevSelected, identifier];
            const selectedData = CombinedCodm.filter((item) => newSelected.includes(`${item.slno}-${item.type}`));
            const unselectedData = CombinedCodm.filter((item) => !newSelected.includes(`${item.slno}-${item.type}`));
            setSortedData([...selectedData, ...unselectedData]);

            return newSelected;
        });
    };

    const handleSelectAllChange = () => {
        setSelectAll((prev) => {
            const newSelectAll = !prev;
            const newSelectedRows = newSelectAll ? CombinedCodm.map((item) => `${item.slno}-${item.type}`) : [];
            setSelectedRows(newSelectedRows);
            setSortedData([...CombinedCodm]);
            return newSelectAll;
        });
    };

    return (
        <Box>
            {modalFlag === 1 ?
                <CondemSubmitionModal open={modalOpen}
                    setmodalOpen={setmodalOpen}
                    setmodalFlag={setmodalFlag}
                    itemList={itemList}
                    setitemList={setitemList}
                    empId={empId}
                    condemMastslno={condemMastslno}
                    empdept={empdept}
                    setcondemCount={setcondemCount}
                    condemCount={condemCount}
                />

                : null}

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', py: 0.5, pr: 1 }}>
                <CusIconButton variant="outlined" size="sm" color="warning" background="warning"
                    onClick={SubmitForCondem}
                >
                    <Box sx={{ px: 1 }}>
                        Submit for Condemnation
                    </Box>
                </CusIconButton>
            </Box>

            {
                CombinedCodm.length !== 0 ? (
                    <Box sx={{
                        width: '100% ', px: 1, overflow: 'auto', flex: 1
                    }}>
                        <Box >
                            <Box
                                sx={{
                                    height: 45,
                                    display: 'flex',
                                    borderBottom: 1,
                                    borderTop: 1,
                                    borderColor: 'lightgray',
                                    pt: 1.5,
                                    bgcolor: 'white',
                                    alignItems: 'center',
                                }}
                            >
                                <Checkbox
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                    sx={{ pl: 1, pr: 2 }}
                                />
                                <Box sx={{ width: 110, fontWeight: 600, color: '#444444', fontSize: 12 }}>Asset No.</Box>
                                <Box sx={{ flex: 1, fontWeight: 600, color: '#444444', fontSize: 12 }}>Category</Box>
                                <Box sx={{ flex: 3, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>
                                    Item Name
                                </Box>
                                <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>
                                    Reason
                                </Box>
                                <Box sx={{ width: 145, fontWeight: 600, color: '#444444', fontSize: 12 }}>Transfered Employee</Box>
                                <Box sx={{ width: 145, fontWeight: 600, color: '#444444', fontSize: 12 }}>Transfered Date</Box>
                            </Box>

                            <Box sx={{ width: '100%', overflow: 'auto' }}>
                                <Virtuoso
                                    style={{ height: '70vh' }}
                                    totalCount={sortedData.length}
                                    itemContent={(index) => {
                                        const val = sortedData[index];
                                        const identifier = `${val.slno}-${val.type}`;
                                        const isSelected = selectedRows.includes(identifier);

                                        return (
                                            <Box
                                                key={val.slno}
                                                sx={{
                                                    display: 'flex',
                                                    mt: 0.3,
                                                    borderBottom: 0.5,
                                                    borderColor: 'lightgrey',
                                                    minHeight: 30,
                                                    maxHeight: 80,
                                                    background: isSelected ? '#e0f7fa' : val.hold_color,
                                                    transition: 'transform 0.3s ease',
                                                    transform: isSelected ? 'translateY(-5px)' : 'translateY(0)',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => handleRowSelection(val.slno, val.type)}
                                                    sx={{ pl: 1, pr: 2 }}
                                                />
                                                < Box sx={{ width: 110, color: '#444444', fontSize: 14, }}>
                                                    {val.spare_asset_no
                                                        ? `${val.spare_asset_no}/${(val.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
                                                        : `${val.item_asset_no}/${(val.item_asset_no_only ?? 0).toString().padStart(6, '0')}`}
                                                </Box>
                                                <Box sx={{ flex: 1, color: '#444444', fontSize: 14 }}>{val.category_name}</Box>
                                                <Box sx={{ flex: 3, color: '#444444', fontSize: 14, pl: 6 }}>{val.item_name}</Box>
                                                <Box sx={{ flex: 2, color: '#444444', fontSize: 14, pl: 6 }}>
                                                    {val.condm_transf_remarks}
                                                </Box>
                                                <Box sx={{ width: 145, fontWeight: 600, color: '#444444', fontSize: 12, pl: .5 }}>{val.condm_trans_emp}</Box>
                                                <Box sx={{ width: 145, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                                                    {val.item_condm_date
                                                        ? format(new Date(val.item_condm_date), 'dd MMM yyyy,  hh:mm a')
                                                        : ''}

                                                </Box>
                                            </Box>
                                        );
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box >
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
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

export default PendingCondemnationList