import { Box } from '@mui/joy'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BuildingSelectWithoutName from 'src/views/CommonSelectCode/BuildingSelectWithoutName'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import Worklocation from './Worklocation'
import { useQueryClient } from '@tanstack/react-query'

const Worklocationmaster = () => {
    const history = useNavigate()
    const [building, setBuilding] = useState(0)
    const queryClient = useQueryClient()

    const [value, setValue] = useState(0)
    const [Location, setLocation] = useState({
        Location_name: '',
        Location_status: false,
        Location_id: ''
    })
    const { Location_name, Location_status, Location_id } = Location
    const updateLocation = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setLocation({ ...Location, [e.target.name]: value })
        },
        [Location]
    )

    const id = useSelector(state => {
        return state.LoginUserData.empid
    })

    const postdata = useMemo(() => {
        return {
            Location_name: Location_name,
            Location_status: Location_status === true ? 1 : 0,
            create_user: id,
            building: building
        }
    }, [Location_name, Location_status, id, building])

    //data for update
    const patchdata = useMemo(() => {
        return {
            Location_name: Location_name,
            Location_status: Location_status === true ? 1 : 0,
            edit_user: id,
            Location_id: Location_id,
            building: building
        }
    }, [Location_id, Location_name, Location_status, id, building])


    const rowSelect = useCallback(params => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { work_location_name, building_slno, status, work_location_Id } = data[0]
        const frmdata = {
            Location_name: work_location_name,
            Location_status: status === 1 ? true : false,
            Location_id: work_location_Id
        }
        setLocation(frmdata)
        setBuilding(building_slno)
    }, [])
    const submitDepartment = useCallback(() => {
        const formreset = {
            Location_name: '',
            Location_status: '',
        }
        const InsertFun = async postdata => {
            const result = await axioslogin.post('/ContractMaster/Locationinsert', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                queryClient.invalidateQueries('getlocationItems')
                setLocation(formreset)
                setBuilding(0)
                // setCount(count + 1)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const updateFun = async patchdata => {
            const result = await axioslogin.post('/ContractMaster/LocationUpdated', patchdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                setLocation(formreset)
                setBuilding(0)
                queryClient.invalidateQueries('getlocationItems')
                setValue(0)
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        if (value === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }
    }, [postdata, patchdata])
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {

    }, [])

    return (
        <CardMaster title="Work Location Master" submit={submitDepartment} close={backtoSetting} refresh={refreshWindow}>
            <Box sx={{ p: 1, }}>
                <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                    <Box sx={{ width: '30%' }}>
                        <Box>
                            <TextFieldCustom
                                placeholder="Location Name"
                                type="text"
                                size="sm"
                                name="Location_name"
                                value={Location_name}
                                onchange={updateLocation}
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <BuildingSelectWithoutName value={building} setValue={setBuilding} />

                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="Location_status"
                                value={Location_status}
                                checked={Location_status}
                                onCheked={updateLocation}
                            />
                        </Box>
                    </Box>


                    <Box sx={{ width: '70%' }}>
                        <Worklocation rowSelect={rowSelect} />

                    </Box>

                </Box>
            </Box>
        </CardMaster>)
}

export default Worklocationmaster