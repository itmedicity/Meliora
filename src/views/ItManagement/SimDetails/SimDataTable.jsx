import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import { Divider } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import SimOperator from './SimOperator'
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import EditIcon from '@mui/icons-material/Edit'


const SimDataTable = ({ tableCount, rowSelect }) => {


    const [tabledata, setTableData] = useState([])
    const [provider, setProvider] = useState(0)
    const [searchData, setSearchData] = useState([])



    useEffect(() => {
        const getAllSimdetails = async () => {
            const result = await axioslogin.get('/communicationDeviceDetails/simDetailView');
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            it_sim_slno: val.it_sim_slno,
                            it_sim_serial_no: val.it_sim_serial_no,
                            it_sim_imei_no: val.it_sim_imei_no,
                            it_sim_mobile_no: val.it_sim_mobile_no,
                            it_sim_operator: val.it_sim_operator,
                            providerName: val.it_sim_operator === 1 ? 'Vodafone Idea' : val.it_sim_operator === 2 ? 'Airtel' : val.it_sim_operator === 3 ? 'Jio' :
                                val.it_sim_operator === 4 ? 'BSNL' : val.it_sim_operator === 5 ? 'Reliance Communications' : val.it_sim_operator === 6 ? 'Aircel' :
                                    val.it_sim_operator === 7 ? 'Tata Docomo' : val.it_sim_operator === 8 ? 'Tata Teleservices' :
                                        val.it_sim_operator === 9 ? 'Telenor India' : val.it_sim_operator === 10 ? 'MTS India' : 'NIL',
                            it_sim_tariff: val.it_sim_tariff,
                            tariffName: val.it_sim_tariff === 1 ? 'Monthly' : val.it_sim_tariff === 2 ? 'Quaterly' : val.it_sim_tariff === 3 ? 'Yearly' : 'NIL',
                            it_sim_tariff_amount: val.it_sim_tariff_amount,
                            it_sim_status: val.it_sim_status,
                            status: val.it_sim_status === 1 ? 'Active' : val.it_sim_status === 0 ? 'Deactivated' : 'nil',
                            it_sim_category: val.it_sim_category,
                            categoryName: val.it_sim_category === 1 ? 'CUG SiM' : val.it_sim_category === 2 ? 'PREPAID' : val.it_sim_category === 3 ? 'Postpaid' : 'nill',
                            it_sim_dept: val.it_sim_dept,
                            it_sim_deptsec: val.it_sim_deptsec,
                            it_sim_recie_empid: val.it_sim_recie_empid,
                            it_sim_recie_name: val.it_sim_recie_name,
                            it_sim_recei_contact: val.it_sim_recei_contact,
                            it_sim_issue_date: val.it_sim_issue_date,
                            dept_name: val.dept_name,
                            sec_name: val.sec_name


                        }
                        return obj
                    })
                    setTableData(arry)
                    setSearchData(arry)
                } else {
                    setTableData([])
                    warningNotify('error occured')
                }
            }
        }
        getAllSimdetails()


    }, [tableCount])



    const searchOperator = useCallback(() => {
        if (provider === 0) {
            setTableData(searchData)
        }
        else {
            if (searchData.length !== 0) {
                const newData = searchData.filter((val) => val.it_sim_operator === provider)

                setTableData(newData)
            }
            else {
                infoNotify('No data found')
            }
        }
    }, [searchData, provider])
    const refresh = useCallback(() => {

        setTableData(searchData)
        setProvider(0)
    }, [searchData])


    return (
        <Box>

            <Box>


                <CssVarsProvider>
                    <Divider textAlign="left" sx={{ fontWeight: 600, mx: 2, fontSize: 18, color: '#5F093D', mt: 2, fontFamily: 'Georgia' }}>
                        Sim Details</Divider>
                </CssVarsProvider>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 3, }}></Box>
                    <Box sx={{ flex: 3, }}>
                        <Box sx={{ pl: 1, mt: .5, fontWeight: 600, color: '#AEAEAE' }}>
                            Search Sim Operator
                        </Box>
                        <Box>
                            <SimOperator
                                provider={provider}
                                setProvider={setProvider} />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 3, display: 'flex', pt: 3.5 }}>
                        <Tooltip title="search" placement="bottom">
                            <Box sx={{ height: 30, ml: 1, border: 1, borderRadius: 7, color: '#055C9D', cursor: 'pointer' }}> <SearchIcon sx={{ color: '#055C9D' }}
                                onClick={searchOperator}
                            /></Box>
                        </Tooltip>
                        <Tooltip title="refresh" placement="bottom">
                            <Box sx={{ height: 30, ml: .5, border: 1, borderRadius: 7, color: '#055C9D', cursor: 'pointer' }}> <ReplayIcon sx={{ color: '#055C9D' }}
                                onClick={refresh} />
                            </Box>
                        </Tooltip>
                    </Box>
                </Box >
                <Box sx={{ m: 1, pb: 2, maxHeight: 450, overflow: 'auto', }}>
                    {tabledata.length !== 0 ?
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader sx={{ backgroundColor: 'white', border: 1, borderColor: '#F2F1F0', }}
                                hoverRow>
                                <thead>
                                    <tr>
                                        <th style={{ width: 60, fontFamily: 'Georgia' }}>SlNo</th>
                                        <th style={{ width: 80, fontFamily: 'Georgia' }}>Action</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim Operator</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim Category</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim Mobile No</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Tariff</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Tariff Amount</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim SlNo </th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim IMEI </th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Sim status</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Department</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Section</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Employee ID</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Employee Name </th>
                                        <th style={{ width: 180, fontFamily: 'Georgia' }}>Reciever Contact No.</th>
                                        <th style={{ width: 150, fontFamily: 'Georgia' }}>Issued Date</th>
                                    </tr>
                                </thead>

                                <tbody >
                                    {tabledata?.map((val, index) => {
                                        return (
                                            <tr key={index}

                                            >
                                                <td> {index + 1}</td>
                                                <td>
                                                    <EditIcon

                                                        sx={{ cursor: 'pointer' }} size={6}
                                                        onClick={() => rowSelect(val)}
                                                    />
                                                </td>
                                                <td> {val.providerName || 'not given'}</td>
                                                <td> {val.categoryName || 'nill'}</td>
                                                <td> {val.it_sim_mobile_no || 'not given'}</td>
                                                <td> {val.tariffName || 'not given'}</td>
                                                <td> {val.it_sim_tariff_amount || 'not given'}</td>
                                                <td> {val.it_sim_serial_no || 'not given'}</td>
                                                <td> {val.it_sim_imei_no || 'not given'}</td>
                                                <td> {val.status || 'not given'}</td>


                                                <td> {val.dept_name || 'not given'}</td>
                                                <td> {val.sec_name || 'not given'}</td>
                                                <td> {val.it_sim_recie_empid || 'not given'}</td>
                                                <td> {val.it_sim_recie_name || 'not given'}</td>
                                                <td> {val.it_sim_recei_contact || 'not given'}</td>
                                                <td> {val.it_sim_issue_date || 'not given'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </Table>
                        </CssVarsProvider>
                        :
                        <Box sx={{ textAlign: 'center', pr: 20, m: 5, fontWeight: 700, fontSize: 30, color: '#C7C8CB', }}>No SiM details</Box>}
                </Box>
            </Box>
        </Box>
    )
}

export default memo(SimDataTable)