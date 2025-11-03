import { useQuery } from '@tanstack/react-query'
import React, { memo, useMemo, useState } from 'react'
import { getDepartmentMaster } from 'src/api/CommonApi'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const MelioraDepMasTable = ({ rowSelect }) => {
    //column title setting
    const [column] = useState([
        { headerName: 'Dep Id', field: 'mel_DepId' },
        { headerName: 'Department Name', field: 'mel_DeptName', width: 250, filter: 'true' },
        { headerName: ' Department Alias', field: 'mel_DepAlias' },
        { headerName: ' Department Type', field: 'mel_dept_type_label' },
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
        queryKey: 'getMelioradepartment',
        queryFn: () => getDepartmentMaster(),
        // staleTime: Infinity
    })
    // const companyData = useMemo(() => compData, [compData])
    const companyData = useMemo(() => {
        return compData?.map(item => ({
            ...item,
            mel_dept_type_label: item.mel_dept_type === 1
                ? 'Clinical'
                : item.mel_dept_type === 2
                    ? 'Non-Clinical'
                    : item.mel_dept_type === 3
                        ? "Accademic" : "Not Updated",
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

export default memo(MelioraDepMasTable)