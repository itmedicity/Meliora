import React, { useState, memo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import { IconButton } from '@mui/material'
import { editicon } from 'src/color/Color'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import { useQuery } from '@tanstack/react-query'
import { getMeLInchHODAuthorization } from 'src/api/CommonApi'

const AuthorizationMastTableMeliora = ({ rowSelect }) => {
    //state for setting table data
    //column title setting
    const [column] = useState([
        { headerName: 'SlNo', field: 'mel_authorization_slno' },
        { headerName: 'Department Section', field: 'auth_deptsec', filter: 'true' },
        { headerName: 'Authorization Post', field: 'postauth', filter: 'true' },
        { headerName: 'Authorization Emp Deptsec', field: 'emp_deptsec', filter: 'true' },
        { headerName: 'Incharge/HOD Name', field: 'employee', filter: 'true' },

        {
            headerName: 'Delete',
            width: 100,
            cellRenderer: params => (
                <IconButton onClick={() => rowSelect(params)} sx={{ color: editicon, pt: 0 }}>
                    <CustomeToolTip title="Delete">
                        <DeleteIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
            )
        }
    ])


    const {
        data: compData,
        isLoading: isCompLoading,
        error: compError
    } = useQuery({
        queryKey: ['getMelioraInchHODAuthorization'],
        queryFn: () => getMeLInchHODAuthorization(),
        staleTime: Infinity
    })

    if (isCompLoading) return <p>Loading...</p>
    if (compError) return <p>Error Occurred.</p>

    return (
        <CusAgGridForMain columnDefs={column} tableData={compData} onClick={rowSelect} />
    )
}

export default memo(AuthorizationMastTableMeliora)