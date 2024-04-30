import React, { memo, useCallback, useMemo, useState } from 'react'
import Divider from '@mui/joy/Divider';
import { Box, CssVarsProvider } from '@mui/joy'
import { Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CloseIcon from '@mui/icons-material/Close';
import CusIconButton from 'src/views/Components/CusIconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import SupplierDetailTable from './SupplierDetailTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const SupplierDetails = () => {


    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    const [imdCheck, setimdCheck] = useState(false)
    const [serviceCheck, setServiceCheck] = useState(false)
    const [saleCheck, setSaleCheck] = useState(false)
    const [saleSecCheck, setSaleSecCheck] = useState(false)
    const history = useHistory()
    const [supplierDetl, setSupplierDetl] = useState({
        it_supplier_slno: '',
        it_supplier_name: '',
        it_supplier_land_one: '',
        it_supplier_land_two: '',
        it_supplier_mob_one: '',
        it_supplier_mob_two: '',
        it_supplier_email_one: '',
        it_supplier_email_two: '',
        it_supplier_escl_name: '',
        it_supplier_escl_mob_one: '',
        it_supplier_escl_mob_two: '',
        it_supplier_escl_land_one: '',
        it_supplier_escl_land_two: '',
        it_supplier_escl_email_one: '',
        it_supplier_escl_email_two: '',
        it_supplier_servperson_name: '',
        it_supplier_servperson_land_one: '',
        it_supplier_servperson_land_two: '',
        it_supplier_servperson_mob_one: '',
        it_supplier_servperson_mob_two: '',
        it_supplier_servperson_email_one: '',
        it_supplier_servperson_email_two: '',
        it_supplier_saleperson_name: '',
        it_supplier_saleperson_land_one: '',
        it_supplier_saleperson_land_two: '',
        it_supplier_saleperson_mob_one: '',
        it_supplier_saleperson_mob_two: '',
        it_supplier_saleperson_email_one: '',
        it_supplier_saleperson_email_two: '',
        it_supplier_saleperson_second_name: '',
        it_supplier_saleperson_second_land_one: '',
        it_supplier_saleperson_second_land_two: '',
        it_supplier_saleperson_second_mob_one: '',
        it_supplier_saleperson_second_mob_two: '',
        it_supplier_saleperson_second_email_one: '',
        it_supplier_saleperson_second_email_two: ''
    })
    const { it_supplier_slno, it_supplier_name, it_supplier_land_one, it_supplier_land_two, it_supplier_mob_one, it_supplier_mob_two, it_supplier_email_one,
        it_supplier_email_two, it_supplier_escl_name, it_supplier_escl_mob_one, it_supplier_escl_mob_two, it_supplier_escl_land_one, it_supplier_escl_land_two,
        it_supplier_escl_email_one, it_supplier_escl_email_two, it_supplier_servperson_name, it_supplier_servperson_land_one, it_supplier_servperson_land_two,
        it_supplier_servperson_mob_one, it_supplier_servperson_mob_two, it_supplier_servperson_email_one, it_supplier_servperson_email_two, it_supplier_saleperson_name,
        it_supplier_saleperson_land_one, it_supplier_saleperson_land_two, it_supplier_saleperson_mob_one, it_supplier_saleperson_mob_two, it_supplier_saleperson_email_one,
        it_supplier_saleperson_email_two, it_supplier_saleperson_second_name, it_supplier_saleperson_second_land_one, it_supplier_saleperson_second_land_two,
        it_supplier_saleperson_second_mob_one, it_supplier_saleperson_second_mob_two, it_supplier_saleperson_second_email_one,
        it_supplier_saleperson_second_email_two } = supplierDetl

    const UpdateSupplierDetl = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setSupplierDetl({ ...supplierDetl, [e.target.name]: value })
        },
        [supplierDetl],
    )

    const CheckImmediate = useCallback((e) => {
        if (e.target.checked === true) {
            setimdCheck(true)
        }
        else {
            setimdCheck(false)
        }
    }, [])
    const CheckService = useCallback((e) => {
        if (e.target.checked === true) {
            setServiceCheck(true)
        }
        else {
            setServiceCheck(false)
        }
    }, [])

    const CheckSales = useCallback((e) => {
        if (e.target.checked === true) {
            setSaleCheck(true)
        }
        else {
            setSaleCheck(false)
        }
    }, [])

    const CheckSalesSec = useCallback((e) => {
        if (e.target.checked === true) {
            setSaleSecCheck(true)
        }
        else {
            setSaleSecCheck(false)
        }
    }, [])

    const postdata = useMemo(() => {
        return {
            it_supplier_name: it_supplier_name === '' ? null : it_supplier_name,
            it_supplier_land_one: it_supplier_land_one === '' ? null : it_supplier_land_one,
            it_supplier_land_two: it_supplier_land_two === '' ? null : it_supplier_land_two,
            it_supplier_mob_one: it_supplier_mob_one === '' ? null : it_supplier_mob_one,
            it_supplier_mob_two: it_supplier_mob_two === '' ? null : it_supplier_mob_two,
            it_supplier_email_one: it_supplier_email_one === '' ? null : it_supplier_email_one,
            it_supplier_email_two: it_supplier_email_two === '' ? null : it_supplier_email_two,
            it_supplier_escl_name: imdCheck === true ? it_supplier_name : it_supplier_escl_name,
            it_supplier_escl_mob_one: imdCheck === true ? it_supplier_mob_one : it_supplier_escl_mob_one,
            it_supplier_escl_mob_two: imdCheck === true ? it_supplier_mob_two : it_supplier_escl_mob_two,
            it_supplier_escl_land_one: imdCheck === true ? it_supplier_land_one : it_supplier_escl_land_one,
            it_supplier_escl_land_two: imdCheck === true ? it_supplier_land_two : it_supplier_escl_land_two,
            it_supplier_escl_email_one: imdCheck === true ? it_supplier_email_one : it_supplier_escl_email_one,
            it_supplier_escl_email_two: imdCheck === true ? it_supplier_email_two : it_supplier_escl_email_two,
            it_supplier_servperson_name: serviceCheck === true ? it_supplier_name : it_supplier_servperson_name,
            it_supplier_servperson_land_one: serviceCheck === true ? it_supplier_land_one : it_supplier_servperson_land_one,
            it_supplier_servperson_land_two: serviceCheck === true ? it_supplier_land_two : it_supplier_servperson_land_two,
            it_supplier_servperson_mob_one: serviceCheck === true ? it_supplier_mob_one : it_supplier_servperson_mob_one,
            it_supplier_servperson_mob_two: serviceCheck === true ? it_supplier_mob_two : it_supplier_servperson_mob_two,
            it_supplier_servperson_email_one: serviceCheck === true ? it_supplier_email_one : it_supplier_servperson_email_one,
            it_supplier_servperson_email_two: serviceCheck === true ? it_supplier_email_two : it_supplier_servperson_email_two,
            it_supplier_saleperson_name: saleCheck === true ? it_supplier_name : it_supplier_saleperson_name,
            it_supplier_saleperson_land_one: saleCheck === true ? it_supplier_land_one : it_supplier_saleperson_land_one,
            it_supplier_saleperson_land_two: saleCheck === true ? it_supplier_land_two : it_supplier_saleperson_land_two,
            it_supplier_saleperson_mob_one: saleCheck === true ? it_supplier_mob_one : it_supplier_saleperson_mob_one,
            it_supplier_saleperson_mob_two: saleCheck === true ? it_supplier_mob_two : it_supplier_saleperson_mob_two,
            it_supplier_saleperson_email_one: saleCheck === true ? it_supplier_email_one : it_supplier_saleperson_email_one,
            it_supplier_saleperson_email_two: saleCheck === true ? it_supplier_email_two : it_supplier_saleperson_email_two,
            it_supplier_saleperson_second_name: saleSecCheck === true ? it_supplier_name : it_supplier_saleperson_second_name,
            it_supplier_saleperson_second_land_one: saleSecCheck === true ? it_supplier_land_one : it_supplier_saleperson_second_land_one,
            it_supplier_saleperson_second_land_two: saleSecCheck === true ? it_supplier_land_two : it_supplier_saleperson_second_land_two,
            it_supplier_saleperson_second_mob_one: saleSecCheck === true ? it_supplier_mob_one : it_supplier_saleperson_second_mob_one,
            it_supplier_saleperson_second_mob_two: saleSecCheck === true ? it_supplier_mob_two : it_supplier_saleperson_second_mob_two,
            it_supplier_saleperson_second_email_one: saleSecCheck === true ? it_supplier_email_one : it_supplier_saleperson_second_email_one,
            it_supplier_saleperson_second_email_two: saleSecCheck === true ? it_supplier_email_two : it_supplier_saleperson_second_email_two,
            create_user: id
        }
    }, [it_supplier_name, it_supplier_land_one, it_supplier_land_two, it_supplier_mob_one, it_supplier_mob_two, it_supplier_email_one,
        it_supplier_email_two, it_supplier_escl_name, it_supplier_escl_mob_one, it_supplier_escl_mob_two, it_supplier_escl_land_one, it_supplier_escl_land_two,
        it_supplier_escl_email_one, it_supplier_escl_email_two, it_supplier_servperson_name, it_supplier_servperson_land_one, it_supplier_servperson_land_two,
        it_supplier_servperson_mob_one, it_supplier_servperson_mob_two, it_supplier_servperson_email_one, it_supplier_servperson_email_two, it_supplier_saleperson_name,
        it_supplier_saleperson_land_one, it_supplier_saleperson_land_two, it_supplier_saleperson_mob_one, it_supplier_saleperson_mob_two, it_supplier_saleperson_email_one,
        it_supplier_saleperson_email_two, it_supplier_saleperson_second_name, it_supplier_saleperson_second_land_one, it_supplier_saleperson_second_land_two,
        it_supplier_saleperson_second_mob_one, it_supplier_saleperson_second_mob_two, it_supplier_saleperson_second_email_one,
        it_supplier_saleperson_second_email_two, id, imdCheck, saleCheck, saleSecCheck, serviceCheck])

    const patchdata = useMemo(() => {

        return {
            it_supplier_slno: it_supplier_slno,
            it_supplier_name: it_supplier_name === '' ? null : it_supplier_name,
            it_supplier_land_one: it_supplier_land_one === '' ? null : it_supplier_land_one,
            it_supplier_land_two: it_supplier_land_two === '' ? null : it_supplier_land_two,
            it_supplier_mob_one: it_supplier_mob_one === '' ? null : it_supplier_mob_one,
            it_supplier_mob_two: it_supplier_mob_two === '' ? null : it_supplier_mob_two,
            it_supplier_email_one: it_supplier_email_one === '' ? null : it_supplier_email_one,
            it_supplier_email_two: it_supplier_email_two === '' ? null : it_supplier_email_two,
            it_supplier_escl_name: it_supplier_escl_name === '' ? it_supplier_name : it_supplier_escl_name,
            it_supplier_escl_mob_one: it_supplier_escl_mob_one === '' ? it_supplier_mob_one : it_supplier_escl_mob_one,
            it_supplier_escl_mob_two: it_supplier_escl_mob_two === '' ? it_supplier_mob_two : it_supplier_escl_mob_two,
            it_supplier_escl_land_one: it_supplier_escl_land_one === '' ? it_supplier_land_one : it_supplier_escl_land_one,
            it_supplier_escl_land_two: it_supplier_escl_land_two === '' ? it_supplier_land_two : it_supplier_escl_land_two,
            it_supplier_escl_email_one: it_supplier_escl_email_one === '' ? it_supplier_email_one : it_supplier_escl_email_one,
            it_supplier_escl_email_two: it_supplier_escl_email_two === '' ? it_supplier_email_two : it_supplier_escl_email_two,
            it_supplier_servperson_name: it_supplier_servperson_name === '' ? it_supplier_name : it_supplier_servperson_name,
            it_supplier_servperson_land_one: it_supplier_servperson_land_one === '' ? it_supplier_land_one : it_supplier_servperson_land_one,
            it_supplier_servperson_land_two: it_supplier_servperson_land_two === '' ? it_supplier_land_two : it_supplier_servperson_land_two,
            it_supplier_servperson_mob_one: it_supplier_servperson_mob_one === '' ? it_supplier_mob_one : it_supplier_servperson_mob_one,
            it_supplier_servperson_mob_two: it_supplier_servperson_mob_two === '' ? it_supplier_mob_two : it_supplier_servperson_mob_two,
            it_supplier_servperson_email_one: it_supplier_servperson_email_one === '' ? it_supplier_email_one : it_supplier_servperson_email_one,
            it_supplier_servperson_email_two: it_supplier_servperson_email_two === '' ? it_supplier_email_two : it_supplier_servperson_email_two,
            it_supplier_saleperson_name: it_supplier_saleperson_name === '' ? it_supplier_name : it_supplier_saleperson_name,
            it_supplier_saleperson_land_one: it_supplier_saleperson_land_one === '' ? it_supplier_land_one : it_supplier_saleperson_land_one,
            it_supplier_saleperson_land_two: it_supplier_saleperson_land_two === '' ? it_supplier_land_two : it_supplier_saleperson_land_two,
            it_supplier_saleperson_mob_one: it_supplier_saleperson_mob_one === '' ? it_supplier_mob_one : it_supplier_saleperson_mob_one,
            it_supplier_saleperson_mob_two: it_supplier_saleperson_mob_two === '' ? it_supplier_mob_two : it_supplier_saleperson_mob_two,
            it_supplier_saleperson_email_one: it_supplier_saleperson_email_one === '' ? it_supplier_email_one : it_supplier_saleperson_email_one,
            it_supplier_saleperson_email_two: it_supplier_saleperson_email_two === '' ? it_supplier_email_two : it_supplier_saleperson_email_two,
            it_supplier_saleperson_second_name: it_supplier_saleperson_second_name === '' ? it_supplier_name : it_supplier_saleperson_second_name,
            it_supplier_saleperson_second_land_one: it_supplier_saleperson_second_land_one === '' ? it_supplier_land_one : it_supplier_saleperson_second_land_one,
            it_supplier_saleperson_second_land_two: it_supplier_saleperson_second_land_two === '' ? it_supplier_land_two : it_supplier_saleperson_second_land_two,
            it_supplier_saleperson_second_mob_one: it_supplier_saleperson_second_mob_one === '' ? it_supplier_mob_one : it_supplier_saleperson_second_mob_one,
            it_supplier_saleperson_second_mob_two: it_supplier_saleperson_second_mob_two === '' ? it_supplier_mob_two : it_supplier_saleperson_second_mob_two,
            it_supplier_saleperson_second_email_one: it_supplier_saleperson_second_email_one === '' ? it_supplier_email_one : it_supplier_saleperson_second_email_one,
            it_supplier_saleperson_second_email_two: it_supplier_saleperson_second_email_two === '' ? it_supplier_email_two : it_supplier_saleperson_second_email_two,
            edit_user: id
        }
    }, [it_supplier_slno, it_supplier_name, it_supplier_land_one, it_supplier_land_two, it_supplier_mob_one, it_supplier_mob_two, it_supplier_email_one,
        it_supplier_email_two, it_supplier_escl_name, it_supplier_escl_mob_one, it_supplier_escl_mob_two, it_supplier_escl_land_one, it_supplier_escl_land_two,
        it_supplier_escl_email_one, it_supplier_escl_email_two, it_supplier_servperson_name, it_supplier_servperson_land_one, it_supplier_servperson_land_two,
        it_supplier_servperson_mob_one, it_supplier_servperson_mob_two, it_supplier_servperson_email_one, it_supplier_servperson_email_two, it_supplier_saleperson_name,
        it_supplier_saleperson_land_one, it_supplier_saleperson_land_two, it_supplier_saleperson_mob_one, it_supplier_saleperson_mob_two, it_supplier_saleperson_email_one,
        it_supplier_saleperson_email_two, it_supplier_saleperson_second_name, it_supplier_saleperson_second_land_one, it_supplier_saleperson_second_land_two,
        it_supplier_saleperson_second_mob_one, it_supplier_saleperson_second_mob_two, it_supplier_saleperson_second_email_one,
        it_supplier_saleperson_second_email_two, id])

    const rowSelect = useCallback((data) => {
        setValue(1)

        const {
            it_supplier_slno,
            it_supplier_name,
            it_supplier_land_one,
            it_supplier_land_two,
            it_supplier_mob_one,
            it_supplier_mob_two,
            it_supplier_email_one,
            it_supplier_email_two,
            it_supplier_escl_name,
            it_supplier_escl_mob_one,
            it_supplier_escl_mob_two,
            it_supplier_escl_land_one,
            it_supplier_escl_land_two,
            it_supplier_escl_email_one,
            it_supplier_escl_email_two,
            it_supplier_servperson_name,
            it_supplier_servperson_land_one,
            it_supplier_servperson_land_two,
            it_supplier_servperson_mob_one,
            it_supplier_servperson_mob_two,
            it_supplier_servperson_email_one,
            it_supplier_servperson_email_two,
            it_supplier_saleperson_name,
            it_supplier_saleperson_land_one,
            it_supplier_saleperson_land_two,
            it_supplier_saleperson_mob_one,
            it_supplier_saleperson_mob_two,
            it_supplier_saleperson_email_one,
            it_supplier_saleperson_email_two,
            it_supplier_saleperson_second_name,
            it_supplier_saleperson_second_land_one,
            it_supplier_saleperson_second_land_two,
            it_supplier_saleperson_second_mob_one,
            it_supplier_saleperson_second_mob_two,
            it_supplier_saleperson_second_email_one,
            it_supplier_saleperson_second_email_two,

        } = data

        const frmdata = {
            it_supplier_slno: it_supplier_slno === '' ? null : it_supplier_slno,
            it_supplier_name: it_supplier_name === '' ? null : it_supplier_name,
            it_supplier_land_one: it_supplier_land_one === '' ? null : it_supplier_land_one,
            it_supplier_land_two: it_supplier_land_two === '' ? null : it_supplier_land_two,
            it_supplier_mob_one: it_supplier_mob_one === '' ? null : it_supplier_mob_one,
            it_supplier_mob_two: it_supplier_mob_two === '' ? null : it_supplier_mob_two,
            it_supplier_email_one: it_supplier_email_one === '' ? null : it_supplier_email_one,
            it_supplier_email_two: it_supplier_email_two === '' ? null : it_supplier_email_two,
            it_supplier_escl_name: it_supplier_escl_name === '' ? null : it_supplier_escl_name,
            it_supplier_escl_mob_one: it_supplier_escl_mob_one === '' ? null : it_supplier_escl_mob_one,
            it_supplier_escl_mob_two: it_supplier_escl_mob_two === '' ? null : it_supplier_escl_mob_two,
            it_supplier_escl_land_one: it_supplier_escl_land_one === '' ? null : it_supplier_escl_land_one,
            it_supplier_escl_land_two: it_supplier_escl_land_two === '' ? null : it_supplier_escl_land_two,
            it_supplier_escl_email_one: it_supplier_escl_email_one === '' ? null : it_supplier_escl_email_one,
            it_supplier_escl_email_two: it_supplier_escl_email_two === '' ? null : it_supplier_escl_email_two,
            it_supplier_servperson_name: it_supplier_servperson_name === '' ? null : it_supplier_servperson_name,
            it_supplier_servperson_land_one: it_supplier_servperson_land_one === '' ? null : it_supplier_servperson_land_one,
            it_supplier_servperson_land_two: it_supplier_servperson_land_two === '' ? null : it_supplier_servperson_land_two,
            it_supplier_servperson_mob_one: it_supplier_servperson_mob_one === '' ? null : it_supplier_servperson_mob_one,
            it_supplier_servperson_mob_two: it_supplier_servperson_mob_two === '' ? null : it_supplier_servperson_mob_two,
            it_supplier_servperson_email_one: it_supplier_servperson_email_one === '' ? null : it_supplier_servperson_email_one,
            it_supplier_servperson_email_two: it_supplier_servperson_email_two === '' ? null : it_supplier_servperson_email_two,
            it_supplier_saleperson_name: it_supplier_saleperson_name === '' ? null : it_supplier_saleperson_name,
            it_supplier_saleperson_land_one: it_supplier_saleperson_land_one === '' ? null : it_supplier_saleperson_land_one,
            it_supplier_saleperson_land_two: it_supplier_saleperson_land_two === '' ? null : it_supplier_saleperson_land_two,
            it_supplier_saleperson_mob_one: it_supplier_saleperson_mob_one === '' ? null : it_supplier_saleperson_mob_one,
            it_supplier_saleperson_mob_two: it_supplier_saleperson_mob_two === '' ? null : it_supplier_saleperson_mob_two,
            it_supplier_saleperson_email_one: it_supplier_saleperson_email_one === '' ? null : it_supplier_saleperson_email_one,
            it_supplier_saleperson_email_two: it_supplier_saleperson_email_two === '' ? null : it_supplier_saleperson_email_two,
            it_supplier_saleperson_second_name: it_supplier_saleperson_second_name === '' ? null : it_supplier_saleperson_second_name,
            it_supplier_saleperson_second_land_one: it_supplier_saleperson_second_land_one === '' ? null : it_supplier_saleperson_second_land_one,
            it_supplier_saleperson_second_land_two: it_supplier_saleperson_second_land_two === '' ? null : it_supplier_saleperson_second_land_two,
            it_supplier_saleperson_second_mob_one: it_supplier_saleperson_second_mob_one === '' ? null : it_supplier_saleperson_second_mob_one,
            it_supplier_saleperson_second_mob_two: it_supplier_saleperson_second_mob_two === '' ? null : it_supplier_saleperson_second_mob_two,
            it_supplier_saleperson_second_email_one: it_supplier_saleperson_second_email_one === '' ? null : it_supplier_saleperson_second_email_one,
            it_supplier_saleperson_second_email_two: it_supplier_saleperson_second_email_two === '' ? null : it_supplier_saleperson_second_email_two,
            edit_user: id
        }
        setSupplierDetl(frmdata)
    }, [id,])

    const reset = useCallback(() => {
        const frmdata = {
            it_supplier_slno: '',
            it_supplier_name: '',
            it_supplier_land_one: '',
            it_supplier_land_two: '',
            it_supplier_mob_one: '',
            it_supplier_mob_two: '',
            it_supplier_email_one: '',
            it_supplier_email_two: '',
            it_supplier_escl_name: '',
            it_supplier_escl_mob_one: '',
            it_supplier_escl_mob_two: '',
            it_supplier_escl_land_one: '',
            it_supplier_escl_land_two: '',
            it_supplier_escl_email_one: '',
            it_supplier_escl_email_two: '',
            it_supplier_servperson_name: '',
            it_supplier_servperson_land_one: '',
            it_supplier_servperson_land_two: '',
            it_supplier_servperson_mob_one: '',
            it_supplier_servperson_mob_two: '',
            it_supplier_servperson_email_one: '',
            it_supplier_servperson_email_two: '',
            it_supplier_saleperson_name: '',
            it_supplier_saleperson_land_one: '',
            it_supplier_saleperson_land_two: '',
            it_supplier_saleperson_mob_one: '',
            it_supplier_saleperson_mob_two: '',
            it_supplier_saleperson_email_one: '',
            it_supplier_saleperson_email_two: '',
            it_supplier_saleperson_second_name: '',
            it_supplier_saleperson_second_land_one: '',
            it_supplier_saleperson_second_land_two: '',
            it_supplier_saleperson_second_mob_one: '',
            it_supplier_saleperson_second_mob_two: '',
            it_supplier_saleperson_second_email_one: '',
            it_supplier_saleperson_second_email_two: ''
        }
        setSupplierDetl(frmdata)
        setimdCheck(false)
        setServiceCheck(false)
        setSaleCheck(false)
        setSaleSecCheck(false)
    }, [])

    const submitSupplierDetails = useCallback(
        (e) => {
            e.preventDefault()
            const isValidMobileNumber = (number) => /^\d{10}$/.test(number);
            const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

            if (it_supplier_mob_one !== '') {
                if (!isValidMobileNumber(it_supplier_mob_one)) {
                    infoNotify("Please enter a valid 10-digit  mobile number in supplier Details");
                    return;
                }
            }
            if (it_supplier_mob_two !== '') {
                if (!isValidMobileNumber(it_supplier_mob_two)) {
                    infoNotify("Please enter a valid 10-digit  mobile number(additional) in supplier Details");
                    return;
                }
            }
            if (it_supplier_escl_mob_one !== '') {
                if (!isValidMobileNumber(it_supplier_escl_mob_one)) {
                    infoNotify("Please enter a valid 10-digit  mobile number in Immediate Contact Person Details");
                    return;
                }
            }
            if (it_supplier_escl_mob_two !== '') {
                if (!isValidMobileNumber(it_supplier_escl_mob_two)) {
                    infoNotify("Please enter a valid 10-digit  mobile number(additional) in Immediate Contact Person Details");
                    return;
                }
            }
            if (it_supplier_servperson_mob_one !== '') {
                if (!isValidMobileNumber(it_supplier_servperson_mob_one)) {
                    infoNotify("Please enter a valid 10-digit  mobile number in Service Contact Person Details");
                    return;
                }
            }
            if (it_supplier_servperson_mob_two !== '') {
                if (!isValidMobileNumber(it_supplier_servperson_mob_two)) {
                    infoNotify("Please enter a valid 10-digit  mobile number (additional) in Service Contact Person Details");
                    return;
                }
            }
            if (it_supplier_saleperson_mob_one !== '') {
                if (!isValidMobileNumber(it_supplier_saleperson_mob_one)) {
                    infoNotify("Please enter a valid 10-digit  mobile number in Sales Contact Person Details");
                    return;
                }
            }
            if (it_supplier_saleperson_mob_two !== '') {
                if (!isValidMobileNumber(it_supplier_saleperson_mob_two)) {
                    infoNotify("Please enter a valid 10-digit  mobile number(additional) in Sales Contact Person Details");
                    return;
                }
            }
            if (it_supplier_saleperson_second_mob_one !== '') {
                if (!isValidMobileNumber(it_supplier_saleperson_second_mob_one)) {
                    infoNotify("Please enter a valid 10-digit  mobile number in Secondary Sales Contact Person Details");
                    return;
                }
            }
            if (it_supplier_saleperson_second_mob_two !== '') {
                if (!isValidMobileNumber(it_supplier_saleperson_second_mob_two)) {
                    infoNotify("Please enter a valid 10-digit  mobile number (additional) in Secondary Sales Contact Person Details");
                    return;
                }
            }
            if (it_supplier_email_one !== '') {
                if (!isEmail(it_supplier_email_one)) {
                    infoNotify("Please enter a valid email Address in supplier Details");
                    return;
                }
            }
            if (it_supplier_email_two !== '') {
                if (!isEmail(it_supplier_email_two)) {
                    infoNotify("Please enter a valid additional email Address in supplier Details");
                    return;
                }
            }
            if (it_supplier_escl_email_one !== '') {
                if (!isEmail(it_supplier_escl_email_one)) {
                    infoNotify("Please enter a valid email address in immediate contact person Details");
                    return;
                }
            }
            if (it_supplier_escl_email_two !== '') {
                if (!isEmail(it_supplier_escl_email_two)) {
                    infoNotify("Please enter a valid email address (additional) in immediate contact person Details");
                    return;
                }
            }
            if (it_supplier_servperson_email_one !== '') {
                if (!isEmail(it_supplier_servperson_email_one)) {
                    infoNotify("Please enter a valid email address in immediate contact person Details");
                    return;
                }
            }
            if (it_supplier_servperson_email_two !== '') {
                if (!isEmail(it_supplier_servperson_email_two)) {
                    infoNotify("Please enter a valid email address (additional) in immediate contact person Details");
                    return;
                }
            }
            if (it_supplier_saleperson_email_one !== '') {
                if (!isEmail(it_supplier_saleperson_email_one)) {
                    infoNotify("Please enter a valid email address in immediate contact person Details");
                    return;
                }
            }
            if (it_supplier_saleperson_email_two !== '') {
                if (!isEmail(it_supplier_saleperson_email_two)) {
                    infoNotify("Please enter a valid email address(additional) in immediate contact person Details");
                    return;
                }
            }
            if (it_supplier_saleperson_second_email_one !== '') {
                if (!isEmail(it_supplier_saleperson_second_email_one)) {
                    infoNotify("Please enter a valid email address in immediate contact person Details");
                    return;
                }
            }
            if (it_supplier_saleperson_email_two !== '') {
                if (!isEmail(it_supplier_saleperson_second_email_two)) {
                    infoNotify("Please enter a valid email address(additional) in immediate contact person Details");
                    return;
                }
            }
            const InsertSupplierDetails = async (postdata) => {
                const result = await axioslogin.post('/ItBillSuppDetails/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            const UpdateSupplierDetails = async (patchdata) => {
                const result = await axioslogin.patch('/ItBillSuppDetails/update', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }

            if (value === 0) {
                if (imdCheck === true || serviceCheck === true || saleCheck === true || saleSecCheck === true) {
                    InsertSupplierDetails(postdata)
                } else {
                    if (it_supplier_name !== '' && it_supplier_land_one !== '' && it_supplier_mob_one !== '' && it_supplier_email_one !== '' && it_supplier_escl_name !== '' &&
                        it_supplier_escl_land_one !== '' && it_supplier_escl_mob_one !== '' && it_supplier_escl_email_one !== '' && it_supplier_servperson_name !== '' &&
                        it_supplier_servperson_land_one !== '' && it_supplier_servperson_mob_one !== '' && it_supplier_servperson_email_one !== '' &&
                        it_supplier_saleperson_name !== '' && it_supplier_saleperson_land_one !== '' && it_supplier_saleperson_mob_one !== '' && it_supplier_saleperson_email_one !== ''
                        && it_supplier_saleperson_second_name !== '' && it_supplier_saleperson_second_land_one !== '' && it_supplier_saleperson_second_mob_one !== '' &&
                        it_supplier_saleperson_second_email_one !== '') {
                        InsertSupplierDetails(postdata)
                    }
                    else {
                        infoNotify("Please Fill Manadatory feilds")
                    }

                }
            }
            else {
                if (imdCheck === true || serviceCheck === true || saleCheck === true || saleSecCheck === true) {
                    UpdateSupplierDetails(patchdata)
                } else {
                    if (it_supplier_name !== '' && it_supplier_land_one !== '' && it_supplier_mob_one !== '' && it_supplier_email_one !== '' && it_supplier_escl_name !== '' &&
                        it_supplier_escl_land_one !== '' && it_supplier_escl_mob_one !== '' && it_supplier_escl_email_one !== '' && it_supplier_servperson_name !== '' &&
                        it_supplier_servperson_land_one !== '' && it_supplier_servperson_mob_one !== '' && it_supplier_servperson_email_one !== '' &&
                        it_supplier_saleperson_name !== '' && it_supplier_saleperson_land_one !== '' && it_supplier_saleperson_mob_one !== '' && it_supplier_saleperson_email_one !== ''
                        && it_supplier_saleperson_second_name !== '' && it_supplier_saleperson_second_land_one !== '' && it_supplier_saleperson_second_mob_one !== '' &&
                        it_supplier_saleperson_second_email_one !== '') {
                        UpdateSupplierDetails(patchdata)
                    }
                    else {
                        infoNotify("Please Fill Manadatory feilds")
                    }
                }
            }
        },
        [postdata, value, patchdata, count, setCount, it_supplier_name, reset, it_supplier_mob_two, it_supplier_mob_one, it_supplier_servperson_mob_one,
            imdCheck, it_supplier_email_one, it_supplier_email_two, it_supplier_escl_email_one, it_supplier_escl_email_two, it_supplier_servperson_name,
            it_supplier_servperson_land_one,
            it_supplier_servperson_mob_two, it_supplier_servperson_email_one, it_supplier_servperson_email_two, it_supplier_saleperson_name,
            it_supplier_saleperson_land_one, it_supplier_saleperson_mob_one, it_supplier_saleperson_mob_two, it_supplier_saleperson_email_one,
            it_supplier_saleperson_email_two, it_supplier_saleperson_second_name, it_supplier_saleperson_second_land_one,
            it_supplier_saleperson_second_mob_one, it_supplier_saleperson_second_mob_two, it_supplier_saleperson_second_email_one, saleSecCheck, serviceCheck,
            it_supplier_escl_mob_two,
            it_supplier_saleperson_second_email_two, it_supplier_escl_land_one, it_supplier_escl_mob_one, it_supplier_escl_name, it_supplier_land_one, saleCheck],
    )


    const backtoHome = useCallback(() => {
        history.push('/Home')
    }, [history])


    return (
        <Box>
            <Paper sx={{ borderRadius: 0 }}>
                <Box sx={{ flex: 1, height: 35, borderBottom: 1, borderColor: 'lightgrey', display: 'flex' }}>
                    <Box sx={{ flex: 1, fontWeight: 600, pl: .8, pt: .8, color: '#C7C8CB' }}>Service Supplier Details</Box>
                    <Box>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={backtoHome}>
                            <CloseIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </Box>
                <Box sx={{ p: .5 }}>
                    <Box sx={{ flex: 1, bgcolor: '#E2E8EF', p: 1.5 }}>
                        <Paper sx={{ flex: 1, borderRadius: 0, p: 2 }}>
                            <CssVarsProvider>
                                <Divider sx={{ '--Divider-childPosition': `1%`, fontWeight: 600, fontSize: 18, color: '#54627B' }}>Supplier Details</Divider>
                            </CssVarsProvider>
                            <Box sx={{ px: 2, pt: 2 }}>
                                <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>Supplier Name<span style={{ color: '#74112F' }} >*</span>&nbsp;:</Box>
                                <Box sx={{ flex: 1, fontWeight: 600 }}>
                                    <TextFieldCustom
                                        placeholder=" supplier name"
                                        type="text"
                                        size="sm"
                                        name="it_supplier_name"
                                        value={it_supplier_name}
                                        onchange={UpdateSupplierDetl}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                <Box sx={{ flex: 1, px: .5 }}>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                        Phone No. 1<span style={{ color: '#74112F' }} >*</span>
                                    </Box>
                                    <Box sx={{ fontWeight: 600 }}>
                                        <TextFieldCustom

                                            placeholder="enter phone no."
                                            type="number"
                                            size="sm"
                                            name="it_supplier_land_one"
                                            value={it_supplier_land_one}
                                            onchange={UpdateSupplierDetl}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, px: .5 }}>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                        Phone No. 2
                                        {/* <span style={{ color: '#74112F' }} >*</span> */}
                                    </Box>
                                    <Box sx={{ fontWeight: 600 }}>
                                        <TextFieldCustom
                                            placeholder="enter additional phone no."
                                            type="number"
                                            size="sm"
                                            name="it_supplier_land_two"
                                            value={it_supplier_land_two}
                                            onchange={UpdateSupplierDetl}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                <Box sx={{ flex: 1, px: .5 }}>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                        Mobile No. 1<span style={{ color: '#74112F' }} >*</span>
                                    </Box>
                                    <Box sx={{ fontWeight: 600 }}>
                                        <TextFieldCustom
                                            placeholder="enter mobile number"
                                            type="number"
                                            size="sm"
                                            name="it_supplier_mob_one"
                                            value={it_supplier_mob_one}
                                            onchange={UpdateSupplierDetl}
                                        ></TextFieldCustom>

                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, px: .5 }}>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                        Mobile No. 2
                                        {/* <span style={{ color: '#74112F' }} >*</span> */}
                                    </Box>
                                    <Box sx={{ fontWeight: 600 }}>
                                        <TextFieldCustom
                                            placeholder=" enter additional mobile number"
                                            type="number"
                                            size="sm"
                                            name="it_supplier_mob_two"
                                            value={it_supplier_mob_two}
                                            onchange={UpdateSupplierDetl}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                <Box sx={{ flex: 1, px: .5 }}>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                        Email Id 1<span style={{ color: '#74112F' }} >*</span>
                                    </Box>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                        <TextFieldCustom
                                            placeholder="example@gmail.com"
                                            type='text'
                                            size="sm"
                                            name="it_supplier_email_one"
                                            value={it_supplier_email_one}
                                            onchange={UpdateSupplierDetl}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, px: .5 }}>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                        Email Id 2
                                        {/* <span style={{ color: '#74112F' }} >*</span> */}
                                    </Box>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                        <TextFieldCustom
                                            placeholder="example@gmail.com"
                                            type="text"
                                            size="sm"
                                            name="it_supplier_email_two"
                                            value={it_supplier_email_two}
                                            onchange={UpdateSupplierDetl}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                        <Box sx={{ display: 'flex' }}>
                            <Paper sx={{ flex: 1, borderRadius: 0, p: 2, mt: 1, mr: .5 }}>
                                <CssVarsProvider>
                                    <Divider sx={{ '--Divider-childPosition': `2%`, fontWeight: 600, fontSize: 18, color: '#54627B' }}>Immediate contact Details</Divider>
                                </CssVarsProvider>
                                <Box sx={{ px: 2, }}>
                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#0E86D4', pr: .5, pb: .5 }}>Same as Supplier Details</Box>
                                        <CusCheckBox
                                            name='imdCheck'
                                            value={imdCheck}
                                            checked={imdCheck}
                                            onCheked={CheckImmediate}>
                                        </CusCheckBox>
                                    </Box>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', flex: 1, pl: .5 }}>Person Name<span style={{ color: '#74112F' }} >*</span> &nbsp;:</Box>
                                    <Box sx={{ flex: 1, fontWeight: 600, fontSize: 12, }}>
                                        {imdCheck === true ?
                                            <TextFieldCustom
                                                placeholder="person name"
                                                type="text"
                                                size="sm"
                                                name="it_supplier_name"
                                                value={it_supplier_name}
                                                disabled={true}
                                            ></TextFieldCustom> :
                                            <TextFieldCustom
                                                placeholder="person name"
                                                type="text"
                                                size="sm"
                                                name="it_supplier_escl_name"
                                                value={it_supplier_escl_name}
                                                onchange={UpdateSupplierDetl}
                                            ></TextFieldCustom>
                                        }
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Phone No. 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {imdCheck === true ?
                                                <TextFieldCustom
                                                    placeholder=" enter phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_land_one"
                                                    value={it_supplier_land_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder=" enter phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_escl_land_one"
                                                    value={it_supplier_escl_land_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>
                                            }
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Phone No. 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {imdCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter additional phone no."
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_land_two"
                                                    value={it_supplier_land_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter additional phone no."
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_escl_land_two"
                                                    value={it_supplier_escl_land_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}

                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Mobile No. 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {imdCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_mob_one"
                                                    value={it_supplier_mob_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_escl_mob_one"
                                                    value={it_supplier_escl_mob_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}

                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Mobile No. 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {imdCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter additional mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_mob_two"
                                                    value={it_supplier_mob_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter additional mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_escl_mob_two"
                                                    value={it_supplier_escl_mob_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Email Id 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {imdCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_email_one"
                                                    value={it_supplier_email_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_escl_email_one"
                                                    value={it_supplier_escl_email_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Email Id 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {imdCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_email_two"
                                                    value={it_supplier_email_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_escl_email_two"
                                                    value={it_supplier_escl_email_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                            <Paper sx={{ flex: 1, borderRadius: 0, p: 2, mt: 1, ml: .5 }}>
                                <CssVarsProvider>
                                    <Divider sx={{ '--Divider-childPosition': `2%`, fontWeight: 600, fontSize: 18, color: '#54627B' }}>Service Contact Details</Divider>
                                </CssVarsProvider>
                                <Box sx={{ px: 2, }}>
                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#0E86D4', pr: .5, pb: .5 }}>Same as Supplier Details</Box>
                                        <CusCheckBox
                                            name='serviceCheck'
                                            value={serviceCheck}
                                            checked={serviceCheck}
                                            onCheked={CheckService}>
                                        </CusCheckBox>
                                    </Box>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', flex: 1, pl: .5 }}>Person Name <span style={{ color: '#74112F' }} >*</span>&nbsp;:</Box>
                                    <Box sx={{ flex: 1, fontWeight: 600, fontSize: 12, }}>
                                        {serviceCheck === true ?
                                            <TextFieldCustom
                                                placeholder="Person Name"
                                                type="text"
                                                size="sm"
                                                name="it_supplier_name"
                                                value={it_supplier_name}
                                                disabled={true}
                                            ></TextFieldCustom> :
                                            <TextFieldCustom
                                                placeholder="Person Name"
                                                type="text"
                                                size="sm"
                                                name="it_supplier_servperson_name"
                                                value={it_supplier_servperson_name}
                                                onchange={UpdateSupplierDetl}
                                            ></TextFieldCustom>}
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Phone No. 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {serviceCheck === true ?
                                                <TextFieldCustom
                                                    placeholder=" enter phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_land_one"
                                                    value={it_supplier_land_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder=" enter phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_servperson_land_one"
                                                    value={it_supplier_servperson_land_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}

                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Phone No. 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {serviceCheck === true ?
                                                <TextFieldCustom
                                                    placeholder=" enter additional phone no."
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_land_two"
                                                    value={it_supplier_land_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder=" enter additional phone no."
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_servperson_land_two"
                                                    value={it_supplier_servperson_land_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Mobile No. 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {serviceCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_mob_one"
                                                    value={it_supplier_mob_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_servperson_mob_one"
                                                    value={it_supplier_servperson_mob_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Mobile No. 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {serviceCheck === true ?
                                                <TextFieldCustom
                                                    placeholder=" enter additional mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_mob_two"
                                                    value={it_supplier_mob_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder=" enter additional mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_servperson_mob_two"
                                                    value={it_supplier_servperson_mob_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Email Id 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {serviceCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_email_one"
                                                    value={it_supplier_email_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_servperson_email_one"
                                                    value={it_supplier_servperson_email_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Email Id 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {serviceCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_email_two"
                                                    value={it_supplier_email_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_servperson_email_two"
                                                    value={it_supplier_servperson_email_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Paper sx={{ flex: 1, borderRadius: 0, p: 2, mt: 1, mr: .5 }}>
                                <CssVarsProvider>
                                    <Divider sx={{ '--Divider-childPosition': `2%`, fontWeight: 600, fontSize: 18, color: '#54627B' }}>Sales Contact Details</Divider>
                                </CssVarsProvider>
                                <Box sx={{ px: 2, }}>
                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#0E86D4', pr: .5, pb: .5 }}>Same as Supplier Details</Box>
                                        <CusCheckBox
                                            name='saleCheck'
                                            value={saleCheck}
                                            checked={saleCheck}
                                            onCheked={CheckSales}
                                        >
                                        </CusCheckBox>
                                    </Box>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', flex: 1, pl: .5 }}>Person Name<span style={{ color: '#74112F' }} >*</span> &nbsp;:</Box>
                                    <Box sx={{ flex: 1, fontWeight: 600, fontSize: 12, }}>
                                        {saleCheck === true ?
                                            <TextFieldCustom
                                                placeholder="Person Name"
                                                type="text"
                                                size="sm"
                                                name="it_supplier_name"
                                                value={it_supplier_name}
                                                disabled={true}
                                            ></TextFieldCustom> :
                                            <TextFieldCustom
                                                placeholder="Person Name"
                                                type="text"
                                                size="sm"
                                                name="it_supplier_saleperson_name"
                                                value={it_supplier_saleperson_name}
                                                onchange={UpdateSupplierDetl}
                                            ></TextFieldCustom>
                                        }
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Phone No. 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleCheck === true ?
                                                <TextFieldCustom
                                                    placeholder=" enter phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_land_one"
                                                    value={it_supplier_land_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder=" enter phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_saleperson_land_one"
                                                    value={it_supplier_saleperson_land_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Phone No. 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleCheck === true ?
                                                <TextFieldCustom
                                                    placeholder=" enter additional phone no."
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_land_two"
                                                    value={it_supplier_land_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder=" enter additional phone no."
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_saleperson_land_two"
                                                    value={it_supplier_saleperson_land_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Mobile No. 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_mob_one"
                                                    value={it_supplier_mob_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_saleperson_mob_one"
                                                    value={it_supplier_saleperson_mob_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Mobile No. 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter additional mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_mob_two"
                                                    value={it_supplier_mob_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter additional mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_saleperson_mob_two"
                                                    value={it_supplier_saleperson_mob_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Email Id 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_email_one"
                                                    value={it_supplier_email_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_saleperson_email_one"
                                                    value={it_supplier_saleperson_email_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Email Id 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_email_two"
                                                    value={it_supplier_email_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_saleperson_email_two"
                                                    value={it_supplier_saleperson_email_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                            <Paper sx={{ flex: 1, borderRadius: 0, p: 2, mt: 1, ml: .5 }}>
                                <CssVarsProvider>
                                    <Divider sx={{ '--Divider-childPosition': `2%`, fontWeight: 600, fontSize: 18, color: '#54627B' }}>Secondary Sales Contact Details</Divider>
                                </CssVarsProvider>
                                <Box sx={{ px: 2, }}>
                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#0E86D4', pr: .5, pb: .5 }}>Same as Supplier Details</Box>
                                        <CusCheckBox
                                            name='saleSecCheck'
                                            value={saleSecCheck}
                                            checked={saleSecCheck}
                                            onCheked={CheckSalesSec}
                                        >
                                        </CusCheckBox>
                                    </Box>
                                    <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', flex: 1, pl: .5 }}>Person Name<span style={{ color: '#74112F' }} >*</span> &nbsp;:</Box>
                                    <Box sx={{ flex: 1, fontWeight: 600, fontSize: 12, }}>
                                        {saleSecCheck === true ?
                                            <TextFieldCustom
                                                placeholder="Person Name"
                                                type="text"
                                                size="sm"
                                                name="it_supplier_name"
                                                value={it_supplier_name}
                                                disabled={true}
                                            ></TextFieldCustom> :
                                            <TextFieldCustom
                                                placeholder="Person Name"
                                                type="text"
                                                size="sm"
                                                name="it_supplier_saleperson_second_name"
                                                value={it_supplier_saleperson_second_name}
                                                onchange={UpdateSupplierDetl}
                                            ></TextFieldCustom>}
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Phone No. 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleSecCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_land_one"
                                                    value={it_supplier_land_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_saleperson_second_land_one"
                                                    value={it_supplier_saleperson_second_land_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Phone No. 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleSecCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter additional phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_land_two"
                                                    value={it_supplier_land_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter additional phone number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_saleperson_second_land_two"
                                                    value={it_supplier_saleperson_second_land_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Mobile No. 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleSecCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_mob_one"
                                                    value={it_supplier_mob_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_saleperson_second_mob_one"
                                                    value={it_supplier_saleperson_second_mob_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Mobile No. 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleSecCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="enter additional mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_mob_two"
                                                    value={it_supplier_mob_two}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="enter additional mobile number"
                                                    type="number"
                                                    size="sm"
                                                    name="it_supplier_saleperson_second_mob_two"
                                                    value={it_supplier_saleperson_second_mob_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', px: 1.5, pt: 1 }}>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Email Id 1<span style={{ color: '#74112F' }} >*</span>
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleSecCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_email_one"
                                                    value={it_supplier_email_one}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_saleperson_second_email_one"
                                                    value={it_supplier_saleperson_second_email_one}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1, px: .5 }}>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, color: '#145DA0', pl: .5 }}>
                                            Email Id 2
                                        </Box>
                                        <Box sx={{ fontWeight: 600, fontSize: 12, }}>
                                            {saleSecCheck === true ?
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_email_two"
                                                    value={it_supplier_email_two}
                                                    onchange={UpdateSupplierDetl}
                                                    disabled={true}
                                                ></TextFieldCustom> :
                                                <TextFieldCustom
                                                    placeholder="example@gmail.com"
                                                    type="text"
                                                    size="sm"
                                                    name="it_supplier_saleperson_second_email_two"
                                                    value={it_supplier_saleperson_second_email_two}
                                                    onchange={UpdateSupplierDetl}
                                                ></TextFieldCustom>}
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                </Box >
            </Paper >
            <Paper sx={{ borderRadius: 0, maxHeight: 600 }}>
                <Box sx={{ flex: 1, display: 'flex', pl: 1 }}>
                    <CustomeToolTip title="Save" placement="left" >
                        <Box>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true"
                                onClick={submitSupplierDetails}
                            >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                    {/* Refresh Button */}
                    <CustomeToolTip title="Refresh" placement="left" >
                        <Box sx={{ pl: .5 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true"
                                onClick={reset}
                            >
                                <RefreshIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                    {/* Close button */}
                    <CustomeToolTip title="Close" placement="left" >
                        <Box sx={{ pl: .5 }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true"
                                onClick={backtoHome}
                            >
                                <CloseIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip>
                </Box>
                <Box sx={{ flex: 1, mt: .6 }}>
                    <SupplierDetailTable rowSelect={rowSelect} count={count} />
                </Box>
            </Paper>
        </Box >
    )
}

export default memo(SupplierDetails)