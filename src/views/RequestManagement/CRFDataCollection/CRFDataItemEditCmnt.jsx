import React, { memo, Fragment, useEffect, useState, useCallback } from 'react'
import { editicon } from 'src/color/Color'
import DeleteIcon from '@mui/icons-material/Delete'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify } from 'src/views/Common/CommonCode'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const CRFDataItemEditCmnt = ({ reqslno }) => {
  const [dataPost, setdataPost] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const InsertFun = async reqslno => {
      const result = await axioslogin.get(`/requestRegister/getItemListDataCollect/${reqslno}`)
      const { success, data } = result.data
      if (success === 1) {
        setdataPost(data)
      } else {
        setdataPost([])
      }
    }
    InsertFun(reqslno)
  }, [reqslno, setdataPost, count])
  const [editValue, setEditValue] = useState(0)
  const [itemstate, setItemState] = useState({
    item_slno: '',
    item_desc: '',
    item_brand: '',
    item_qty: '',
    item_unit: '',
    item_spec: '',
    approx_cost: '',
    data_detail_slno: 0
  })

  //Destructuring
  const { item_slno, item_desc, item_brand, item_qty, item_unit, item_spec, approx_cost, data_detail_slno } = itemstate
  const updateItemState = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setItemState({ ...itemstate, [e.target.name]: value })
    },
    [itemstate]
  )

  //array data delete
  const EditData = value => {
    setEditValue(1)
    const { item_slno, item_desc, item_brand, item_qnty, item_unit, item_specification, aprox_cost, data_detail_slno } =
      value
    const frmdata = {
      item_slno: item_slno,
      item_desc: item_desc,
      item_brand: item_brand,
      item_qty: item_qnty,
      item_unit: item_unit,
      item_spec: item_specification,
      approx_cost: aprox_cost === null ? '' : aprox_cost,
      data_detail_slno: data_detail_slno
    }
    setItemState(frmdata)
  }

  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const DeleteData = val => {
    const { data_detail_slno } = val
    const patchdata = {
      data_detail_slno: data_detail_slno,
      delete_user: id
    }
    const deleteItem = async patchdata => {
      const result = await axioslogin.patch('/requestRegister/DeleteItemList', patchdata)
      const { success, message } = result.data
      if (success === 1) {
        succesNotify(message)
      }
    }
    deleteItem(patchdata)
  }

  const Patchdata = useMemo(() => {
    return {
      item_slno: item_slno,
      item_desc: item_desc,
      item_brand: item_brand,
      item_qnty: item_qty,
      item_unit: item_unit,
      item_specification: item_spec,
      aprox_cost: approx_cost,
      edit_user: id,
      data_detail_slno: data_detail_slno
    }
  }, [item_slno, item_desc, item_brand, item_qty, item_unit, item_spec, approx_cost, data_detail_slno, id])

  const AddItem = useCallback(() => {
    const editItem = async Patchdata => {
      const result = await axioslogin.patch('/requestRegister/EditItemList', Patchdata)
      const { success, message } = result.data
      if (success === 1) {
        succesNotify(message)
        setCount(count + 1)
        const cleardata = {
          item_slno: '',
          item_desc: '',
          item_brand: '',
          item_qty: '',
          item_unit: '',
          item_spec: '',
          approx_cost: '',
          req_detl_slno: 0
        }
        setItemState(cleardata)
        setEditValue(0)
      }
    }
    editItem(Patchdata)
  }, [count, setCount, Patchdata])

  return (
    <Fragment>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box>
          <TableContainer sx={{ maxHeight: 250 }}>
            <Table size="small" stickyHeader aria-label="sticky table" sx={{ border: '0.2px solid' }}>
              <TableHead sx={{ border: '1px ' }}>
                <TableRow>
                  <TableCell align="center">Slno</TableCell>
                  <TableCell align="left"> Description</TableCell>
                  <TableCell align="center">Req. Brand</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="center">Unit</TableCell>
                  <TableCell align="center">Specification</TableCell>
                  <TableCell align="center">approx.cost </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataPost &&
                  dataPost.map((val, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          maxHeight: 60,
                          minHeight: 5
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{val.item_desc}</TableCell>
                        <TableCell align="center">{val.item_brand}</TableCell>
                        <TableCell align="center">{val.item_qnty}</TableCell>
                        <TableCell align="center">{val.item_unit}</TableCell>
                        <TableCell align="center">{val.item_specification}</TableCell>
                        <TableCell align="center">{val.aprox_cost}</TableCell>
                        <TableCell align="center">
                          <IconButton sx={{ color: editicon, paddingY: 0.01 }} onClick={() => EditData(val)}>
                            <EditOutlinedIcon size={6} />
                          </IconButton>
                          <IconButton sx={{ color: editicon, paddingY: 0.01 }} onClick={() => DeleteData(val)}>
                            <DeleteIcon size={6} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {editValue === 1 ? (
          <Box
            sx={{
              width: '80%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CustomPaperTitle heading="Estimate/Approximate/Requirement Details" />
            <Box
              sx={{
                width: '100%',
                p: 1,
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  pr: 1,
                  flexDirection: 'column'
                }}
              >
                <CustomPaperTitle heading="Item Description" />
                <TextFieldCustom type="text" size="sm" name="item_desc" value={item_desc} onchange={updateItemState} />
              </Box>

              <Box
                sx={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'column',
                  pr: 1
                }}
              >
                <CustomPaperTitle heading="Item Brand" />
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="item_brand"
                  value={item_brand}
                  onchange={updateItemState}
                />
              </Box>

              <Box
                sx={{
                  width: '10%',
                  display: 'flex',
                  flexDirection: 'column',
                  pr: 1
                }}
              >
                <CustomPaperTitle heading="Quantity" />
                <TextFieldCustom type="text" size="sm" name="item_qty" value={item_qty} onchange={updateItemState} />
              </Box>
              <Box
                sx={{
                  width: '15%',
                  display: 'flex',
                  flexDirection: 'column',
                  pr: 1
                }}
              >
                <CustomPaperTitle heading="Unit" />
                <TextFieldCustom type="text" size="sm" name="item_unit" value={item_unit} onchange={updateItemState} />
              </Box>
              <Box
                sx={{
                  width: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  pr: 1
                }}
              >
                <CustomPaperTitle heading="Specification" />
                <TextFieldCustom type="text" size="sm" name="item_spec" value={item_spec} onchange={updateItemState} />
              </Box>
              <Box
                sx={{
                  width: '7%',
                  display: 'flex',
                  flexDirection: 'column',
                  pr: 1
                }}
              >
                <CustomPaperTitle heading="Approx.Cost" />
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="approx_cost"
                  value={approx_cost}
                  onchange={updateItemState}
                />
              </Box>
              <Box
                sx={{
                  width: '7%',
                  pt: 2
                }}
              >
                <IconButton variant="outlined" color="primary" onClick={AddItem}>
                  <MdOutlineAddCircleOutline size={30} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Fragment>
  )
}

export default memo(CRFDataItemEditCmnt)
