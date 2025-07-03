import React, { useEffect, memo, useState, useCallback, Fragment, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { Autocomplete, CssVarsProvider, Typography } from '@mui/joy'
import { errorNotify } from 'src/views/Common/CommonCode'

const CmAssetList = ({
  assetz,
  setAssetz,
  complaint_dept_secslno,
  setItem_slno,
  setSelectedAsset,
  setasset_dept,
  codept,
  assetTransCount,
}) => {
  const [assetAry, setAssetAry] = useState([])
  const [assetX, setAssetX] = useState([
    { am_item_map_slno: 0, item_name: '', item_asset_no: '', item_asset_no_only: '' },
  ])
  const [value, setValue] = useState(assetX[0])
  const [inputValue, setInputValue] = useState('')

  // Memoized post data
  const postData = useMemo(
    () => ({
      codept,
      complaintLocation: complaint_dept_secslno,
    }),
    [complaint_dept_secslno, codept]
  )

  // Fetch asset list based on department section
  useEffect(() => {
    let isMounted = true // Track component mount state

    const getAssetItemsBasedOnLocation = async postData => {
      try {
        const result = await axioslogin.post(
          '/Rectifycomplit/getAssetUnderSelectedCompltDept',
          postData
        )
        const { success, data } = result.data
        if (isMounted) {
          if (success === 1) {
            setAssetAry(data)
          } else {
            setAssetAry([])
          }
        }
      } catch (error) {
        errorNotify('Error fetching asset data:', error)
        if (isMounted) {
          setAssetAry([])
        }
      }
    }

    if (complaint_dept_secslno !== '') {
      getAssetItemsBasedOnLocation(postData)
    } else {
      setAssetAry([])
    }

    return () => {
      isMounted = false
    }
  }, [postData, complaint_dept_secslno, assetTransCount])

  useEffect(() => {
    if (assetz !== 0) {
      let newObj = assetAry?.find(e => e.item_asset_no_only === assetz)
      setValue(newObj)
    }
  }, [assetz, assetAry])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setAssetz(value.item_asset_no_only)
        setasset_dept(value.item_asset_no)
      } else {
        setAssetz(0)
      }
      return
    },
    [setAssetz, setasset_dept]
  )

  useEffect(() => {
    assetAry.length > 0 && setAssetX(assetAry)
  }, [assetAry])

  return (
    <Fragment>
      <CssVarsProvider>
        {assetAry.length === 0 ? (
          <Typography
            sx={{ border: 1, pl: 0.5, mt: 0.2, py: 0.2, borderColor: '#CDD7E1', color: 'grey' }}
          >
            No asset from the selected complaint department has been added under the department
            section.
          </Typography>
        ) : (
          <Autocomplete
            sx={{
              '--Input-minHeight': '29px',
              borderRadius: 0,
            }}
            value={assetz === 0 ? assetX : value}
            placeholder="select Asset"
            clearOnBlur
            onChange={(event, newValue) => {
              setValue(newValue)
              Onclick(newValue)
              if (newValue) {
                setSelectedAsset(
                  `${newValue.item_name} (${
                    newValue.item_asset_no === null ? '' : newValue.item_asset_no
                  })`
                )
                setItem_slno(newValue.item_asset_no_only)
              } else {
                setItem_slno(0)
                setSelectedAsset('')
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) =>
              option.item_name === value.item_name && option.item_asset_no === value.item_asset_no
            }
            getOptionLabel={option =>
              option.item_asset_no
                ? `${option.item_asset_no}/${option.item_asset_no_only
                    .toString()
                    .padStart(6, '0')} - ${option.item_name}`
                : option.item_name || ''
            }
            options={assetX}
          />
        )}
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(CmAssetList)
