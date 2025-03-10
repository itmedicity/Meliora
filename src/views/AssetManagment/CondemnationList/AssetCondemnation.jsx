import { Box, Checkbox } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query';
import { Virtuoso } from 'react-virtuoso';
import { getAssetUnderCondmnation } from 'src/api/AssetApis';
import { infoNotify } from 'src/views/Common/CommonCode';
import CusIconButton from 'src/views/Components/CusIconButton';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import DownloadIcon from '@mui/icons-material/Download';
import CondemSubmitionModal from './CondemSubmitionModal';

const AssetCondemnation = ({ empdept }) => {

    const { data: AsssetCodmnation, } = useQuery({
        queryKey: ['getAssetUnderCondmnation', empdept],
        queryFn: () => getAssetUnderCondmnation(empdept),
    });

    const AsssetCodm = useMemo(() => AsssetCodmnation || [], [AsssetCodmnation]);

    const [selectedRows, setSelectedRows] = useState([]);
    const [sortedData, setSortedData] = useState(AsssetCodm);
    const [selectAll, setSelectAll] = useState(false);

    const [modalFlag, setmodalFlag] = useState(0)
    const [modalOpen, setmodalOpen] = useState(false)

    useCallback(() => {
        setmodalFlag(1)
        setmodalOpen(true)
    }, [])

    useEffect(() => {
        setSortedData(AsssetCodm);
    }, [AsssetCodm]);

    const handleRowSelection = (slno) => {
        setSelectedRows((prevSelected) => {
            if (prevSelected.includes(slno)) {
                return prevSelected.filter((id) => id !== slno);
            }

            const newSelected = [...prevSelected, slno];
            setTimeout(() => {
                const selectedData = AsssetCodm.filter((item) => newSelected.includes(item.slno));
                const unselectedData = AsssetCodm.filter((item) => !newSelected.includes(item.slno));
                setSortedData([...selectedData, ...unselectedData]);
            }, 300);

            return newSelected;
        });
    };

    const handleSelectAllChange = () => {
        setSelectAll((prev) => !prev);
        if (!selectAll) {
            setSelectedRows(AsssetCodm.map((item) => item.slno));
            setTimeout(() => {
                setSortedData([...AsssetCodm]);
            }, 300);
        } else {
            setSelectedRows([]);
            setTimeout(() => {
                setSortedData([...AsssetCodm]);
            }, 300);
        }
    };


    const exportToExcel = () => {
        if (selectedRows.length === 0) {

            infoNotify("No Data Selected for Export")
        }
        else {
            const selectedData = AsssetCodm.filter((item) => selectedRows.includes(item.slno));
            const exportData = selectedData.map((item) => ({
                'Asset No': item.spare_asset_no
                    ? `${item.spare_asset_no}/${(item.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
                    : `${item.item_asset_no}/${(item.item_asset_no_only ?? 0).toString().padStart(6, '0')}`,
                Category: item.category_name,
                'Item Name': item.item_name,
                'Transfered User': item.condm_trans_user,
                'Transfered Date': item.item_condm_date,
            }));

            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Spares');

            XLSX.writeFile(workbook, 'SpareCondemnationExport.xlsx');
        }
    };
    return (
        // <Box>
        //     {AsssetCodm.length !== 0 ?
        //         <Box sx={{ width: '100%', overflow: 'auto', p: 1, }}>
        //             <Box sx={{ width: '100%', }}>
        //                 <Box sx={{
        //                     height: 45, display: 'flex', borderBottom: 1, borderTop: 1, borderColor: 'lightgray', pt: 1.5,
        //                     bgcolor: 'white'
        //                 }}>
        //                     <Box sx={{ flex: 1, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
        //                     <Box sx={{ flex: 1.5, fontWeight: 600, color: '#444444', fontSize: 12, }}>Asset No.</Box>
        //                     <Box sx={{ flex: 3, fontWeight: 600, color: '#444444', fontSize: 12, }}>Category</Box>
        //                     <Box sx={{ flex: 8, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>Item Name</Box>
        //                     <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>Transfered Employee</Box>
        //                     <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>Transfered Date</Box>
        //                 </Box>
        //                 <Box sx={{ width: '100%', overflow: 'auto', }}>
        //                     <Box sx={{ width: '100%' }}>
        //                         <Virtuoso
        //                             style={{ height: '70vh' }}
        //                             totalCount={AsssetCodm.length}
        //                             itemContent={(index) => {
        //                                 const val = AsssetCodm[index];
        //                                 return (
        //                                     <Box
        //                                         key={val.slno}
        //                                         sx={{
        //                                             flex: 1,
        //                                             display: 'flex',
        //                                             mt: .3,
        //                                             borderBottom: .5,
        //                                             borderColor: 'lightgrey',
        //                                             minHeight: 30,
        //                                             maxHeight: 80,
        //                                             background: (val.hold_color),
        //                                             pt: .5,
        //                                             alignItems: 'center',
        //                                         }}
        //                                     >
        //                                         <Box sx={{ flex: 1, pl: 1.7, color: '#444444', fontSize: 14 }}>
        //                                             {index + 1}
        //                                         </Box>
        //                                         <Box sx={{ flex: 1.5, color: '#444444', fontSize: 14 }}>
        //                                             {val.spare_asset_no
        //                                                 ? `${val.spare_asset_no}/${(val.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
        //                                                 : `${val.item_asset_no}/${(val.item_asset_no_only ?? 0).toString().padStart(6, '0')}`}
        //                                         </Box>
        //                                         <Box sx={{ flex: 3, color: '#444444', fontSize: 14 }}>
        //                                             {val.category_name}
        //                                         </Box>
        //                                         <Box sx={{ flex: 8, color: '#444444', fontSize: 14, pl: 6 }}>
        //                                             {val.item_name}
        //                                         </Box>
        //                                         <Box sx={{ flex: 2, color: '#444444', fontSize: 14, pl: 6 }}>
        //                                             g
        //                                         </Box>
        //                                         <Box sx={{ flex: 2, color: '#444444', fontSize: 14, pl: 6 }}>
        //                                             g
        //                                         </Box>
        //                                     </Box>
        //                                 );
        //                             }}
        //                         />
        //                     </Box>
        //                 </Box>

        //             </Box>
        //         </Box>
        //         :
        //         <Box sx={{
        //             display: 'flex',
        //             flex: 1,
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             pt: 25,
        //             fontWeight: 800,
        //             fontSize: 25,
        //             color: 'lightgrey',
        //             height: '100%'
        //         }}>
        //             Empty  List
        //         </Box>
        //     }
        // </Box>
        <Box>
            {modalFlag === 1 ? <Box>
                <CondemSubmitionModal open={modalOpen}
                    setmodalOpen={setmodalOpen}
                    setmodalFlag={setmodalFlag}

                />

            </Box> : null}

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', py: 0.5, pr: 1 }}>
                <CusIconButton variant="outlined" size="sm" color="success" onClick={exportToExcel}>
                    <DownloadIcon />
                </CusIconButton>
            </Box>

            {AsssetCodm.length !== 0 ? (
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
                                    const isSelected = selectedRows.includes(val.slno);

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
                                                onChange={() => handleRowSelection(val.slno)}
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

export default memo(AssetCondemnation)


