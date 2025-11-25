import { Box, Table } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import CusIconButton from 'src/views/Components/CusIconButton'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify } from 'src/views/Common/CommonCode'
import BillDetailsAdding from './BillDetailsAdding'
import { getallSpareUnderAsset } from 'src/api/AssetApis'
import { useQuery } from '@tanstack/react-query'

const ItemGRNandBill = ({ detailArry, grndetailarry, assetSpare, count, setCount, }) => {
  const { am_spare_item_map_slno, am_item_map_slno } = detailArry
  const { am_grn_no, am_grn_date } = grndetailarry
  const [AllSparesUnderAsset, setAllSparesUnderAsset] = useState([])


  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [userdata, setUserdata] = useState({
    grnNo: '',
    grndate: ''
  })

  useEffect(() => {
    if (am_grn_no !== undefined || am_grn_date !== undefined) {
      const frmdata = {
        grnNo: am_grn_no !== null ? am_grn_no : '',
        grndate: am_grn_date !== null ? format(new Date(am_grn_date), 'yyyy-MM-dd') : ''
      }
      setUserdata(frmdata)
    }
  }, [am_grn_no, am_grn_date, count])

  const { grnNo, grndate } = userdata

  const updateGrnDetails = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setUserdata({ ...userdata, [e.target.name]: value })
    },
    [userdata]
  )

  const patchData = useMemo(() => {
    return {
      am_grn_no: grnNo,
      am_grn_date: grndate,
      edit_user: id,
      am_item_map_slno: am_item_map_slno
    }
  }, [grnNo, grndate, id, am_item_map_slno])

  const patchDataSpare = useMemo(() => {
    return {
      am_grn_no: grnNo,
      am_grn_date: grndate,
      edit_user: id,
      am_spare_item_map_slno: am_spare_item_map_slno
    }
  }, [grnNo, grndate, id, am_spare_item_map_slno])

  const reset = () => {
    const frmdata = {
      grnNo: '',
      grndate: ''
    }
    setUserdata(frmdata)
  }

  const EditDetails = useCallback(
    e => {
      e.preventDefault()

      const updateGRNDetails = async patchData => {
        const result = await axioslogin.patch('/ItemMapDetails/GRNDetailsUpdate', patchData)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
        }
      }

      const updateGRNDetailsSpare = async patchDataSpare => {
        const result = await axioslogin.patch('/ItemMapDetails/GRNDetailsUpdateSpare', patchDataSpare)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
        }
      }

      if (assetSpare === 1) {
        updateGRNDetails(patchData)
      } else {
        updateGRNDetailsSpare(patchDataSpare)
      }
    },
    [patchData, assetSpare, setCount, count, patchDataSpare]
  )

  const refreshBilldetail = useCallback(() => {
    reset()
  }, [])


  const { data: allSpareUnderAssetData = [] } = useQuery({
    queryKey: ['getSparess', count],
    queryFn: () => getallSpareUnderAsset(am_item_map_slno)
  })

  const allSpareUnderAsset = useMemo(() => allSpareUnderAssetData, [allSpareUnderAssetData])

  useEffect(() => {
    setAllSparesUnderAsset(allSpareUnderAsset)
  }, [allSpareUnderAsset])






  const formatAmount = (num) =>
    Number(num).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });


  return (
    <Box>
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
        <TextComponent
          text={'GRN DETAILS'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15
          }}
        />

        <Box sx={{ flex: 1, display: 'flex' }}>
          <Box sx={{ width: 500 }}>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <TextComponent
                text={'GRN No'}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  pt: 1,
                  width: 120
                }}
              />
              <Box sx={{ flex: 1 }}>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="grnNo"
                  value={grnNo}
                  onchange={updateGrnDetails}
                ></TextFieldCustom>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <TextComponent
                text={'GRN date'}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  pt: 1,
                  width: 120
                }}
              />
              <Box sx={{ flex: 1 }}>
                <TextFieldCustom
                  type="date"
                  size="sm"
                  name="grndate"
                  value={grndate}
                  onchange={updateGrnDetails}
                ></TextFieldCustom>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Box sx={{ width: 120 }}></Box>
              <Box sx={{ flex: 1, gap: 0.5, display: 'flex' }}>
                <Box>
                  <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails}>
                    <LibraryAddIcon fontSize="small" />
                  </CusIconButton>
                </Box>
                <Box>
                  <CusIconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    clickable="true"
                    onClick={refreshBilldetail}
                  >
                    <RefreshIcon fontSize="small" />
                  </CusIconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Box>
      </Box>
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: 0.5 }}>
        <TextComponent
          text={'BILL DETAILS'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15
          }}
        />
        <Box
          sx={{
            flex: 1,
            py: 1.5
          }}
        >
          <BillDetailsAdding
            detailArry={detailArry}
            assetSpare={assetSpare}
            grndetailarry={grndetailarry}
            count={count}
            setCount={setCount}
          />
        </Box>
      </Box>
      {assetSpare === 1 && AllSparesUnderAsset.length > 0 ? (
        <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, mt: 0.5 }}>
          <TextComponent
            text={'SPARE BILL DETAILS'}
            sx={{
              flex: 1,
              fontWeight: 500,
              color: 'black',
              fontSize: 15,
              ml: 2
            }}
          />
          <Box
            sx={{
              width: '99%',
              p: 1
            }}
          >
            <Table borderAxis="both" size="sm">
              <thead>
                <tr>
                  <th style={{ width: 150, textAlign: 'center' }}>Spare No</th>
                  <th style={{ width: 'auto' }}>Spare Name</th>
                  <th style={{ width: 150, textAlign: 'center' }}>Spare Value</th>
                </tr>
              </thead>

              <tbody>
                {AllSparesUnderAsset?.map((item, index) => {
                  const billAmt = Array.isArray(item.am_bill_amount)
                    ? item.am_bill_amount.reduce((a, b) => a + b, 0)
                    : Number(item.am_bill_amount) || 0;
                  return (
                    <tr key={index}>
                      <td style={{ width: 150, textAlign: "center" }}>
                        {item.spare_asset_no}/
                        {(item.spare_asset_no_only ?? 0).toString().padStart(6, "0")}
                      </td>
                      <td style={{ width: "auto" }}>{item.item_name}</td>
                      <td style={{ width: 150, textAlign: "center" }}>
                        {billAmt}
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ background: '#f0f0f0', fontWeight: 'bold' }}>
                  <td colSpan={2} style={{ textAlign: 'left', paddingLeft: 10 }}>
                    Total Amount :
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {formatAmount(
                      AllSparesUnderAsset.reduce((sum, item) => {
                        const val = Array.isArray(item.am_bill_amount)
                          ? item.am_bill_amount.reduce((a, b) => a + b, 0)
                          : Number(item.am_bill_amount) || 0;
                        return sum + val;
                      }, 0)
                    )}
                  </td>


                </tr>

              </tbody>
            </Table>



          </Box>
        </Box>) : null}
    </Box>
  )
}

export default memo(ItemGRNandBill)
