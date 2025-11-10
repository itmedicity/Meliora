

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { CssVarsProvider } from '@mui/joy/'
import Autocomplete from '@mui/joy/Autocomplete'
import { getAssetInstock } from 'src/api/AssetApis'
import { useQuery } from '@tanstack/react-query'

const AmTransferAssetUnderCustodian = ({ custAsset, setcustAsset, setassetData, am_custodian_dept_slno }) => {
    const [AssetListt, setAssetListt] = useState([])
    const [value, setValue] = useState(null)
    const [inputValue, setInputValue] = useState('')


    const postData = useMemo(() => {
        return {
            am_custodian_dept_slno: am_custodian_dept_slno,
            item_dept_slno: am_custodian_dept_slno
        }
    }, [am_custodian_dept_slno])

    const { data: spareData } = useQuery({
        queryKey: ['getAssetsInstock', postData],
        queryFn: () => getAssetInstock(postData)
    })

    const AssetInstock = useMemo(() => spareData, [spareData])

    useEffect(() => {
        if (AssetInstock && AssetInstock.length > 0) {
            setAssetListt(AssetInstock)
        } else {
            setAssetListt([])
        }
    }, [AssetInstock])

    useEffect(() => {
        if (custAsset === 0) {
            setValue(null) // Clear the selection if custAsset is reset to 0
        } else {
            const selectedReason = AssetListt.find(e => e.am_item_map_slno === custAsset)
            setValue(selectedReason || null)
        }
    }, [custAsset, AssetListt])

    const Onclick = useCallback(
        newValue => {
            if (newValue !== null) {
                setValue(newValue)
                setassetData(newValue)
                setcustAsset(newValue.am_item_map_slno)
            } else {
                setValue(null)
                setcustAsset(0)
                setassetData({})
            }
        },
        [setcustAsset, setassetData]
    )

    return (
        <CssVarsProvider>
            <Autocomplete
                sx={{
                    '--Input-minHeight': '29px',
                    width: '100%'
                }}
                value={value}
                placeholder="Select Asset"
                clearOnBlur
                onChange={(event, newValue) => {
                    Onclick(newValue)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue)
                }}
                loading={AssetListt.length === 0}
                loadingText="Loading..."
                isOptionEqualToValue={(option, value) => option.am_item_map_slno === value?.am_item_map_slno}
                getOptionLabel={option =>
                    option && option.item_name
                        ? `${option.item_asset_no || ''}/${(option.item_asset_no_only || '').toString().padStart(6, '0')} - ${option.item_name || ''
                        }`
                        : ''
                }
                options={AssetListt}
                clearOnEscape
            />
        </CssVarsProvider>
    )
}

export default memo(AmTransferAssetUnderCustodian)

