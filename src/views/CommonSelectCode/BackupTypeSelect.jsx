import * as React from 'react'
import Autocomplete from '@mui/joy/Autocomplete'
import { memo } from 'react'
import { Fragment } from 'react'
import { CssVarsProvider } from '@mui/joy'
import { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getbackupTypeList } from 'src/api/masterApi'
import { useCallback } from 'react'
const BackupTypeSelect = ({ backupType, setBackupType }) => {
  const { data: backupTypeList } = useQuery({
    queryKey: ['getbackupTypeList'],
    queryFn: () => getbackupTypeList(),
  })

  const [backupTypeX, setbackupTypeX] = useState([{ backup_type_id: 0, backup_type_name: '' }])
  const [value, setValue] = useState(backupTypeX[0])
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    if (backupType !== 0) {
      let newObj = backupTypeList?.find(e => e.backup_type_id === backupType)
      setValue(newObj)
    }
  }, [backupType, backupTypeList])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setBackupType(value.backup_type_id)
      } else {
        setBackupType(0)
      }
      return
    },
    [setBackupType]
  )

  useEffect(() => {
    if (Array.isArray(backupTypeList) && backupTypeList.length > 0) {
      setbackupTypeX(backupTypeList)
    }
  }, [backupTypeList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px',
          }}
          value={backupType === 0 ? backupTypeX : value}
          placeholder="Select Backup Type"
          clearOnBlur
          onChange={(event, newValue) => {
            setValue(newValue)
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) =>
            option.backup_type_name === value.backup_type_name
          }
          getOptionLabel={option => option.backup_type_name || ''}
          options={backupTypeX}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

// import * as React from 'react';
// import Autocomplete from '@mui/joy/Autocomplete';
// import { memo } from 'react';
// import { Fragment } from 'react';
// import { CssVarsProvider } from '@mui/joy';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useMemo } from 'react';
// const BackupTypeSelect = ({ backupType, setBackupType }) => {
//     const backupTypeList = useMemo(() => {
//         return [
//             { label: 'Select', id: 0 },
//             { label: 'IIS Backup', id: 1 },
//             { label: 'Database Backup', id: 2 },
//             { label: 'Share Folder Backup', id: 3 },
//             { label: 'Scanned File Backup', id: 4 },
//             { label: 'Configuration Backup', id: 5 },
//         ]
//     }, [])
//     const [value, setValue] = useState(backupTypeList[0]);
//     const [inputValue, setInputValue] = useState('');
//     useEffect(() => {

//         if (backupType !== 0) {
//             const array = backupTypeList.find((e) => e.id === backupType)
//             setValue(array)
//         }
//     }, [backupType, backupTypeList])
//     useEffect(() => {
//         if (value !== null) {
//             setBackupType(value.id)
//         } else {
//             setBackupType(0)
//         }
//         return
//     }, [value, setBackupType])
//     return (
//         <Fragment>
//             <CssVarsProvider>
//                 <Autocomplete
//                     sx={{
//                         "--Input-minHeight": "29px",

//                     }}
//                     value={backupType === 0 ? backupTypeList : value}
//                     placeholder="Select Backup Type"
//                     clearOnBlur
//                     onChange={(event, newValue) => {
//                         setValue(newValue);
//                     }}
//                     inputValue={inputValue}
//                     onInputChange={(event, newInputValue) => {
//                         setInputValue(newInputValue);
//                     }}
//                     loading={true}
//                     loadingText="Loading..."
//                     freeSolo
//                     isOptionEqualToValue={(option, value) => option.label === value.label}
//                     getOptionLabel={option => option.label || ''}
//                     options={backupTypeList}
//                 />
//             </CssVarsProvider>
//         </Fragment>
//     )
// }
// export default memo(BackupTypeSelect)

export default memo(BackupTypeSelect)
