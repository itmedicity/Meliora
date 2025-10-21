import { useQuery } from '@tanstack/react-query'
import React, { memo, useMemo, useState } from 'react'
import { getDepartmentSectionMaster } from 'src/api/CommonApi'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const MeliDeptSectionMastTable = ({ rowSelect }) => {
    //column title setting
    const [column] = useState([
        { headerName: 'Dep Sec Id', field: 'mel_sec_id' },
        { headerName: 'Department Name', field: 'mel_DeptName', width: 250, filter: 'true' },
        { headerName: ' Department Section', field: 'mel_DeptName' },
        { headerName: 'Outlet', field: 'ouc_desc' },
        { headerName: 'Status', field: 'status_label' },
        {
            headerName: 'Action',
            cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />
        }
    ])

    const {
        data: compData,
        isLoading: isCompLoading,
        error: compError
    } = useQuery({
        queryKey: ['getMelioradepartmentSection'],
        queryFn: () => getDepartmentSectionMaster(),
        // staleTime: Infinity
    })
    const companyData = useMemo(() => {
        return compData?.map(item => ({
            ...item,

            status_label: item.status === 1
                ? 'Active'
                : item.status === 0
                    ? 'Not Active'
                    : 'Not Update',
        }));
    }, [compData]);


    if (isCompLoading) return <p>Loading...</p>
    if (compError) return <p>Error Occurred.</p>
    return (
        <CusAgGridMast columnDefs={column} tableData={companyData} />
    )
}

export default MeliDeptSectionMastTable