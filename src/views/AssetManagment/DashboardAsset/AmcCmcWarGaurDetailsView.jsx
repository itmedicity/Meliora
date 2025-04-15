import { Box, Table } from '@mui/joy'
import React, { useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton';
import { format } from 'date-fns';

const AmcCmcWarGaurDetailsView = ({ setDetailOpen, detailArray, setDetailArray }) => {

    const DetailViewClose = useCallback(() => {
        setDetailOpen(0)
        setDetailArray([])
    }, [])


    return (
        <Box>
            <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: 'lightgrey' }}  >
                <Box sx={{ flex: 1, pt: .5, pl: 1, fontWeight: 550, color: 'grey' }}>
                    Details
                </Box>
                <CusIconButton size="sm" variant="outlined" clickable="true" onClick={DetailViewClose} >
                    <CloseIcon fontSize='small' sx={{ color: '#055C9D' }} />
                </CusIconButton>
            </Box>
            <Table stickyHeader size='sm'
                sx={{ borderRadius: 2, ml: 1, my: 1.5, width: '99%' }} borderAxis='both' >
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', width: 10 }}>
                            #
                        </th>
                        <th style={{ textAlign: 'center', width: 20 }}>
                            Service Agreement
                        </th>
                        <th style={{ textAlign: 'center', width: 20 }}>
                            Item No.
                        </th>
                        <th style={{ textAlign: 'center', width: 40 }}>
                            Item Name
                        </th>
                        <th style={{ textAlign: 'center', width: 30 }}>
                            Supplier
                        </th>
                        <th style={{ textAlign: 'center', width: 15 }}>
                            From Date
                        </th>
                        <th style={{ textAlign: 'center', width: 15 }}>
                            To date
                        </th>

                    </tr>
                </thead>
                <tbody >
                    {detailArray?.map((val, index) => {
                        const assetNo = val.item_asset_no_only != null
                            ? `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`
                            : `${val.spare_asset_no}/${val.spare_asset_no_only?.toString().padStart(6, '0') ?? ''}`;

                        return (
                            <tr
                                key={index}>
                                <td style={{ textAlign: 'center', }}>{index + 1}</td>

                                <td style={{ textAlign: 'center', }}>
                                    {val.service_agreement}
                                </td>
                                <td style={{ textAlign: 'center', }}>
                                    {assetNo}
                                </td>
                                <td style={{ textAlign: 'center', }}>
                                    {val.item_name !== undefined ?
                                        <>
                                            {val.item_name}
                                        </> :
                                        <>
                                            {val.item_spare}
                                        </>}
                                </td>
                                <td style={{ textAlign: 'center', }}>
                                    {val.it_supplier_name || val.address}
                                </td>
                                <td style={{ textAlign: 'center', }}>
                                    {val.from_date
                                        ? format(new Date(val.from_date), 'dd MMM yyyy')
                                        : 'Invalid Date'}
                                </td>
                                <td style={{ textAlign: 'center', }}>

                                    {val.to_date
                                        ? format(new Date(val.to_date), 'dd MMM yyyy')
                                        : 'Invalid Date'}
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>



        </Box>
    )
}

export default AmcCmcWarGaurDetailsView