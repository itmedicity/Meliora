import React, { memo, useCallback, useMemo, useState } from 'react'
import { Box, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getallNurseStation, getallNurseStationMaster } from 'src/api/CommonApiCRF'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import SelectNursingStation from 'src/views/Components/SelectNursingStation'
import SelectFloorMaster from 'src/views/Components/SelectFloorMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'

const Bedcountmaster = () => {
    const history = useNavigate()

    const [updateflag, setUpdateFlag] = useState(0)
    const [updationdetail, setUpdateDetial] = useState({})
    const [rightsitem, setRightsItems] = useState({
        NS_CODE: 0,
        FLOOR_CODE: 0,
        FloorType: '',
        total_beds: '',
        status: false
    })

    const { status, NS_CODE, FLOOR_CODE, FloorType, total_beds } = rightsitem
    const handleChange = (e) => {
        setRightsItems({ ...rightsitem, [e.target.name]: e.target.value })
    }

    const { data: ellidernusrstation } = useQuery({
        queryKey: ['elidernursestaion'],
        queryFn: () => getallNurseStation(),
    })

    const { data: getallnursestation, refetch: fetchallnursinstation } = useQuery({
        queryKey: ['getallnsmaster'],
        queryFn: () => getallNurseStationMaster(),
    })

    const nursestationname = useMemo(() => {
        const filtered = ellidernusrstation?.filter(item => item.NS_CODE === NS_CODE)
        return filtered && filtered.length > 0 ? filtered[0].NSC_DESC : ''
    }, [ellidernusrstation, NS_CODE])

    const HanldeUpdation = useCallback((rowData) => {
        setUpdateFlag(1)
        setUpdateDetial(rowData)
        setRightsItems({
            NS_CODE: rowData.fb_ns_code,
            FLOOR_CODE: rowData.fb_floor_code,
            FloorType: rowData.rm_floor_alias === 'QMT/HB/HB' || rowData.rm_floor_alias?.includes('HB') ? 'HB' : 'SB',
            total_beds: rowData.total_beds ?? rowData.fb_total_beds ?? rowData.bed_count ?? '',
            status: rowData.fb_ns_status === 1
        })
    }, [])

    const [column] = useState([
        {
            headerName: 'Sl No',
            field: 'slno',
            width: 70,
            filter: 'true'
        },
        {
            headerName: 'Nurse Station',
            field: 'fb_ns_name',
            width: 200,
            filter: 'true'
        },
        {
            headerName: 'Floor Name',
            field: 'rm_floor_name',
            width: 200,
            filter: 'true'
        },
        {
            headerName: 'Total Beds',
            field: 'total_beds',
            width: 110,
            filter: 'true'
        },
        {
            headerName: 'Status',
            field: 'status_label',
            width: 100,
            filter: 'true'
        },
        {
            headerName: 'Action',
            width: 80,
            cellRenderer: (params) => (
                <EditButton onClick={() => HanldeUpdation(params.data)} />
            )
        }
    ])

    const tableData = useMemo(() => {
        return getallnursestation?.map((item, index) => ({
            ...item,
            slno: item.slno || index + 1,
            fb_ns_name: item.fb_ns_name?.toUpperCase() || '',
            rm_floor_name: item.rm_floor_name?.toUpperCase() || '',
            total_beds: item.total_beds ?? item.fb_total_beds ?? item.bed_count ?? '-',
            status_label: item.fb_ns_status === 1 ? 'ACTIVE' : 'INACTIVE',
        })) || []
    }, [getallnursestation])

    const submitDashBoard = useCallback(async () => {
        if (NS_CODE === 0) return warningNotify('Select the Nursing Station')
        if (FloorType === '') return warningNotify('Select the Block')
        if (FLOOR_CODE === 0) return warningNotify('Select the Floor')
        if (total_beds === '') return warningNotify('Enter Total Number of Beds')

        const insert_data = {
            fb_ns_code: NS_CODE,
            fb_floor_code: FLOOR_CODE,
            fb_ns_name: nursestationname,
            total_beds: Number(total_beds),
            fb_ns_status: status ? 1 : 0,
        }

        const update_data = {
            fb_nurse_stn_slno: updationdetail.fb_nurse_stn_slno,
            fb_ns_code: NS_CODE,
            fb_ns_name: nursestationname,
            fb_floor_code: FLOOR_CODE,
            total_beds: Number(total_beds),
            fb_ns_status: status ? 1 : 0,
        }

        if (updateflag === 0) {
            try {
                const result = await axioslogin.post('/feedback/nursestationinsert', insert_data)
                const { success } = result.data
                if (success === 3) return warningNotify('Item Already Exists')
                if (success !== 2) return warningNotify('Error in inserting Data!')
                succesNotify('Inserted successfully')
                fetchallnursinstation()
                setRightsItems({ NS_CODE: 0, FLOOR_CODE: 0, FloorType: '', total_beds: '', status: false })
            } catch (error) {
                setRightsItems({ NS_CODE: 0, FLOOR_CODE: 0, FloorType: '', total_beds: '', status: false })
                warningNotify(error)
            }
        } else {
            try {
                const result = await axioslogin.post('/feedback/updatenursestation', update_data)
                const { success } = result.data
                if (success === 3) return warningNotify('Item Already Exists')
                if (success !== 2) return warningNotify('Error in inserting Data!')
                succesNotify('Updated successfully')
                fetchallnursinstation()
                setUpdateFlag(0)
                setRightsItems({ NS_CODE: 0, FLOOR_CODE: 0, FloorType: '', total_beds: '', status: false })
            } catch (error) {
                setRightsItems({ NS_CODE: 0, FLOOR_CODE: 0, FloorType: '', total_beds: '', status: false })
                warningNotify(error)
            }
        }
    }, [status, updateflag, updationdetail, fetchallnursinstation, FLOOR_CODE, NS_CODE, nursestationname, FloorType, total_beds])

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        setUpdateFlag(0)
        setUpdateDetial({})
        setRightsItems({
            NS_CODE: 0,
            FLOOR_CODE: 0,
            FloorType: '',
            total_beds: '',
            status: false
        })
    }, [])

    return (
        <CardMaster title="Bed Count Master" submit={submitDashBoard} close={backtoSetting} refresh={refreshWindow}>
            <Box sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', width: '100%', gap: 1.5 }}>
                    {/* Left Form Section */}
                    <Box sx={{ width: '30%' }}>
                        <Box>
                            <SelectNursingStation
                                label="Nurse Station Master"
                                value={NS_CODE}
                                handleChange={(e, val) => handleChange({ target: { name: 'NS_CODE', value: val } })}
                            />
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-varient)',
                                    opacity: 0.8,
                                    paddingLeft: '0.26rem',
                                    lineHeight: '1.0rem',
                                    fontSize: '0.81rem',
                                    color: 'rgba(var(--font-primary-white))',
                                    paddingY: '0.26rem',
                                }}
                            >
                                Block
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mt: 0.5, pl: 0.5 }}>
                                <CusCheckBox
                                    label="HOSPITAL BLOCK"
                                    color="primary"
                                    size="md"
                                    name="FloorTypeHB"
                                    checked={FloorType === 'HB'}
                                    onCheked={() => handleChange({ target: { name: 'FloorType', value: 'HB' } })}
                                />
                                <CusCheckBox
                                    label="SERVICE BLOCK"
                                    color="primary"
                                    size="md"
                                    name="FloorTypeSB"
                                    checked={FloorType === 'SB'}
                                    onCheked={() => handleChange({ target: { name: 'FloorType', value: 'SB' } })}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <SelectFloorMaster
                                type={FloorType}
                                label="Floor Master"
                                value={FLOOR_CODE}
                                handleChange={(e, val) => handleChange({ target: { name: 'FLOOR_CODE', value: val } })}
                            />
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-varient)',
                                    opacity: 0.8,
                                    paddingLeft: '0.26rem',
                                    lineHeight: '1.0rem',
                                    fontSize: '0.81rem',
                                    color: 'rgba(var(--font-primary-white))',
                                    paddingY: '0.26rem',
                                }}
                            >
                                Total Number of Beds
                            </Typography>
                            <TextFieldCustom
                                placeholder="Total Number of Beds"
                                type="number"
                                size="sm"
                                name="total_beds"
                                value={total_beds}
                                onchange={handleChange}
                            />
                        </Box>

                        <Box sx={{ mt: 1.5, pl: 0.5 }}>
                            <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="status"
                                value={status}
                                checked={status}
                                onCheked={(e) => handleChange({ target: { name: 'status', value: e.target.checked } })}
                            />
                        </Box>
                    </Box>

                    {/* Right Grid Section */}
                    <Box sx={{ width: '70%' }}>
                        <CusAgGridMast columnDefs={column} tableData={tableData} />
                    </Box>
                </Box>
            </Box>
        </CardMaster>
    )
}

export default memo(Bedcountmaster)