import React, { useEffect, useState, memo } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
import { useQuery } from '@tanstack/react-query'
import { getDivisionList } from 'src/api/masterApi'

const DivisionMasterTable = ({ count, rowSelect, setCount }) => {
    //column title name setting
    const [column] = useState([
        { headerName: 'SlNo', field: 'division_slno' },
        { headerName: 'Division', field: 'division', filter: 'true' },
        { headerName: 'Status', field: 'status' },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        }
    ])

    // Fetch all division data using useQuery
    const { data: tabledata = [] } = useQuery({
        queryKey: ['getDivisionList', count],
        queryFn: getDivisionList,
    })

    // Reset the count once query is triggered (mimicking the original useEffect behaviour)
    useEffect(() => {
        if (count !== 0) {
            setCount(0)
        }
    }, [count, setCount])

    return (
        <CusAgGridMast columnDefs={column} tableData={tabledata} onClick={rowSelect} />
    )
}

export default memo(DivisionMasterTable)