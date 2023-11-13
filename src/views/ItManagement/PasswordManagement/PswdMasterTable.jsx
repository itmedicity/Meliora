import React, { Fragment, memo } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import EditIcon from '@mui/icons-material/Edit'
import { Paper } from '@mui/material';

const PswdMasterTable = ({ rowSelect, tabledata }) => {
    // const [tabledata, setTabledata] = useState([])
    // useEffect(() => {
    //     const getMasterTable = async () => {
    //         const result = await axioslogin.get('PasswordManagementMain/masterView')
    //         const { success, data } = result.data
    //         if (success === 2) {
    //             const arr = data?.map((val) => {
    //                 const obj = {
    //                     pswd_mast_slno: val.pswd_mast_slno,
    //                     pswd_mast_asset_no: val.pswd_mast_asset_no,
    //                     pswd_mast_categry_name: val.category_name,
    //                     pswd_mast_group_name: val.group_name,
    //                     pswd_mast_item_name: val.item_name,
    //                     pswd_mast_categry_no: val.category_slno,
    //                     pswd_mast_group_no: val.group_slno,
    //                     pswd_mast_item_no: val.item_creation_slno,
    //                     pswd_mast_location: val.sec_id,
    //                     pswd_mast_location_name: val.sec_name,
    //                     pswd_mast_description: val.pswd_mast_description,

    //                 }
    //                 return obj
    //             })
    //             setTabledata(arr)
    //         } else {
    //             warningNotify('error occured')
    //         }
    //     }
    //     getMasterTable()
    // }, [count])

    return (
        <Fragment>
            <Paper variant="outlined" sx={{ maxHeight: '100%', maxWidth: '100%', overflow: 'auto', }}>
                <CssVarsProvider>
                    <Table padding={"none"} stickyHeader
                        hoverRow>
                        <thead>
                            <tr >
                                <th style={{ width: 60 }} >Action</th>
                                <th style={{ width: 50 }}>SlNo</th>
                                <th style={{ width: 100 }}>Asset No.</th>
                                <th style={{ width: 150 }}>Category</th>
                                <th style={{ width: 150 }}>Group</th>
                                <th style={{ width: 500 }}>Device Name</th>
                                <th style={{ width: 150 }}>Location</th>
                                <th style={{ width: 250 }}>Device Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabledata?.map((val, index) => {
                                return (
                                    <tr
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                            minHeight: 5
                                        }}
                                    >
                                        <td>
                                            <EditIcon
                                                sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelect(val)}
                                            />
                                        </td>
                                        <td> {index + 1}</td>
                                        <td> {val.pswd_mast_asset_no || 'not given'}</td>
                                        <td> {val.pswd_mast_categry_name || 'not given'}</td>
                                        <td> {val.pswd_mast_group_name || 'not given'}</td>
                                        <td> {val.pswd_mast_item_name || 'not given'}</td>
                                        <td> {val.pswd_mast_location_name || 'not given'}</td>
                                        <td> {val.pswd_mast_description || 'not given'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CssVarsProvider>
            </Paper>
        </Fragment>
    )
}

export default memo(PswdMasterTable)