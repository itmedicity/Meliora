import React, { useState, memo, Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color'
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
const DietMenuSettCmp = ({ dataPost, setdataPost }) => {
    const [deleteId, setDelId] = useState(0)
    //Array listing component
    const [column] = useState([
        { headerName: "Diet", field: "dietname" },
        { headerName: "Diet Type ", field: "typename" },
        { headerName: "Day", field: "dayname" },
        { headerName: "Item Group", field: "groupname" },
        { headerName: "Item", field: "itemname" },
        {
            headerName: 'Delete',
            cellRenderer: params =>
                <IconButton
                    sx={{ color: editicon, paddingY: 0.5 }}
                    onClick={() => rowSelect(params)} >
                    <DeleteIcon size={25} />
                </IconButton >
        },
    ])
    //array data delete
    const rowSelect = (params) => {
        const data = params.api.getSelectedRows()
        const { id } = data[0]
        setDelId(id);
    }
    useEffect(() => {
        if (deleteId !== 0) {
            const newdata = [...dataPost]
            const index = dataPost.findIndex((arraid) => arraid.id === deleteId)
            newdata.splice(index, 1);
            setdataPost(newdata)
        }
    }, [deleteId, dataPost, setdataPost])

    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={dataPost}
            />
        </Fragment>
    )
}

export default memo(DietMenuSettCmp)