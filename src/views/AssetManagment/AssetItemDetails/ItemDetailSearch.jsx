import { Box, Button } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName'
import AmDeptSecSelectSpare from 'src/views/CommonSelectCode/AmDeptSecSelectSpare'
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName'
import AmItemDeptSecBsedWOName from 'src/views/CommonSelectCode/AmItemDeptSecBsedWOName'
import AmSpareItemListDeptSecBsed from 'src/views/CommonSelectCode/AmSpareItemListDeptSecBsed'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { getCustodianDetails } from 'src/api/AssetApis'
import { useQuery } from 'react-query'
import RefreshIcon from '@mui/icons-material/Refresh'
const ItemListViewTable = React.lazy(() => import('../ItemListView/ItemListViewTable'))

const ItemDetailSearch = ({ assetSpare, AddDetails, count }) => {
  const dispatch = useDispatch()
  const [department, setDepartment] = useState(0)
  const [deptsec, setDeptSec] = useState(0)
  const [item, setItem] = useState(0)
  const [serialno, setSerailno] = useState('')
  const [Assetno, setAssetno] = useState('')
  const [flag, setFlag] = useState(0)
  const [displayarry, setDisArry] = useState([])
  const [custFirstName, setcustFirstName] = useState('')
  const [custSecName, setcustSecName] = useState('')
  const [spareNo, setspareNo] = useState('')

  const updateSerialno = useCallback(e => {
    setSerailno(e.target.value)
  }, [])

  const updateAssetno = useCallback(e => {
    setAssetno(e.target.value)
  }, [])
  const updateSpareno = useCallback(e => {
    setspareNo(e.target.value)
  }, [])

  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  const { data: itemDetails, isSuccess } = useQuery({
    queryKey: ['getCustodianItemDetails', empdept],
    enabled: empdept !== 0,
    queryFn: () => getCustodianDetails(empdept),
  })

  const custodianDetails = useMemo(() => itemDetails, [itemDetails])
  const itemNo = `${custFirstName}/${custSecName}`
  const ItemSpare = `SP/${custSecName}`
  const [custodianSlno, setcustodianSlno] = useState(0)

  useEffect(() => {
    if (isSuccess && custodianDetails && custodianDetails.length > 0) {
      const { am_custdn_asset_no_first, am_custdn_asset_no_second, am_custodian_slno } =
        custodianDetails[0]
      setcustFirstName(am_custdn_asset_no_first)
      setcustSecName(am_custdn_asset_no_second)
      setcustodianSlno(am_custodian_slno)
    }
  }, [isSuccess, custodianDetails])

  const postdata = useMemo(() => {
    return {
      item_asset_no: Assetno ? itemNo : null,
      item_asset_no_only: Assetno !== undefined ? Assetno : null,
      item_dept_slno: department !== undefined ? department : 0,
      item_deptsec_slno: deptsec !== undefined ? deptsec : 0,
      item_creation_slno: item !== undefined ? item : 0,
      am_manufacture_no: serialno !== undefined ? serialno : null,
      custodianSlno: custodianSlno,
    }
  }, [department, deptsec, item, itemNo, Assetno, serialno, custodianSlno])

  const postdataSpare = useMemo(() => {
    return {
      spare_asset_no: spareNo ? ItemSpare : null,
      spare_asset_no_only: spareNo !== undefined ? spareNo : null,
      spare_dept_slno: department !== undefined ? department : 0,
      spare_deptsec_slno: deptsec !== undefined ? deptsec : 0,
      spare_creation_slno: item !== undefined ? item : 0,
      am_manufacture_no: serialno !== undefined ? serialno : null,
      custodianSlno: custodianSlno,
    }
  }, [department, deptsec, item, spareNo, serialno, custodianSlno, ItemSpare])

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  const resett = useCallback(() => {
    setDepartment(0)
    setDeptSec(0)
    setItem(0)
    setSerailno('')
    setAssetno('')
    setDisArry([])
    setspareNo('')
  }, [])

  const search = useCallback(() => {
    const getdata = async postdata => {
      const result = await axioslogin.post(`/itemCreationDeptmap/getItemsFronList`, postdata)
      const { success, data } = result.data
      if (success === 1) {
        setDisArry(data)
        setFlag(1)
      } else {
        warningNotify('No data for Selected Condition')
        setDisArry([])
        setFlag(0)
        setSerailno('')
      }
    }
    const getdataSpareItem = async postdataSpare => {
      const result = await axioslogin.post(
        `/itemCreationDeptmap/getSpareItemsFronList`,
        postdataSpare
      )
      const { success, data } = result.data
      if (success === 1) {
        setDisArry(data)
        setFlag(1)
      } else {
        warningNotify('No data for Selected Condition')
        setDisArry([])
        setFlag(0)
        setSerailno('')
      }
    }

    if (assetSpare === 1) {
      getdata(postdata)
    } else {
      getdataSpareItem(postdataSpare)
    }
  }, [postdata, postdataSpare, assetSpare])

  return (
    <Box>
      <Box sx={{ m: 1, border: 1, p: 1, borderColor: '#D0D0D0' }}>
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
          }}
        >
          <Box sx={{ flex: 0.5 }}>
            <TextComponent
              text={'Serial No.'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
            ></TextComponent>
            <TextFieldCustom
              placeholder={'search serial no.'}
              type="text"
              size="sm"
              name="serialno"
              value={serialno}
              onchange={updateSerialno}
              inputProps={{ maxLength: 6 }}
              style={{ '--Input-minHeight': '29px' }}
            ></TextFieldCustom>
          </Box>
          {assetSpare === 1 ? (
            <Box sx={{ flex: 0.5 }}>
              <TextComponent
                text={'Asset No.'}
                sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
              ></TextComponent>
              <TextFieldCustom
                startDecorator={
                  <Button variant="plain" color="neutral" sx={{ borderRadius: 0, p: 0, ml: 0.5 }}>
                    {`${custFirstName}/${custSecName}/`}
                  </Button>
                }
                placeholder={'000000'}
                type="text"
                size="sm"
                name="Assetno"
                value={Assetno}
                onchange={updateAssetno}
                style={{ '--Input-minHeight': '29px' }}
              ></TextFieldCustom>
            </Box>
          ) : (
            <Box sx={{ flex: 0.5 }}>
              <TextComponent
                text={'Spare No.'}
                sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
              ></TextComponent>
              <TextFieldCustom
                startDecorator={
                  <Button variant="plain" color="neutral" sx={{ borderRadius: 0, p: 0, ml: 0.5 }}>
                    {`SP/${custSecName}/`}
                  </Button>
                }
                placeholder={'000000'}
                type="text"
                size="sm"
                name="spareNo"
                value={spareNo}
                onchange={updateSpareno}
                style={{ '--Input-minHeight': '29px' }}
              ></TextFieldCustom>
            </Box>
          )}
          <Box sx={{ flex: 0.5 }}>
            <TextComponent
              text={'Department'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
            ></TextComponent>
            <AmDepartmentSelWOName department={department} setDepartment={setDepartment} />
          </Box>
          <Box sx={{ flex: 0.5 }}>
            <TextComponent
              text={'Section'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
            ></TextComponent>
            {assetSpare === 1 ? (
              <AmDeptSecSelectWOName deptsec={deptsec} setDeptSec={setDeptSec} />
            ) : (
              <AmDeptSecSelectSpare deptsec={deptsec} setDeptSec={setDeptSec} />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={'Item Name'}
              sx={{ color: 'black', fontWeight: 500, pl: 0.5 }}
            ></TextComponent>
            {assetSpare === 1 ? (
              <AmItemDeptSecBsedWOName item={item} setItem={setItem} />
            ) : (
              <AmSpareItemListDeptSecBsed item={item} setItem={setItem} />
            )}
          </Box>
          <Box sx={{ flex: 0.5, display: 'flex', gap: 0.5 }}>
            <Box sx={{ pt: 2.4 }}>
              <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search}>
                <SearchOutlinedIcon fontSize="small" />
              </CusIconButton>
            </Box>
            <Box sx={{ pt: 2.4 }}>
              <CusIconButton size="sm" variant="outlined" clickable="true" onClick={resett}>
                <RefreshIcon fontSize="small" />
              </CusIconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      {flag === 1 ? (
        <Box sx={{ m: 1, border: 1, p: 0.5, borderColor: '#D0D0D0' }}>
          <ItemListViewTable
            assetSpare={assetSpare}
            displayarry={displayarry}
            AddDetails={AddDetails}
            count={count}
          />
        </Box>
      ) : null}
    </Box>
  )
}

export default memo(ItemDetailSearch)
