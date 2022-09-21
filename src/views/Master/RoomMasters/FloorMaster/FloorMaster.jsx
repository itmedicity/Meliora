import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import BuildingSelect from 'src/views/CommonSelectCode/BuildingSelect';
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import FloorTable from './FloorTable';
const FloorMaster = () => {
    const history = useHistory();
    //state for select box
    const [value, setValue] = useState(0)
    //state for table rendering
    const [count, setCount] = useState(0);
    //state for edit
    const [edit, setEdit] = useState(0);
    //intializing
    const [floor, setFloor] = useState({
        floor_desc: '',
        floor_number: '',
        floor_status: false,
        floor_code: ''
    })
    //destructuring
    const { floor_desc, floor_number, floor_status, floor_code } = floor
    const updateFloor = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFloor({ ...floor, [e.target.name]: value })
    }, [floor])
    //insert data
    const postdata = useMemo(() => {
        return {
            floor_desc: floor_desc,
            build_code: value,
            floor_number: floor_number,
            floor_status: floor_status === true ? 1 : 0,
            em_id: 1
        }
    }, [floor_desc, value, floor_number, floor_status])
    //data set for edit  
    const rowSelect = useCallback((params) => {
        setEdit(1);
        const data = params.api.getSelectedRows()
        const { floor_desc, build_code, floor_number, status, floor_code } = data[0]
        const frmdata = {
            floor_desc: floor_desc,
            floor_number: floor_number,
            floor_status: status === 'Yes' ? true : false,
            floor_code: floor_code
        }
        setFloor(frmdata)
        setValue(build_code)
    }, [])
    //update data
    const patchdata = useMemo(() => {
        return {
            floor_desc: floor_desc,
            build_code: value,
            floor_number: floor_number,
            floor_status: floor_status === true ? 1 : 0,
            floor_code: floor_code,
        }
    }, [floor_desc, value, floor_number, floor_status, floor_code])
    //reset select box
    const reset = async () => {
        setValue(0)
    }
    const submitFloor = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            floor_desc: '',
            floor_number: '',
            floor_status: false,
            floor_code: ''
        }
        /*** * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/floor', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                setFloor(formreset)
                succesNotify(message)
                setCount(count + 1);
                reset();
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/floor', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                setFloor(formreset)
                succesNotify(message)
                setCount(count + 1);
                setEdit(0)
                reset();
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /*** edit=0 insert api call work else update call
            * edit initialy '0' when edit button click value changes to '1'
            */
        if (edit === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }

    }, [edit, postdata, patchdata, count])
    //refresh func
    const refreshWindow = useCallback(() => {
        const formreset = {
            floor_desc: '',
            floor_number: '',
            floor_status: false,
            floor_code: ''
        }
        setFloor(formreset)
        reset();
        setEdit(0);
    }, [setFloor])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Floor Master"
            close={backtoSetting}
            submit={submitFloor}
            refresh={refreshWindow}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Floor Description"
                                    type="text"
                                    size="sm"
                                    name="floor_desc"
                                    value={floor_desc}
                                    onchange={updateFloor}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <BuildingSelect value={value} setValue={setValue} />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Floor Number"
                                    type="text"
                                    size="sm"
                                    name="floor_number"
                                    value={floor_number}
                                    onchange={updateFloor}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="floor_status"
                                    value={floor_status}
                                    checked={floor_status}
                                    onCheked={updateFloor}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <FloorTable rowSelect={rowSelect} count={count} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default FloorMaster