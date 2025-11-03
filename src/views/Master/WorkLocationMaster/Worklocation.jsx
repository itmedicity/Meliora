import { useQuery } from '@tanstack/react-query'
import React, { memo, useMemo, useState } from 'react'
import { getlocationItems } from 'src/api/CommonApi'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const Worklocation = ({ rowSelect }) => {
    const [column] = useState([
        { headerName: 'location Id', field: 'work_location_Id' },
        { headerName: 'Work Location', field: 'work_location_name', width: 250, filter: 'true' },
        { headerName: 'Building', field: 'rm_building_name', width: 350, filter: 'true' },

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
        queryKey: 'getlocationItems',
        queryFn: () => getlocationItems(),
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

export default memo(Worklocation)