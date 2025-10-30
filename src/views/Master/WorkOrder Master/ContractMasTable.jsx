import { useQuery } from '@tanstack/react-query'
import React, { memo, useMemo, useState } from 'react'
import { getcontractItems } from 'src/api/CommonApi'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const ContractMasTable = ({ rowSelect }) => {
    const [column] = useState([
        { headerName: 'Contract Id', field: 'contract_id' },
        { headerName: 'Contract Name', field: 'contract_name', width: 250, filter: 'true' },
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
        queryKey: 'getcontractitems',
        queryFn: () => getcontractItems(),
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

export default memo(ContractMasTable)