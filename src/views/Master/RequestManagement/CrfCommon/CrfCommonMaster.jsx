import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, CssVarsProvider, Option, Select, Typography } from '@mui/joy'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
import { Paper } from '@mui/material'
import { getCompanyDetails } from 'src/api/CommonApiCRF'
import { useQuery } from 'react-query'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CommonNameStatus from './CommonNameStatus'
import CommonCmpltType from './CommonCmpltType'


const CommonName = lazy(() => import('./CommonName'))

const CrfCommonMaster = () => {
    const history = useHistory()
    const [companyslno, setCompanySlno] = useState(0)
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [Count, setCount] = useState(0)
    const [deptbio, setCrfDeptbio] = useState(0)
    const [deptbiotype, setCrfDeptbiotype] = useState(0)
    const [deptMain, setCrfDeptMain] = useState(0)
    const [deptMaintype, setCrfDeptMaintype] = useState(0)
    const [deptIt, setCrfDeptIt] = useState(0)
    const [deptItType, setCrfDeptItType] = useState(0)
    const [deptHouse, setCrfDeptHouse] = useState(0)
    const [deptHouseitm, setCrfDeptHouseitm] = useState(0)
    const [deptOpe, setCrfDeptope] = useState(0)
    const [deptOpeitm, setCrfDeptopeitm] = useState(0)



    const [editRowData, setEditRowData] = useState([])
    const [crfName, setCrfName] = useState({
        Hod_approval: '',
        Incharge_approval: '',
        DMS_approval: '',
        MS_approval: '',
        MO_approval: '',
        SMO_approval: '',
        GMO_approval: '',
        MD_approval: '',
        ED_approval: '',
        Managing_Director_approval: '',
        hod_name: '',
        incharge_name: '',
        dms_name: '',
        ms_name: '',
        mo_name: '',
        smo_name: '',
        gmo_name: '',
        md_name: '',
        ed_name: '',
        managing_director_name: ""

    })
    const { data: compData, isLoading: isCompLoading, error: compError } = useQuery({
        queryKey: 'getCompany',
        queryFn: () => getCompanyDetails(),
        staleTime: Infinity
    });
    const companyData = useMemo(() => compData, [compData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axioslogin.post('/newCRFRegister/CommonMasterSettingGet');
                const { success, data } = result.data;
                if (success === 1 && data?.length > 0) {
                    setEditRowData(data[0]);
                    setCompanySlno(data[0]?.company_slno)
                    setUpdateFlag(1)
                    setCount(0)
                    setCrfName({
                        Hod_approval: data[0]?.hod_name || 'HOD Approval',
                        Incharge_approval: data[0]?.incharge_name || 'Incharge Approval',
                        DMS_approval: data[0]?.dms_name || 'DMS Approval',
                        MS_approval: data[0]?.ms_name || 'MS Approval',
                        MO_approval: data[0]?.mo_name || 'CRF Documentation',
                        SMO_approval: data[0]?.smo_name || 'CRF Verification',
                        GMO_approval: data[0]?.gmo_name || 'GM Operations Approval',
                        MD_approval: data[0]?.md_name || 'MD Approval',
                        ED_approval: data[0]?.ed_name || 'ED Approval',
                        Managing_Director_approval: data[0]?.managing_director || 'Managing Director approval',
                        hod_name: data[0]?.hod_status_name || 'HOD',
                        incharge_name: data[0]?.incharge_status_name || 'Incharge',
                        dms_name: data[0]?.dms_status_name || 'DMS',
                        ms_name: data[0]?.ms_status_name || 'MS',
                        mo_name: data[0]?.mo_status_name || 'MO',
                        smo_name: data[0]?.smo_status_name || 'SMO',
                        gmo_name: data[0]?.gmo_status_name || 'GM Operations',
                        md_name: data[0]?.md_status_name || 'MD',
                        ed_name: data[0]?.ed_status_name || 'ED',
                        managing_director_name: data[0]?.managing_director_name || 'Managing Director',
                    });

                    setCrfDeptbio(data[0]?.item_dp_Bio)
                    setCrfDeptbiotype(data[0]?.itemType_dp_Bio)
                    setCrfDeptMain(data[0]?.item_dp_Main)
                    setCrfDeptMaintype(data[0]?.itemType_dp_Main)
                    setCrfDeptIt(data[0]?.item_dp_IT)
                    setCrfDeptItType(data[0]?.itemType_dp_IT)
                    setCrfDeptHouse(data[0]?.item_dp_Hou)
                    setCrfDeptHouseitm(data[0]?.itemType_dp_Hou)
                    setCrfDeptope(data[0]?.item_dp_Ope)
                    setCrfDeptopeitm(data[0]?.itemType_dp_Ope)
                } else {
                    setEditRowData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [Count]);




    const refreshWindow = useCallback(() => {
        // setCategory([])
    }, [])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])



    const { Hod_approval, Incharge_approval, DMS_approval, MS_approval, MO_approval, SMO_approval, GMO_approval, MD_approval,
        ED_approval, Managing_Director_approval, hod_name, incharge_name, dms_name, ms_name, mo_name, smo_name, gmo_name, md_name, ed_name, managing_director_name } = crfName

    // submit data
    const submitComapnyName = useCallback(async (val) => {
        const postData = {
            companyslno: companyslno,
            Hod_approval: Hod_approval,
            Incharge_approval: Incharge_approval,
            DMS_approval: DMS_approval,
            MS_approval: MS_approval,
            MO_approval: MO_approval,
            SMO_approval: SMO_approval,
            GMO_approval: GMO_approval,
            MD_approval: MD_approval,
            ED_approval: ED_approval,
            Managing_Director_approval: Managing_Director_approval,
            hod_name: hod_name,
            incharge_name: incharge_name,
            dms_name: dms_name,
            ms_name: ms_name,
            mo_name: mo_name,
            smo_name: smo_name,
            gmo_name: gmo_name,
            md_name: md_name,
            ed_name: ed_name,
            managing_director_name: managing_director_name,
            deptbio: deptbio,
            deptbiotype: deptbiotype,
            deptMain: deptMain,
            deptMaintype: deptMaintype,
            deptIt: deptIt,
            deptItType: deptItType,
            deptHouse: deptHouse,
            deptHouseitm: deptHouseitm,
            deptOpe: deptOpe,
            deptOpeitm: deptOpeitm,

        }
        if (UpdateFlag === 1) {
            const result = await axioslogin.post('/newCRFRegister/CommonMasterSetting/update', postData);
            const { success } = result.data

            if (success === 1) {
                succesNotify("Data Updated Sucessfully")
                setCount(1)
            }
            else {
                warningNotify("Something Went Wrong")

            }
        } else {
            const result = await axioslogin.post('/newCRFRegister/CommonMasterInsert', postData);
            const { success } = result.data
            if (success === 1) {
                succesNotify("Data Inserted Sucessfully")
                setCount(1)

            }
            else {
                warningNotify("Something Went Wrong")

            }
        }
    }, [companyslno, UpdateFlag, Hod_approval, Incharge_approval, DMS_approval, MS_approval, MO_approval, SMO_approval, GMO_approval,
        MD_approval, ED_approval, Managing_Director_approval, hod_name, incharge_name, dms_name, ms_name, mo_name, smo_name, gmo_name,
        md_name, ed_name, managing_director_name, deptbio, deptbiotype, deptMain, deptMaintype, deptIt, deptItType, deptHouse, deptHouseitm, deptOpe, deptOpeitm,
    ])
    if (isCompLoading) return <p>Loading...</p>;
    if (compError) return <p>Error Occurred.</p>;
    return (
        <CssVarsProvider>
            <CardMaster
                title="Common Setting CRF"
                submit={submitComapnyName}
                close={backtoSetting}
                refresh={refreshWindow}
            >
                <Box sx={{ width: '100%', display: 'flex', overflow: 'auto', height: window.innerHeight - 170, }}>
                    <Box sx={{ width: '50%', p: 1 }}>
                        <Box sx={{
                            mt: 0.2, overflow: 'auto',
                        }} >
                            <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5' }}>
                                <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>Default Company Master</Typography>
                            </Paper>
                            <Box sx={{ mt: 1 }}>
                                <Select
                                    defaultValue="0"
                                    sx={{ fontSize: 13, width: '100%', height: 38, bgcolor: 'white' }}
                                    slotProps={{
                                        listbox: { placement: 'bottom-start' },
                                    }}
                                    placeholder="Select Company"
                                    value={companyslno}
                                    onChange={(e, newValue) => setCompanySlno(newValue)}
                                >
                                    {companyData?.map((val) => (
                                        <Option key={val.company_slno} value={val.company_slno} label={val.company_name}>
                                            {val.company_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Box>

                        </Box>
                        {/* default name component */}
                        <CommonName crfName={crfName} setCrfName={setCrfName} />
                        <CommonCmpltType deptbio={deptbio} setCrfDeptbio={setCrfDeptbio} deptbiotype={deptbiotype} setCrfDeptbiotype={setCrfDeptbiotype}
                            deptMain={deptMain} setCrfDeptMain={setCrfDeptMain} deptMaintype={deptMaintype} setCrfDeptMaintype={setCrfDeptMaintype} deptIt={deptIt} setCrfDeptIt={setCrfDeptIt}
                            deptItType={deptItType} setCrfDeptItType={setCrfDeptItType} deptHouse={deptHouse} setCrfDeptHouse={setCrfDeptHouse} deptHouseitm={deptHouseitm}
                            setCrfDeptHouseitm={setCrfDeptHouseitm} deptOpe={deptOpe} setCrfDeptope={setCrfDeptope} deptOpeitm={deptOpeitm} setCrfDeptopeitm={setCrfDeptopeitm} />


                    </Box>
                    <Box sx={{ width: '50%', p: 1 }}>
                        <CommonNameStatus crfName={crfName} setCrfName={setCrfName} editRowData={editRowData} />

                    </Box>
                </Box>
            </CardMaster>
        </CssVarsProvider >)
}

export default memo(CrfCommonMaster)