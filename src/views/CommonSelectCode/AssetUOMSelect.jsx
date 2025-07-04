import React, { memo, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CssVarsProvider, Option, Select } from '@mui/joy/'
import { getUOM } from 'src/redux/actions/AmUOMList.action'

const AssetUOMSelect = ({ uom, setUOM, setName }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUOM())
  }, [dispatch])
  const assetUom = useSelector(state => state.getUOM.uomList)

  useEffect(() => {
    if (uom !== 0 && uom !== null && uom !== undefined) {
      const newObj = assetUom?.find(e => e.uom_slno === uom)
      if (newObj && newObj.length > 0) {
        const { uom_name, uom_slno } = newObj
        setUOM(uom_slno)
        setName(uom_name)
      }
    }
  }, [uom, assetUom, setName, setUOM])

  return (
    <Fragment>
      <CssVarsProvider>
        <Select
          value={uom}
          sx={{ fontSize: 13, width: '100%', height: 29, bgcolor: 'white' }}
          slotProps={{
            listbox: { placement: 'bottom-start' }
          }}
          placeholder="Select UOM"
          onChange={(e, newValue) => {
            if (newValue !== undefined) {
              setUOM(newValue)
              const selectedUOM = assetUom?.find(item => item.uom_slno === newValue)
              if (selectedUOM) {
                setName(selectedUOM.uom_name)
              }
            }
          }}
        >
          {assetUom?.map(val => (
            <Option key={val.uom_slno} value={val.uom_slno}>
              {val.uom_name}
            </Option>
          ))}
        </Select>
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(AssetUOMSelect)
