import React, { useCallback, useState, memo, useMemo } from 'react'
import IncidentSubCategoryTable from './IncidentSubCategoryTable'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { Box, } from '@mui/joy'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IncidentCategoryMasterSelect from 'src/views/CommonSelectCode/IncidentCategoryMasterSelect'
import { getAllIncidentSubCategory } from '../CommonCode/IncidentCommonCode'
import { useQuery } from '@tanstack/react-query'


const IncidentSubCategoryMaster = () => {


    const history = useNavigate()
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState(0)

    // Get login user emp_id
    const id = useSelector(state => {
        return state.LoginUserData.empid
    });

    const [subcategory, setSubCategory] = useState({
        subcategory_slno: '',
        subcategory_name: '',
        subcategory_status: false
    })
    const { subcategory_slno, subcategory_name, subcategory_status } = subcategory;


    const updateSubCategory = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setSubCategory({ ...subcategory, [e.target.name]: value })
        },
        [subcategory]
    )
    const reset = () => {
        const frmdata = {
            subcategory_slno: '',
            subcategory_name: '',
            subcategory_status: false
        }
        setSubCategory(frmdata)
        setValue(0)
        setCategory(0)
    };


    const {
        data: incidentsubcategory,
        refetch: FetchallSubCategoryData
        // isLoading: isLoadingIncident,
        // error: categoryerr
    } = useQuery({
        queryKey: 'getincidentsubcategory',
        queryFn: () => getAllIncidentSubCategory(),
        enabled: true
    })


    const postdata = useMemo(() => {
        return {
            subcategory_name: subcategory_name,
            category_slno: category,
            subcategory_status: subcategory_status === true ? 1 : 0,
            create_user: id
        }
    }, [subcategory_name, category, subcategory_status, id])

    const patchdata = useMemo(() => {
        return {
            subcategory_slno: subcategory_slno,
            subcategory_name: subcategory_name,
            category_slno: category,
            subcategory_status: subcategory_status === true ? 1 : 0,
            edit_user: id
        }
    }, [subcategory_slno, subcategory_name, category, subcategory_status, id]);


    const rowSelect = useCallback(params => {
        setValue(1)
        const data = params.api.getSelectedRows();
        const { inc_sub_cat_slno, inc_sub_category_name, inc_category_slno, inc_sub_category_status } = data[0]
        const frmdata = {
            subcategory_slno: inc_sub_cat_slno,
            subcategory_name: inc_sub_category_name,
            category_slno: inc_category_slno,
            subcategory_status: inc_sub_category_status === 1 ? true : false
        }
        setSubCategory(frmdata)
        setCategory(inc_category_slno)
    }, [])



    // Handleing subcategory 
    const submitSubCategory = useCallback(
        e => {
            e.preventDefault()
            const InsertSubCategory = async postdata => {
                const result = await axioslogin.post('/incidentMaster/insertsubcatmast', postdata)
                return result.data
            };

            const SubCategoryUpdate = async patchdata => {
                const result = await axioslogin.patch('/incidentMaster/updatesubcatmast', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    FetchallSubCategoryData()
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            };

            if (value === 0) {
                if (subcategory_name !== '' && category !== 0) {
                    InsertSubCategory(postdata).then(val => {
                        const { message, success } = val
                        if (success === 2) {
                            succesNotify(message)
                            FetchallSubCategoryData()
                            reset()
                        } else if (success === 0) {
                            infoNotify(message)
                            reset()
                        } else {
                            infoNotify(message)
                        }
                    })
                } else {
                    infoNotify('Please Enter Subcategory Name and Select Category')
                }
            } else {
                SubCategoryUpdate(patchdata)
            }
        },
        [postdata, value, patchdata, subcategory_name, category]
    );


    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history]);



    const refreshWindow = useCallback(() => {
        const frmdata = {
            subcategory_slno: '',
            subcategory_name: '',
            subcategory_status: false
        }
        setSubCategory(frmdata)
        setValue(0)
        reset()
    }, [setSubCategory])
    return (
        <CardMaster title="Subcategory Master" submit={submitSubCategory} close={backtoSetting} refresh={refreshWindow}>
            <Box sx={{ p: 1 }}>
                <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                    <Box sx={{ width: '30%', p: 1 }}>
                        <Box sx={{ pt: 1 }}>
                            <TextFieldCustom
                                placeholder="Subcategory"
                                type="text"
                                size="sm"
                                name="subcategory_name"
                                value={subcategory_name}
                                onchange={updateSubCategory}
                            ></TextFieldCustom>
                        </Box>
                        <Box sx={{ pt: 1.5 }}>
                            <IncidentCategoryMasterSelect value={category} setValue={setCategory} />
                        </Box>
                        <Box sx={{ pt: 1.5 }}>
                            <CusCheckBox
                                label="status"
                                color="primary"
                                size="md"
                                name="subcategory_status"
                                value={subcategory_status}
                                checked={subcategory_status}
                                onCheked={updateSubCategory}
                            ></CusCheckBox>
                        </Box>
                    </Box>
                    <Box sx={{ width: '70%' }}>
                        <IncidentSubCategoryTable tableData={incidentsubcategory} rowSelect={rowSelect} />
                    </Box>
                </Box>
            </Box>
        </CardMaster>
    )
}
export default memo(IncidentSubCategoryMaster)
