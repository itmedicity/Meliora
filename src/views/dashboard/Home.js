import { MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import Complanit_checkbox from '../ComManagement/ComplaintRegister/Complanit_checkbox'
import SelectDiet from '../CommonSelectCode/SelectDiet'
import { useDispatch, useSelector } from 'react-redux'
import { getRequesttype } from 'src/redux/actions/RequestType.action';
import { Checkbox, CssVarsProvider } from '@mui/joy'

const Home = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0)
    const [selectName, setSelectName] = useState("");
    const onChangeValue = (e, { props }) => {
        setSelectName(props.children)
        setValue(e.target.value)
    }

    const requset_type = useSelector((state) => {
        return state.getRequesttype.requesttypeList



    })
    // console.log(requset_type);
    useEffect(() => {
        dispatch(getRequesttype());
    }, [dispatch])


    const updateValue = useCallback(() => {
        console.log("select");
    })


    // const onCheck = (e, val) => {
    //     console.log(e)
    //     console.log(e.target.checked)
    //     console.log(val)
    // }

    const array = [
        { name: 'chek_one', value: 100 },
        { name: 'chek_two', value: 200 },
        { name: 'chek_three', value: 300 },
        { name: 'chek_four', value: 400 },
    ]

    const [checkedValue, setCheckedValue] = useState(false)
    //const [checkedValueName, setCheckedValueName] = useState({ name: '', value: 0 })
    console.log(checkedValue)




    // console.log(checkedValueName)

    return (
        <Box>
            <Box>Home Page</Box>
            {/* <Box sx={{ width: 300, pt: 2 }} >{selectName}
                <SelectDiet value={value} setValue={setValue} />
            </Box>

            <Box sx={{ minWidth: 50, p: 2 }}>
                <Select
                    fullWidth
                    value={value}
                    onChange={onChangeValue}
                >
                    <MenuItem value={0}>Zero</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </Box> */}

            {/* <Box>
                {requset_type && requset_type.map((value, index) => {
                    return <Box sx={{
                        pt: 1, pb: 1,
                        justifyContent: 'space-between',
                        width: "100%",
                    }}
                        key={value.req_type_slno
                        }
                    >
                        <Complanit_checkbox
                            name={value.req_type_name}
                            value={value.req_type_slno}
                            updatecheckbox={updateValue}
                            checked={value.req_type_slno}
                        />
                    </Box>
                })
                }

            </Box> */}

            <Box>

                <CssVarsProvider>
                    {
                        array && array.map((val, key) => {

                            return <Checkbox
                                variant="outlined"
                                color="success"
                                label={val.name}
                                checked={checkedValue !== undefined && checkedValue !== val.value ? false : true}
                                key={key}
                                onChange={(e) => {
                                    // console.log(e.target.checked === true ? val.value : 'not clicked')
                                    setCheckedValue(e.target.checked === true ? val.value : null)
                                    // setCheckedValueName({
                                    //     name: e.target.checked === true ? val.name : null,
                                    //     value: e.target.checked === true ? val.value : null,
                                    // })
                                }}
                                name={val.name}
                            //disabled={checkedValue !== undefined && checkedValue !== val.value ? true : false}
                            />

                        })
                    }
                    {/* <Checkbox
                        // variant={variant}
                        // color={color}
                        // size={size}
                        // defaultChecked={false}
                        // disabled={disabled}
                        label="Check Box Example"
                        value='Edp'
                        onChange={(e) => {
                            console.log(e.target.checked === true ? 'clicked' : 'not clicked')
                        }}
                        // checked={100}
                        name={"My Check Box"}
                    /> */}
                </CssVarsProvider>


            </Box>





        </Box>
    )
}

export default Home

