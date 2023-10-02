import React, { useEffect, memo, useCallback, useState } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Table from '@mui/joy/Table';
import { Paper } from '@mui/material';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
const ItemCountWiseMap = ({ getPostData }) => {

    const [disArry, setDisArry] = useState([])
    const [count, setCount] = useState(0)
    const [tablerender, setTablerender] = useState(0)
    useEffect(() => {
        const getData = async (getPostData) => {
            const result = await axioslogin.post(`/itemCreationDeptmap/getInsertData`, getPostData);
            const { success, data } = result.data
            if (success === 1) {
                setDisArry(data)
            }
            else {
                setDisArry([])
            }
        }
        getData(getPostData)
    }, [getPostData, count])

    const modeldisplay = useCallback(() => {


    }, [])


    const deleteitem = useCallback((val) => {
        const { am_item_map_slno } = val
        const patchdata = {
            am_item_map_slno: am_item_map_slno
        }
        const Inactive = async (patchdata) => {
            const result = await axioslogin.patch('/itemNameCreation/itemInactive', patchdata)
            const { message, success } = result.data
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                setTablerender(tablerender + 1)
            }
            else {
                warningNotify(message)
            }
        }
        Inactive(patchdata)

    }, [count, setCount, tablerender, setTablerender])
    return (
        <Paper sx={{ height: 300, overflow: 'auto' }}>

            {
                tablerender === 0 ?
                    <CssVarsProvider>
                        <Table stickyHeader>
                            <thead>
                                <tr>
                                    <th style={{ width: '10%', align: "center" }}>Sl No</th>
                                    <th style={{ width: '30%', align: "center" }}>Department</th>
                                    <th style={{ width: '30%', align: "center" }}>Department Section</th>
                                    <th style={{ width: '60%', align: "center" }}>Item Name</th>
                                    <th style={{ width: '10%', align: "center" }}>Add Details</th>
                                    <th style={{ width: '10%', align: "center" }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {disArry && disArry.map((val, index) => {
                                    return <tr
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                            minHeight: 5
                                        }}
                                    >
                                        <td> {index + 1}</td>
                                        <td> {val.deptname}</td>
                                        <td> {val.secname}</td>
                                        <td> {val.item_name}</td>
                                        <td>
                                            <PublishedWithChangesOutlinedIcon size={6} onClick={() => modeldisplay(val)} />
                                        </td>
                                        <td><DeleteOutlineIcon size={6} onClick={() => deleteitem(val)} /></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CssVarsProvider>
                    : <CssVarsProvider>
                        <Table stickyHeader>
                            <thead>
                                <tr>
                                    <th style={{ width: '10%', align: "center" }}>Sl No</th>
                                    <th style={{ width: '30%', align: "center" }}>Department</th>
                                    <th style={{ width: '30%', align: "center" }}>Department Section</th>
                                    <th style={{ width: '60%', align: "center" }}>Item Name</th>
                                    <th style={{ width: '10%', align: "center" }}>Add Details</th>
                                    <th style={{ width: '10%', align: "center" }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {disArry && disArry.map((val, index) => {
                                    return <tr
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 }, maxHeight: 60,
                                            minHeight: 5
                                        }}
                                    >
                                        <td> {index + 1}</td>
                                        <td> {val.deptname}</td>
                                        <td> {val.secname}</td>
                                        <td> {val.item_name}</td>
                                        <td>
                                            <PublishedWithChangesOutlinedIcon size={6} onClick={() => modeldisplay(val)} />
                                        </td>
                                        <td><DeleteOutlineIcon size={6} onClick={() => deleteitem(val)} /></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CssVarsProvider>

            }

        </Paper>
    )
}

export default memo(ItemCountWiseMap)