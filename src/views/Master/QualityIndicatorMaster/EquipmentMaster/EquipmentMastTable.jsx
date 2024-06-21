import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditButton from 'src/views/Components/EditButton'
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from '@mui/joy';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
// import ModalProcedure from './ModalProcedure';

const EquipmentMastTable = ({ rowSelect, count }) => {
    const [tabledata, setTabledata] = useState([])
    // const [modalopen, setModalOpen] = useState(false)
    // const [modFlag, setModFlag] = useState(0)
    // const [viewProcedures, setViewProcedures] = useState([])
    useEffect(() => {
        const getEquipment = async () => {
            const result = await axioslogin.get('/equipMast/select')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
            }
        }
        getEquipment();
    }, [count])
    // const handleClose = useCallback(() => {
    //     setModalOpen(false)
    // }, [setModalOpen])

    // const ViewProcedure = useCallback((params) => {
    //     const data = params.api.getSelectedRows()
    //     const newData = data?.map((val) => {
    //         return {
    //             procedure_names: val.procedure_names
    //         }
    //     })
    //     const proc = JSON?.parse(newData[0]?.procedure_names)
    //     setViewProcedures(proc)
    //     setModFlag(1)
    //     setModalOpen(true)

    // }, [])

    const [column] = useState([
        { headerName: "Sl.No", field: "equip_no", width: 65, wrapText: true },
        { headerName: "Equipment Name", field: "equip_name", width: 150, filter: "true", wrapText: true },
        { headerName: "Department", field: "qi_dept_desc", width: 200, filter: "true" },
        { headerName: "Procedure", field: "procname", width: 200, filter: "true", autoHeight: true, wrapText: true },
        // { width: 30, cellRenderer: (params) => <VisibilityIcon onClick={() => ViewProcedure(params)} /> },
        { headerName: "Asset No.", field: "asset_no", width: 100, filter: "true" },
        { headerName: "Status", field: "status", width: 70, },
        {
            headerName: 'Action',
            width: 70, cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />
        },
    ])
    return (
        <Box>
            {/* <>
                {modFlag === 1 ? <ModalProcedure open={modalopen} viewProcedures={viewProcedures} handleClose={handleClose} /> : null}
            </> */}
            <CusAgGridForMain
                columnDefs={column}
                tableData={tabledata}
                onClick={rowSelect}
            />
        </Box>
    )
}

export default memo(EquipmentMastTable)







