import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import CardMaster from 'src/views/Components/CardMaster'
import { Box, CssVarsProvider, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const StaticUrl = () => {
    const history = useNavigate()
    // const [companyslno, setCompanySlno] = useState(0)
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)

    const [companyType, setCompanyType] = useState({
        company_url: '',
        company_url_tmc: '',
        Url_slno: 0,
        Ellider_api: '',
        PUBLIC_NAS_FOLDER: '',
        PUBLIC_NAS_FOLDER_KMC: '',
        WS_URL: ''
    })
    const { company_url, company_url_tmc, Url_slno, Ellider_api, PUBLIC_NAS_FOLDER, PUBLIC_NAS_FOLDER_KMC, WS_URL } = companyType

    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/common/view')
            const { success, data, message } = result.data
            if (success === 1 && data?.length > 0) {
                setValue(1)
                const { static_api, crf_api, static_slno, elider_api, nas_folder, nas_folder_kmc, ws_url } = data[0]
                const frmdata = {
                    company_url: static_api,
                    company_url_tmc: crf_api,
                    Url_slno: static_slno,
                    Ellider_api: elider_api,
                    PUBLIC_NAS_FOLDER_KMC: nas_folder_kmc,
                    PUBLIC_NAS_FOLDER: nas_folder,
                    WS_URL: ws_url
                }
                setCompanyType(frmdata)

                setCount(0)
            } else {
                setValue(0)
                warningNotify(message)
            }
        }
        getData()
    }, [count])

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //data for insert
    const postdata = useMemo(() => {
        return {
            company_url: company_url,
            company_url_tmc: company_url_tmc,
            create_user: id,
            Url_slno: Url_slno,
            Ellider_api: Ellider_api,
            nas_folder: PUBLIC_NAS_FOLDER,
            nas_folder_kmc: PUBLIC_NAS_FOLDER_KMC,
            ws_url: WS_URL
        }
    }, [company_url, company_url_tmc, id, Url_slno, Ellider_api, PUBLIC_NAS_FOLDER, PUBLIC_NAS_FOLDER_KMC, WS_URL])
    const patchdata = useMemo(() => {
        return {
            company_url: company_url,
            company_url_tmc: company_url_tmc,
            Url_slno: Url_slno,
            Ellider_api: Ellider_api,
            nas_folder: PUBLIC_NAS_FOLDER,
            nas_folder_kmc: PUBLIC_NAS_FOLDER_KMC,
            ws_url: WS_URL

        }
    }, [company_url, company_url_tmc, Url_slno, Ellider_api, PUBLIC_NAS_FOLDER, PUBLIC_NAS_FOLDER_KMC, WS_URL])

    const updateCompanyType = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setCompanyType({ ...companyType, [e.target.name]: value })
        }, [companyType])
    /*** usecallback function for form submitting */
    const submitUrl = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            company_url: '',
            company_url_tmc: '',
            Url_slno: 0,
            PUBLIC_NAS_FOLDER: "",
            PUBLIC_NAS_FOLDER_KMC: "",
            WS_URL: ""
        }
        /***    * insert function for use call back     */

        const InsertFun = async (postdata) => {
            console.log("insert");

            const result = await axioslogin.post('/common/StaticUrl', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify("Data Inserted Sucessfully")
                setCompanyType(formreset)
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.post('/common/updateurl', patchdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify("Data Updated Sucessfully")
                setCompanyType(formreset)
                setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /*** value=0 insert api call work else update call
        * value initialy '0' when edit button click value changes to '1'
        */
        if (value === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }
    }, [postdata, patchdata])
    //close button function
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])
    //referesh func
    const refreshWindow = useCallback(() => {
        const formreset = {
            company_url: '',
            company_url_tmc: '',
            PUBLIC_NAS_FOLDER: "",
            PUBLIC_NAS_FOLDER_KMC: "",
            WS_URL: '',
            Ellider_api: ""
        }
        setCompanyType(formreset)

    }, [])
    return (
        <CssVarsProvider>
            <CardMaster
                title="Static Url Master"
                submit={submitUrl}
                close={backtoSetting}
                refresh={refreshWindow}
            >
                <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                    <Box sx={{ width: '50%', p: 1 }}>
                        <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5', mt: 1 }}>
                            <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>API_URL</Typography>
                        </Paper>
                        {/* <Box sx={{ width: "100%", mt: 1 }}>
                            <Select
                                defaultValue="0"
                                sx={{ width: '100%', bgcolor: 'white', height: 29, }}

                                placeholder="Select Company"
                                value={companyslno}
                                onChange={(e, newValue) => setCompanySlno(newValue)}
                                size="small"
                            >
                                {companyData?.map((val) => (
                                    <Option key={val.company_slno} value={val.company_slno} label={val.company_name}>
                                        {val.company_name}
                                    </Option>
                                ))}
                            </Select>


                        </Box> */}
                        <Box sx={{ mt: 1 }}>
                            <TextFieldCustom
                                placeholder="Url"
                                type="text"
                                size="sm"
                                name="company_url"
                                value={company_url}
                                onchange={updateCompanyType}
                            ></TextFieldCustom>
                        </Box>
                        <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5', mt: 1 }}>
                            <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>KMC_API_URL_CRF</Typography>
                        </Paper>
                        <Box sx={{ mt: 1 }}>
                            <TextFieldCustom
                                placeholder="Url_crf"
                                type="text"
                                size="sm"
                                name="company_url_tmc"
                                value={company_url_tmc}
                                onchange={updateCompanyType}
                            ></TextFieldCustom>
                        </Box>
                        <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5', mt: 1 }}>
                            <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>ELLIDER_API_URL</Typography>
                        </Paper>
                        <Box sx={{ mt: 1 }}>
                            <TextFieldCustom
                                placeholder="ELLIDER_API_URL"
                                type="text"
                                size="sm"
                                name="Ellider_api"
                                value={Ellider_api}
                                onchange={updateCompanyType}
                            ></TextFieldCustom>
                        </Box>

                        <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5', mt: 1 }}>
                            <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>PUBLIC_NAS_FOLDER</Typography>
                        </Paper>
                        <Box sx={{ mt: 1 }}>
                            <TextFieldCustom
                                placeholder="PUBLIC_NAS_FOLDER"
                                type="text"
                                size="sm"
                                name="PUBLIC_NAS_FOLDER"
                                value={PUBLIC_NAS_FOLDER}
                                onchange={updateCompanyType}
                            ></TextFieldCustom>
                        </Box>

                        <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5', mt: 1 }}>
                            <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>PUBLIC_NAS_FOLDER_KMC</Typography>
                        </Paper>
                        <Box sx={{ mt: 1 }}>
                            <TextFieldCustom
                                placeholder="PUBLIC_NAS_FOLDER_KMC"
                                type="text"
                                size="sm"
                                name="PUBLIC_NAS_FOLDER_KMC"
                                value={PUBLIC_NAS_FOLDER_KMC}
                                onchange={updateCompanyType}
                            ></TextFieldCustom>
                        </Box>
                        <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5', mt: 1 }}>
                            <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>WS_URL</Typography>
                        </Paper>
                        <Box sx={{ mt: 1 }}>
                            <TextFieldCustom
                                placeholder="WS_URL"
                                type="text"
                                size="sm"
                                name="WS_URL"
                                value={WS_URL}
                                onchange={updateCompanyType}
                            ></TextFieldCustom>
                        </Box>

                    </Box>
                    {/* <Box sx={{ width: '50%' }}>
                        <CompanyUrlTable count={count} setCount={setCount} rowSelect={rowSelect} />
                    </Box> */}
                </Box>
            </CardMaster>
        </CssVarsProvider>


    )
}

export default memo(StaticUrl)