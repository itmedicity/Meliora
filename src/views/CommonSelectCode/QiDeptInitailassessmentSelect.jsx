import { Autocomplete, CssVarsProvider } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const QiDeptInitailassessmentSelect = ({
  qidept,
  setQidept,
  setQitype,
  setDepCode,
  setsearchFlag,
}) => {
  const departmentList = useSelector(state => state.getQltyDept.qiDeptList)
  const [type, setType] = useState([
    { qi_dept_no: 0, qi_dept_desc: '', qi_dept_code: '', qi_list_type: 0 },
  ])
  const [value, setValue] = useState(type[0])
  const [inputValue, setInputValue] = useState('')
  const [flag, setFlag] = useState(0)
  // const [departmentList, setdepartmentList] = useState([])

  useEffect(() => {
    // if (department.length > 0) {
    //     const newarray = department?.filter((val) => val.qi_list_type === 6)
    //     setdepartmentList(newarray)
    //     setType(newarray)
    // }
    departmentList.length > 0 && setType(departmentList)
  }, [departmentList])

  useEffect(() => {
    if (qidept !== 0 && flag === 0) {
      const array = departmentList.find(e => e.qi_dept_no === qidept)
      setValue(array)
    }
  }, [qidept, flag, departmentList])
  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setFlag(1)
        setValue(value)
        setQidept(value.qi_dept_no)
        setDepCode(value.qi_dept_code)
        setQitype(value.qi_list_type)
        setsearchFlag(0)
        // setReturnflag(0)
      } else {
        setQidept(0)
        setDepCode('')
        setQitype(0)
      }
      return
    },
    [setQidept, setQitype, setsearchFlag, setDepCode]
  )

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          variant="plain"
          sx={{ '--Input-minHeight': '36px', borderRadius: 20, fontSize: 14, width: 270 }}
          value={qidept === 0 ? type : value}
          placeholder="Select Department"
          clearOnBlur
          onChange={(event, newValue) => {
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.qi_dept_desc === value.qi_dept_desc}
          getOptionLabel={option => option.qi_dept_desc || ''}
          options={type}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(QiDeptInitailassessmentSelect)
