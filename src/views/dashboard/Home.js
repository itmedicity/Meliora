
// import { Box } from '@mui/system'
// import React, { useState } from 'react'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { getRequesttype } from 'src/redux/actions/RequestType.action';
// import { Checkbox, CssVarsProvider } from '@mui/joy'
// import SelectDiet from '../CommonSelectCode/SelectDiet'


// const Home = () => {
//     const dispatch = useDispatch();
//     // const [value, setValue] = useState(0)
//     // const [selectName, setSelectName] = useState("");
//     // const onChangeValue = (e, { props }) => {
//     //     setSelectName(props.children)
//     //     setValue(e.target.value)
//     // }


//     // console.log(requset_type);
//     useEffect(() => {
//         dispatch(getRequesttype());
//     }, [dispatch])


//     // const updateValue = useCallback(() => {
//     //     console.log("select");
//     // })


//     // const onCheck = (e, val) => {
//     //     console.log(e)
//     //     console.log(e.target.checked)
//     //     console.log(val)
//     // }

//     const array = [
//         { name: 'chek_one', value: 100 },
//         { name: 'chek_two', value: 200 },
//         { name: 'chek_three', value: 300 },
//         { name: 'chek_four', value: 400 },
//     ]

//     const [checkedValue, setCheckedValue] = useState(false)
//     //const [checkedValueName, setCheckedValueName] = useState({ name: '', value: 0 })





//     // console.log(checkedValueName)

//     return (
//         <Box>
//             <Box>Home Page</Box>
//             {/* <Box sx={{ width: 300, pt: 2 }} >{selectName}
//                 <SelectDiet value={value} setValue={setValue} />
//             </Box>

//             <Box sx={{ minWidth: 50, p: 2 }}>
//                 <Select
//                     fullWidth
//                     value={value}
//                     onChange={onChangeValue}
//                 >
//                     <MenuItem value={0}>Zero</MenuItem>
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                 </Select>
//             </Box> */}

//             {/* <Box>
//                 {requset_type && requset_type.map((value, index) => {
//                     return <Box sx={{
//                         pt: 1, pb: 1,
//                         justifyContent: 'space-between',
//                         width: "100%",
//                     }}
//                         key={value.req_type_slno
//                         }
//                     >
//                         <Complanit_checkbox
//                             name={value.req_type_name}
//                             value={value.req_type_slno}
//                             updatecheckbox={updateValue}
//                             checked={value.req_type_slno}
//                         />
//                     </Box>
//                 })
//                 }

//             </Box> */}

//             <Box>

//                 <CssVarsProvider>
//                     {
//                         array && array.map((val, key) => {

//                             return <Checkbox
//                                 variant="outlined"
//                                 color="success"
//                                 label={val.name}
//                                 checked={checkedValue !== undefined && checkedValue !== val.value ? false : true}
//                                 key={key}
//                                 onChange={(e) => {
//                                     // console.log(e.target.checked === true ? val.value : 'not clicked')
//                                     setCheckedValue(e.target.checked === true ? val.value : null)
//                                     // setCheckedValueName({
//                                     //     name: e.target.checked === true ? val.name : null,
//                                     //     value: e.target.checked === true ? val.value : null,
//                                     // })
//                                 }}
//                                 name={val.name}
//                             //disabled={checkedValue !== undefined && checkedValue !== val.value ? true : false}
//                             />

//                         })
//                     }
//                     {/* <Checkbox
//                         // variant={variant}
//                         // color={color}
//                         // size={size}
//                         // defaultChecked={false}
//                         // disabled={disabled}
//                         label="Check Box Example"
//                         value='Edp'
//                         onChange={(e) => {
//                             console.log(e.target.checked === true ? 'clicked' : 'not clicked')
//                         }}
//                         // checked={100}
//                         name={"My Check Box"}
//                     /> */}
//                 </CssVarsProvider>


//             </Box>





//         </Box>
//     )
// }

// export default Home
import { Grid, Paper } from '@mui/material'
import React, { Fragment, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssignedcomplaints, getOnholdcomplaints, getRectifiedcomplaints, getTotalcomplaints, getVerifiedcomplaints } from 'src/redux/actions/ComplaintDashboard.action';
import { getPendingcomplaints } from 'src/redux/actions/ComplaintDashboard.action';
import { getComplaintRights } from 'src/redux/actions/CmpRightsDashboard.action';
import ComplaintDashboard from './ComplaintDashboard';
const Home = () => {
    const dispatch = useDispatch();
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //redux for getting employee data
    const profileData = useSelector((state) => {
        return state.getLoginProfileData.loginProfiledata
    })
    useEffect(() => {
        dispatch(getComplaintRights(id))
    }, [dispatch, id])
    //redux for module rights
    const complaintRights = useSelector((state) => {
        return state.getComplaintRights.complaintRightsLists.map(ele => ele.menu_slno) || 0
    })
    useEffect(() => {
        if (profileData.length !== 0) {
            const { em_department } = profileData[0]
            dispatch(getTotalcomplaints(em_department))
            dispatch(getPendingcomplaints(em_department))
            dispatch(getAssignedcomplaints(em_department))
            dispatch(getRectifiedcomplaints(em_department))
            dispatch(getVerifiedcomplaints(em_department))
            dispatch(getOnholdcomplaints(em_department))
        }
    }, [profileData, dispatch])

    const newState = useSelector((state) => {
        return state.getTotalcomplaints
    })
    const data = Object.values(newState);
    const entries = useMemo(() => data, [data]);
    const newDashMenu = entries.filter(val => complaintRights.includes(val.slno) === true ? val.slno : null);
    const notification = useMemo(() => newDashMenu, [newDashMenu]);
    return (
        <Fragment>
            <Paper square sx={{ p: 1, width: '100%', display: "flex" }} elevation={3}>
                <Grid
                    container
                    spacing={{ xs: 1, md: 1, md: 1, lg: 1.5, xl: 1.5 }}
                    columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                    sx={{ width: '100%' }} >
                    {
                        notification.map((val, index) => (
                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                                <ComplaintDashboard widgetName={val.name} count={val.count} status={val.status} slno={val.slno} indx={index} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Paper>
        </Fragment>
    )
}
export default Home

