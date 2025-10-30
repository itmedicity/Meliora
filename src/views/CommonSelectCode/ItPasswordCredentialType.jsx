import React, { useEffect, memo, useState, useCallback, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const ItPasswordCredentialType = ({ credential, setCredential, setName }) => {
  const passwordCredential = useSelector(state => state?.getPasswordCredential?.credentialList)

  const [credentials, setCredentials] = useState([{ credential_slno: 0, credential_name: '' }])

  const [value, setValue] = useState(credentials[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (credential !== 0) {
      let newObj = passwordCredential?.find(e => e.credential_slno === credential)
      setValue(newObj)
    }
  }, [credential, passwordCredential])

  const ClickFunction = useCallback(
    newValue => {
      if (newValue !== null) {
        setCredential(newValue.credential_slno)
        setName(newValue.credential_name)
      } else {
        setCredential(0)
        setName('')
      }
    },
    [setCredential, setName]
  )

  useEffect(() => {
    passwordCredential.length > 0 && setCredentials(passwordCredential)
  }, [passwordCredential])

  return (
    <Fragment>
      {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant="outlined"
                sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
            >
                <MenuItem value={0} disabled>
                    select credential
                </MenuItem>
                {credentialType &&
                    credentialType.map((val, index) => {
                        return (
                            <MenuItem key={index} value={val.credential_slno}>
                                {val.credential_name}
                            </MenuItem>
                        )
                    })}
            </Select> */}
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={credential === 0 ? credentials : value}
          placeholder="Select Credentials"
          clearOnBlur
          onChange={(event, newValue) => {
            ClickFunction(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.credential_name === value.credential_name}
          getOptionLabel={option => option.credential_name || ''}
          options={credentials}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(ItPasswordCredentialType)
