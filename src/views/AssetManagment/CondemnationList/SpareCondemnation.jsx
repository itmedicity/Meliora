import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';
import { Box, Checkbox, } from '@mui/joy';
import { useQuery } from 'react-query';
import { Virtuoso } from 'react-virtuoso';
import { getSpareUnderCondmnation } from 'src/api/AssetApis';
import CusIconButton from 'src/views/Components/CusIconButton';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { infoNotify } from 'src/views/Common/CommonCode';
import CondemSubmitionModal from './CondemSubmitionModal';

const SpareCondemnation = ({ empdept }) => {

    const { data: SpareCodmnation } = useQuery({
        queryKey: ['getSpareUnderCondmnation', empdept],
        queryFn: () => getSpareUnderCondmnation(empdept),
    });

    const SpareCodm = useMemo(() => SpareCodmnation || [], [SpareCodmnation]);

    const [selectedRows, setSelectedRows] = useState([]);
    const [sortedData, setSortedData] = useState(SpareCodm);
    const [selectAll, setSelectAll] = useState(false);

    const [modalFlag, setmodalFlag] = useState(0)
    const [modalOpen, setmodalOpen] = useState(false)

    const SubmitForCondem = useCallback(() => {
        setmodalFlag(1)
        setmodalOpen(true)
    }, [])


    useEffect(() => {
        setSortedData(SpareCodm);
    }, [SpareCodm]);

    const handleRowSelection = (slno) => {
        setSelectedRows((prevSelected) => {
            if (prevSelected.includes(slno)) {
                return prevSelected.filter((id) => id !== slno);
            }

            const newSelected = [...prevSelected, slno];
            setTimeout(() => {
                const selectedData = SpareCodm.filter((item) => newSelected.includes(item.slno));
                const unselectedData = SpareCodm.filter((item) => !newSelected.includes(item.slno));
                setSortedData([...selectedData, ...unselectedData]);
            }, 300);
            return newSelected;
        });
    };

    const handleSelectAllChange = () => {
        setSelectAll((prev) => !prev);
        if (!selectAll) {
            setSelectedRows(SpareCodm.map((item) => item.slno));
            setTimeout(() => {
                setSortedData([...SpareCodm]);
            }, 300);
        } else {
            setSelectedRows([]);
            setTimeout(() => {
                setSortedData([...SpareCodm]);
            }, 300);
        }
    };



    // const exportToExcel = () => {
    //     if (selectedRows.length === 0) {

    //         infoNotify("No Data Selected for Export")
    //     }
    //     else {
    //         const selectedData = SpareCodm.filter((item) => selectedRows.includes(item.slno));
    //         const exportData = selectedData.map((item) => ({
    //             'Spare No': item.spare_asset_no
    //                 ? `${item.spare_asset_no}/${(item.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
    //                 : `${item.item_asset_no}/${(item.item_asset_no_only ?? 0).toString().padStart(6, '0')}`,
    //             Category: item.category_name,
    //             'Item Name': item.item_name,
    //             'Transfered User': item.sparecondm_emp,
    //             'Transfered Date': item.deleted_date,
    //         }));

    //         const worksheet = XLSX.utils.json_to_sheet(exportData);
    //         const workbook = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Spares');

    //         XLSX.writeFile(workbook, 'SpareCondemnationExport.xlsx');
    //     }
    // };

    return (
        <Box>
            {modalFlag === 1 ?
                <CondemSubmitionModal open={modalOpen}
                    setmodalOpen={setmodalOpen}
                    setmodalFlag={setmodalFlag}
                />
                : null}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', py: 0.5, pr: 1 }}>
                <CusIconButton variant="outlined" size="sm" color="warning" background="warning" onClick={SubmitForCondem}>
                    <Box sx={{ px: 1 }}>
                        Submit for Condemnation
                    </Box>
                </CusIconButton>
            </Box>

            {SpareCodm.length !== 0 ? (
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
                            <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 12 }}>Spare No.</Box>
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
                                            < Box sx={{ width: 100, color: '#444444', fontSize: 14, }}>
                                                {val.spare_asset_no
                                                    ? `${val.spare_asset_no}/${(val.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
                                                    : `${val.item_asset_no}/${(val.item_asset_no_only ?? 0).toString().padStart(6, '0')}`}
                                            </Box>
                                            <Box sx={{ flex: 1, color: '#444444', fontSize: 14 }}>{val.category_name}</Box>
                                            <Box sx={{ flex: 3, color: '#444444', fontSize: 14, pl: 6 }}>{val.item_name}</Box>
                                            <Box sx={{ flex: 2, color: '#444444', fontSize: 14, pl: 6 }}>{val.condm_transf_remarks}</Box>
                                            <Box sx={{ width: 145, fontWeight: 600, color: '#444444', fontSize: 12, pl: .5 }}>{val.condm_trans_emp}</Box>
                                            <Box sx={{ width: 145, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                                                {val.deleted_date
                                                    ? format(new Date(val.deleted_date), 'dd MMM yyyy,  hh:mm a')
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
    );
};
export default memo(SpareCondemnation);





// import React, { memo, useMemo, useState, useEffect } from 'react';
// import { Box, Checkbox, Switch, Typography } from '@mui/joy';
// import { useQuery } from 'react-query';
// import { Virtuoso } from 'react-virtuoso';
// import { getSpareUnderCondmnation } from 'src/api/AssetApis';
// import CusIconButton from 'src/views/Components/CusIconButton';
// import DownloadIcon from '@mui/icons-material/Download';
// import { useDispatch } from 'react-redux';
// import * as XLSX from 'xlsx';

// const SpareCondemnation = ({ empdept }) => {
//     const dispatch = useDispatch();

//     const { data: SpareCodmnation } = useQuery({
//         queryKey: ['getSpareUnderCondmnation', empdept],
//         queryFn: () => getSpareUnderCondmnation(empdept),
//     });

//     const SpareCodm = useMemo(() => SpareCodmnation || [], [SpareCodmnation]);

//     const [selectedRows, setSelectedRows] = useState([]);
//     const [sortedData, setSortedData] = useState(SpareCodm);
//     const [selectAll, setSelectAll] = useState(false);

//     const [markedRows, setMarkedRows] = useState({});

//     useEffect(() => {
//         setSortedData(SpareCodm);
//     }, [SpareCodm]);

//     const handleRowSelection = (slno) => {
//         setSelectedRows((prevSelected) => {
//             if (prevSelected.includes(slno)) {
//                 return prevSelected.filter((id) => id !== slno);
//             }

//             return [...prevSelected, slno];
//         });
//     };

//     const handleSelectAllChange = () => {
//         setSelectAll((prev) => !prev);
//         if (!selectAll) {
//             setSelectedRows(SpareCodm.map((item) => item.slno));
//         } else {
//             setSelectedRows([]);
//         }
//     };

//     const exportToExcel = () => {
//         if (selectedRows.length === 0) {
//             return alert('No Data Selected for Export');
//         }

//         const selectedData = SpareCodm.filter((item) => selectedRows.includes(item.slno));
//         const exportData = selectedData.map(({ slno, category_name, item_name, spare_asset_no }) => ({
//             'Spare No': spare_asset_no,
//             Category: category_name,
//             'Item Name': item_name,
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(exportData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Spares');

//         XLSX.writeFile(workbook, 'SpareCondemnationExport.xlsx');
//     };

//     const handleToggleMark = (slno) => {
//         setMarkedRows((prevMarked) => ({
//             ...prevMarked,
//             [slno]: !prevMarked[slno],
//         }));
//     };

//     useEffect(() => {
//         const sorted = [...SpareCodm].sort((a, b) => {
//             const aSelected = selectedRows.includes(a.slno);
//             const bSelected = selectedRows.includes(b.slno);
//             const aMarked = markedRows[a.slno];
//             const bMarked = markedRows[b.slno];

//             if (aSelected && aMarked && !(bSelected && bMarked)) return -1;
//             if (bSelected && bMarked && !(aSelected && aMarked)) return 1;
//             if (aSelected && !bSelected) return -1;
//             if (bSelected && !aSelected) return 1;
//             if (!aSelected && aMarked && (!bSelected || !bMarked)) return 1;
//             if (!bSelected && bMarked && (!aSelected || !aMarked)) return -1;

//             return 0;
//         });

//         setSortedData(sorted);
//     }, [SpareCodm, selectedRows, markedRows]);



//     return (
//         <Box>
//             <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', py: 0.5, pr: 1 }}>
//                 <CusIconButton variant="outlined" size="sm" color="success" onClick={exportToExcel}>
//                     <DownloadIcon />
//                 </CusIconButton>
//             </Box>

//             {SpareCodm.length !== 0 ? (
//                 <Box sx={{ overflow: 'auto', px: 1, flex: 1 }}>
//                     <Box>
//                         <Box
//                             sx={{
//                                 height: 45,
//                                 display: 'flex',
//                                 borderBottom: 1,
//                                 borderTop: 1,
//                                 borderColor: 'lightgray',
//                                 pt: 1.5,
//                                 bgcolor: 'white',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <Checkbox
//                                 checked={selectAll}
//                                 onChange={handleSelectAllChange}
//                                 sx={{ pl: 1, pr: 2 }}
//                             />
//                             <Box sx={{ width: '118px', fontWeight: 600, color: '#444444', fontSize: 12 }}></Box>
//                             <Box sx={{ flex: 2, fontWeight: 600, color: '#444444', fontSize: 12 }}>Spare No.</Box>
//                             <Box sx={{ flex: 3, fontWeight: 600, color: '#444444', fontSize: 12 }}>Category</Box>
//                             <Box sx={{ flex: 8, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>
//                                 Item Name
//                             </Box>
//                         </Box>

//                         <Box sx={{ width: '100%', overflow: 'auto' }}>
//                             <Virtuoso
//                                 style={{ height: '70vh' }}
//                                 totalCount={sortedData.length}
//                                 itemContent={(index) => {
//                                     const val = sortedData[index];
//                                     const isSelected = selectedRows.includes(val.slno);
//                                     const isMarked = markedRows[val.slno];

//                                     return (
//                                         <Box
//                                             key={val.slno}
//                                             sx={{
//                                                 display: 'flex',
//                                                 mt: 0.3,
//                                                 borderBottom: 0.5,
//                                                 borderColor: 'lightgrey',
//                                                 minHeight: 30,
//                                                 maxHeight: 80,
//                                                 background: isMarked ? 'lightgray' : isSelected ? '#e0f7fa' : val.hold_color,
//                                                 transition: 'transform 0.3s ease',
//                                                 transform: isSelected ? 'translateY(-5px)' : 'translateY(0)',
//                                                 alignItems: 'center',
//                                             }}
//                                         >
//                                             <Checkbox
//                                                 checked={isSelected}
//                                                 onChange={() => handleRowSelection(val.slno)}
//                                                 sx={{ pl: 1, pr: 2 }}
//                                             />

//                                             <Switch
//                                                 checked={!!isMarked}
//                                                 color="neutral"
//                                                 variant={isMarked ? "soft" : "solid"}
//                                                 onChange={() => handleToggleMark(val.slno)}
//                                                 slotProps={{
//                                                     track: {
//                                                         children: (
//                                                             <>
//                                                                 {isMarked ? <Typography sx={{ ml: '23px', fontSize: 14, fontWeight: 600 }}>
//                                                                     Marked
//                                                                 </Typography>
//                                                                     : <Typography sx={{ ml: '30px', fontSize: 13, fontWeight: 600, color: 'white' }}>
//                                                                         Not Marked
//                                                                     </Typography>}
//                                                             </>
//                                                         ),
//                                                     },
//                                                 }}
//                                                 sx={{
//                                                     '--Switch-thumbSize': '21px',
//                                                     '--Switch-trackWidth': '114px',
//                                                     '--Switch-trackHeight': '25px',
//                                                     mr: 1.5
//                                                 }}
//                                             />
//                                             <Box sx={{ flex: 2, color: '#444444', fontSize: 14 }}>
//                                                 {val.spare_asset_no
//                                                     ? `${val.spare_asset_no}/${(val.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
//                                                     : `${val.item_asset_no}/${(val.item_asset_no_only ?? 0).toString().padStart(6, '0')}`}
//                                             </Box>
//                                             <Box sx={{ flex: 3, color: '#444444', fontSize: 14 }}>{val.category_name}</Box>
//                                             <Box sx={{ flex: 8, color: '#444444', fontSize: 14, pl: 6 }}>{val.item_name}</Box>
//                                         </Box>
//                                     );
//                                 }}
//                             />
//                         </Box>
//                     </Box>
//                 </Box>
//             ) : (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flex: 1,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         pt: 25,
//                         fontWeight: 800,
//                         fontSize: 25,
//                         color: 'lightgrey',
//                         height: '100%',
//                     }}
//                 >
//                     Empty List
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default memo(SpareCondemnation);
