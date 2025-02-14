import { Box } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CompanyMastTable from './CompanyMastTable'

const CompanyMast = () => {
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    const history = useHistory()

    const [companyType, setCompanyType] = useState({
        company_slno: '',
        company_name: '',
        comp_status: false
    })

    const { company_slno, company_name, comp_status } = companyType
    const updateCompanyType = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setCompanyType({ ...companyType, [e.target.name]: value })
        }, [companyType])

    const postdata = useMemo(() => {
        return {
            company_name: company_name,
            comp_status: comp_status === true ? 1 : 0,
        }
    }, [company_name, comp_status])
    const patchdata = useMemo(() => {
        return {
            company_slno: company_slno,
            company_name: company_name,
            comp_status: comp_status === true ? 1 : 0,
        }
    }, [company_slno, company_name, comp_status])

    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { company_slno, company_name, comp_status } = data[0]
        const frmdata = {
            company_slno: company_slno,
            company_name: company_name,
            comp_status: comp_status === 1 ? true : false,
        }
        setCompanyType(frmdata)
    }, [])
    const reset = useCallback(() => {
        const frmdata = {
            company_slno: '',
            company_name: '',
            comp_status: false,
        }
        setCompanyType(frmdata)
        setCount(0)
        setValue(0)
    }, [setCompanyType, setCount, setValue]);

    const submitComapnyName = useCallback(
        (e) => {
            e.preventDefault()
            const insertCompanyDetails = async (postdata) => {
                const result = await axioslogin.post('/companyMast/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                } else if (success === 2) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            const updateCompanyDetails = async (patchdata) => {
                const result = await axioslogin.patch('/companyMast/update', patchdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                } else if (success === 2) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            if (value === 0) {
                if (company_name !== '') {
                    insertCompanyDetails(postdata)
                }
                else {
                    infoNotify("Enter Company Name")
                }
            }
            else {
                updateCompanyDetails(patchdata)
            }
        },
        [postdata, value, patchdata, reset, count, company_name],
    )
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])

    return (
        <CardMaster
            title="Company Master"
            submit={submitComapnyName}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                <Box sx={{ width: '30%', p: 1 }}>
                    <Box>
                        <TextFieldCustom
                            placeholder="Company Name"
                            type="text"
                            size="sm"
                            name="company_name"
                            value={company_name}
                            onchange={updateCompanyType}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <CusCheckBox
                            label="status"
                            color="primary"
                            size="md"
                            name="comp_status"
                            value={comp_status}
                            checked={comp_status}
                            onCheked={updateCompanyType}
                        ></CusCheckBox>
                    </Box>

                </Box>
                <Box sx={{ width: '70%' }}>
                    <CompanyMastTable count={count} rowSelect={rowSelect} />
                </Box>
            </Box>
        </CardMaster>
    )
}

export default memo(CompanyMast)