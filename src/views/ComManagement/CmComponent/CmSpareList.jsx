import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'
import { getSparesInstock } from 'src/api/AssetApis'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'

const CmSpareList = ({ sparez, setSparez, setSpareName, count }) => {
  const [sparex, setSparex] = useState([{ am_spare_item_map_slno: 0, item_name: '', assetno: '' }])
  const [value, setValue] = useState(sparex[0])
  const [inputValue, setInputValue] = useState('')
  const [spareList, setspareList] = useState([])

  const empDept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  useEffect(() => {
    if (sparez !== 0) {
      let newObj = spareList?.find(e => e.am_spare_item_map_slno === sparez)
      setValue(newObj)
    }
  }, [sparez, spareList])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setSparez(value.am_spare_item_map_slno)
      } else {
        setSparez(0)
      }
      return
    },
    [setSparez]
  )

  useEffect(() => {
    spareList.length > 0 && setSparex(spareList)
  }, [spareList])

  const postData = useMemo(
    () => ({
      spareCustodainDept: empDept === 0 ? null : empDept === null ? null : empDept,
    }),
    [empDept]
  )

  const { data: spareData } = useQuery({
    queryKey: ['getSparesinstock', postData, count],
    queryFn: () => getSparesInstock(postData),
  })

  const spareInstock = useMemo(() => spareData, [spareData])

  useEffect(() => {
    if (spareInstock && spareInstock.length > 0) {
      const formattedSpareInstock = spareInstock.map((val, index) => {
        return {
          am_spare_item_map_slno: val.am_spare_item_map_slno,
          item_name: val.item_name,
          assetno: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0'),
        }
      })
      setspareList(formattedSpareInstock)
    } else {
      setspareList([])
    }
  }, [spareInstock])

  return (
    <CssVarsProvider>
      <Autocomplete
        sx={{
          '--Input-minHeight': '38px',
        }}
        value={sparez === 0 ? sparex : value}
        placeholder="select spare"
        clearOnBlur
        onChange={(event, newValue) => {
          setValue(newValue)
          Onclick(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
          setSpareName(newInputValue)
        }}
        loading={true}
        loadingText="Loading..."
        freeSolo
        isOptionEqualToValue={(option, value) =>
          option.item_name === value.item_name && option.assetno === value.assetno
        }
        getOptionLabel={option =>
          option.assetno ? `${option.assetno}  ${option.item_name}` : option.item_name || ''
        }
        options={sparex}
      />
    </CssVarsProvider>
  )
}

export default memo(CmSpareList)
