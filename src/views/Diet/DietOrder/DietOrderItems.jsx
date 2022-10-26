import React, { useState, memo, Fragment, useMemo } from 'react'
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify } from 'src/views/Common/CommonCode';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Checkbox, CssVarsProvider } from '@mui/joy'

const DietOrderItems = ({ date, dmenu, type }) => {
    const [items, setitems] = useState([])
    const d = new Date(date)
    let day = d.getDay();
    const postdata = useMemo(() => {
        return {
            days: day,
            dmenu_slno: dmenu,
            type_slno: type
        }
    }, [day, dmenu, type])

    useEffect(() => {
        const getitem = async (postdata) => {
            const result = await axioslogin.post('/dietorder/getItem/list', postdata);
            const { message, success, data } = result.data;
            if (success === 1) {
                setitems(data)
            }
            else {
                infoNotify(message)
            }
        }
        getitem(postdata)
    }, [postdata])
    const [check, setCheck] = useState(false)

    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 250, m: 2, }}>
                <Table size="small"
                    stickyHeader aria-label="sticky table"

                    sx={{ border: "0.5px solid" }}>
                    <TableHead sx={{ border: "1px solid" }}>
                        <TableRow >
                            <TableCell align="center">Group</TableCell>
                            <TableCell align="center"> Items</TableCell>
                            <TableCell align="center"> Choose</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items && items.map((val) => {
                            //   console.log(dietType);
                            return <TableRow
                                key={val.ddetl_slno}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{val.group_name}</TableCell>
                                <TableCell align="center">{val.item_name}</TableCell>
                                <TableCell align="center">


                                    <CssVarsProvider>
                                        <Checkbox
                                            variant="outlined"
                                            color='primary'
                                            checked={check !== undefined && check !== val.ddetl_slno ? false : true}
                                            onChange={(e) => {
                                                setCheck(e.target.checked === true ? val.ddetl_slno : null)

                                            }}
                                        />

                                    </CssVarsProvider >

                                </TableCell>
                            </TableRow>
                        })}

                    </TableBody>
                </Table>
            </TableContainer>



        </Fragment>
    )
}

export default memo(DietOrderItems)