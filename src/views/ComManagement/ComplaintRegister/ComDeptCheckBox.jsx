import { Checkbox, CssVarsProvider, Typography } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const ComDeptCheckBox = ({
  value,
  onChange,
  name,
  label,
  checkedValue,
  onClick,
  setcm_am_assetmap_slno,
  setSelectedAsset,
  setItem_slno,
  setcustodianDept,
  cust,
}) => {
  return (
    <Fragment>
      <CssVarsProvider>
        <Checkbox
          color="danger"
          label={
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5, color: 'neutral.600' }}>
              {label}
            </Typography>
          }
          checked={checkedValue !== undefined && checkedValue !== value ? false : true}
          onChange={e => {
            onChange(e.target.checked === true ? value : null)
            setcm_am_assetmap_slno('')
            setSelectedAsset('')
            setItem_slno(0)
            setcustodianDept(cust)
          }}
          multiple
          onClick={onClick}
          name={name}
          size="lg"
          sx={{ display: 'flex' }}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ComDeptCheckBox)
