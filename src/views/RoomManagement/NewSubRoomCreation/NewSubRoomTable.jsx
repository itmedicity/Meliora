import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const NewSubRoomTable = ({ count, rowSelect }) => {
    const [tabledata, setTabledata] = useState([])

    const [column] = useState([
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: (params) => <EditButton onClick={() => rowSelect(params)} />,
        },
        { headerName: 'SlNo', field: 'rm_room_slno', wrapText: true, minWidth: 70 },
        { headerName: 'SubRoom Name', field: 'subroom_name', wrapText: true, minWidth: 250 },
        { headerName: 'SubRoom Number', field: 'subroom_no', wrapText: true, minWidth: 150 },
        { headerName: 'Room Name', field: 'rm_room_name', wrapText: true, minWidth: 150 },
        { headerName: 'Status', field: 'status', wrapText: true, minWidth: 100 },

    ])
    useEffect(() => {
        const getFloorData = async () => {
            const result = await axioslogin.get('subRoomMaster/view')
            const { success, data } = result.data
            if (success === 2) {
                setTabledata(data)
            } else {
                warningNotify('error occured')
            }
        }
        getFloorData()
    }, [count])

    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata} />
    )
}

export default memo(NewSubRoomTable)