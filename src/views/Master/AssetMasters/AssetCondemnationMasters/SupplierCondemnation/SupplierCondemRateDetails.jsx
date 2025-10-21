import React, { memo, useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { Box, CssVarsProvider, Input, Table } from '@mui/joy'
import CategorySelect from 'src/views/AssetManagment/CondemnationSelectCode/CategorySelect'
import QualitySelect from 'src/views/AssetManagment/CondemnationSelectCode/QualitySelect'
import QuantityUnitSelect from 'src/views/AssetManagment/CondemnationSelectCode/QuantityUnitSelect'
import SupplierCondemRateTable from './SupplierCondemRateTable'
import SupplierSelectcondemn from 'src/views/AssetManagment/CondemnationSelectCode/SupplierSelectcondemn'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'


const SupplierCondemRateDetails = () => {

    const history = useNavigate()
    const [supplier, setSupplier] = useState(0)
    const [category, setcategory] = useState(0)
    const [quality, setquality] = useState(0)
    const [unitofQuantity, setUnitofQuantity] = useState(0)
    const [supplierRateList, setSupplierRateList] = useState([]);
    const [supplierName, setsupplierName] = useState('')
    const [categoryName, setcategoryName] = useState('')
    const [qualityName, setqualityName] = useState('')
    const [quantityName, setquantityName] = useState('')
    const [condemRateSlno, setCondemRateSlno] = useState('')


    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const queryClient = useQueryClient()
    const [supplierRate, setsupplierRate] = useState({
        supplier_status: true,
        unit: '',
        price: ''
    })
    const { supplier_status, unit, price } = supplierRate

    const updatesupplierRate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setsupplierRate({ ...supplierRate, [e.target.name]: value })
        },
        [supplierRate],
    )

    const patchdata = supplierRateList
        ?.filter(val => val.condemRateSlno || val.condemn_rate_slno)
        .map(val => ({
            supplier_slno: val.supplier || val.supplier_slno,
            category_slno: val.category || val.category_slno,
            quality_slno: val.quality || val.quality_slno,
            unit: val.unit,
            quantity_unit_slno: val.unitofQuantity || val.quantity_unit_slno,
            price: val.price,
            supplier_status: val.supplier_status || val.status === true ? 1 : 0,
            edit_user: id,
            condemn_rate_slno: val.condemRateSlno || val.condemn_rate_slno,
        }));

    const postdata = supplierRateList
        ?.filter(val => !val.condemRateSlno && !val.condemn_rate_slno)
        .map(val => ({
            supplier_slno: val.supplier || val.supplier_slno,
            category_slno: val.category || val.category_slno,
            quality_slno: val.quality || val.quality_slno,
            unit: val.unit,
            quantity_unit_slno: val.unitofQuantity || val.quantity_unit_slno,
            price: val.price,
            supplier_status: val.status === true || val.status === 1 ? 1 : 0,
            create_user: id
        }));

    const sumbitsupplierRate = useCallback((e) => {
        e.preventDefault();
        const InsertsupplierRate = async (data) => {
            const result = await axioslogin.post('/condemMasters/SupplierRateInsert', data);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message);
                queryClient.invalidateQueries('getSupplierRatecomparison');
                refreshWindow();
            } else {
                infoNotify(message);
            }
        };
        const supplierRateUpdate = async (data) => {
            const result = await axioslogin.patch('/condemMasters/supplierRateUpdate', data);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message);
                queryClient.invalidateQueries('getSupplierRatecomparison');
                refreshWindow();
            } else {
                infoNotify(message);
            }
        };

        if (postdata.length > 0) {
            InsertsupplierRate(postdata);
        }
        if (patchdata.length > 0) {
            supplierRateUpdate(patchdata);
        }
    }, [postdata, patchdata, queryClient]);


    const AddSupplierRate = useCallback(() => {



        if (!supplierName || !categoryName || !quantityName || !price) {


            return;
        }
        const newItem = {
            supplier,
            category,
            quality,
            unit,
            unitofQuantity,
            price,
            status: 1,
            supplierName,
            categoryName,
            qualityName,
            quantityName,
            condemRateSlno
        };
        setSupplierRateList(prev => [...prev, newItem]);
        refreshRow()
    }, [supplier, category, quality, unit, unitofQuantity, price, supplierName, categoryName, qualityName, quantityName, condemRateSlno]);

    const editRow = useCallback((index) => {
        const val = supplierRateList[index];
        const { condemn_rate_slno, supplier, category, quality, unitofQuantity, unit, price, status, quality_slno, quantity_unit_slno, supplier_slno, category_slno,
            supplier_name, category_name, quality_name, supplier_status, condem_quantity_name } = val;
        setSupplier(supplier || supplier_slno);
        setcategory(category || category_slno);
        setquality(quality || quality_slno);
        setUnitofQuantity(unitofQuantity || quantity_unit_slno);
        setcategoryName(category_name || '');
        setsupplierName(supplier_name || '');
        setqualityName(quality_name || '');
        setquantityName(condem_quantity_name || '');
        setsupplierRate({
            unit: unit,
            price: price,
            supplier_status: status === 1 ? true : false || supplier_status === 1 ? true : false
        });
        setCondemRateSlno(condemn_rate_slno)
        setSupplierRateList(prev => prev.filter((_, i) => i !== index));
    }, [supplierRateList]);


    const deleteRow = useCallback((indexToDelete) => {
        setSupplierRateList(prev => prev.filter((_, index) => index !== indexToDelete));
    }, []);

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])


    const refreshRow = useCallback(() => {
        setSupplier(0);
        setcategory(0);
        setquality(0);
        setUnitofQuantity(0);
        setCondemRateSlno('')
        setsupplierRate({
            unit: '',
            price: '',
            supplier_status: true
        });
    }, [setsupplierRate])

    const refreshWindow = useCallback(() => {
        setSupplier(0);
        setcategory(0);
        setquality(0);
        setUnitofQuantity(0);
        setsupplierRate({
            condemn_rate_slno: '',
            unit: '',
            price: '',
            supplier_status: true
        });
        setSupplierRateList([])
    }, [setsupplierRate])


    return (
        <Box>
            <CardMaster
                title="Asset Condemnation Supplier Rate"
                submit={sumbitsupplierRate}
                close={backtoSetting}
                refresh={refreshWindow}
            >
                <Box sx={{ flex: 1, display: 'flex' }}>
                    <CssVarsProvider>
                        <Box sx={{ flex: 1, display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                            <Box sx={{ width: 330 }}>
                                <TextComponent text={"Supplier"} sx={{ pl: .5, fontSize: 14 }} />
                                <SupplierSelectcondemn value={supplier} setValue={setSupplier} setsupplierName={setsupplierName} />
                            </Box>
                            <Box sx={{ width: 'auto' }}>
                                <TextComponent text={"Category"} sx={{ pl: .5, fontSize: 14 }} />
                                <CategorySelect value={category} setValue={setcategory} setcategoryName={setcategoryName} />
                            </Box>
                            <Box sx={{ width: 'auto' }}>
                                <TextComponent text={"Quality"} sx={{ pl: .5, fontSize: 14 }} />
                                <QualitySelect value={quality} setValue={setquality} setqualityName={setqualityName} />
                            </Box>
                            <Box sx={{ width: 130 }}>
                                <TextComponent text={"Unit"} sx={{ pl: .5, fontSize: 14 }} />
                                <Input type='text' value={unit} name='unit' onChange={updatesupplierRate} />
                            </Box>
                            <Box sx={{ width: 150 }}>
                                <TextComponent text={"U.O.M"} sx={{ pl: .5, fontSize: 14 }} />
                                <QuantityUnitSelect value={unitofQuantity} setValue={setUnitofQuantity} setquantityName={setquantityName} />
                            </Box>
                            <Box sx={{ width: 140 }}>
                                <TextComponent text={"price"} sx={{ pl: .5, fontSize: 14 }} />
                                <Input startDecorator="Rs." type='number' value={price} name='price' onChange={updatesupplierRate} />
                            </Box>
                            <Box sx={{ pt: 3.8, width: 80 }}>
                                <CusCheckBox
                                    label={"Status"}
                                    color="primary"
                                    size="md"
                                    name="supplier_status"
                                    value={supplier_status}
                                    checked={supplier_status}
                                    onCheked={updatesupplierRate}
                                ></CusCheckBox>
                            </Box>
                            <Box sx={{ width: 50, pt: 2.7 }}>
                                <CusIconButton variant="outlined" color="primary" clickable="true" >
                                    <AddCircleOutlineIcon onClick={AddSupplierRate} />
                                </CusIconButton>
                            </Box>
                        </Box>
                    </CssVarsProvider>
                </Box>
                {supplierRateList?.length > 0 ?
                    <Box sx={{ flex: 1, mt: 1 }}>
                        <CssVarsProvider>
                            <Table size='sm' borderAxis='both' style={{ p: 1 }}>
                                <thead style={{ backgroundColor: '#f0f0f0' }}>
                                    <tr>
                                        <th style={{ width: 40, textAlign: 'center', fontSize: 14, fontWeight: 100 }}>#</th>
                                        <th style={{ width: 50, textAlign: 'center', fontSize: 14, fontWeight: 100 }}>Edit</th>
                                        <th style={{ width: 'auto', fontSize: 14, fontWeight: 100, textAlign: 'center' }}>Supplier</th>
                                        <th style={{ width: 'auto', fontSize: 14, fontWeight: 100, textAlign: 'center' }}>Category </th>
                                        <th style={{ width: 'auto', fontSize: 14, fontWeight: 100, textAlign: 'center' }}>Quality</th>
                                        <th style={{ width: 80, fontSize: 14, fontWeight: 100, textAlign: 'center' }}>Unit</th>
                                        <th style={{ width: 100, fontSize: 14, fontWeight: 100, textAlign: 'center' }}>U.O.M</th>
                                        <th style={{ width: 100, fontSize: 14, fontWeight: 100, textAlign: 'center' }}>Rate</th>
                                        <th style={{ width: 60, textAlign: 'center', fontSize: 14, fontWeight: 100 }}>Remove</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {supplierRateList?.map((val, index) => (
                                        <tr key={index}>
                                            <td style={{ width: 60, textAlign: 'center' }} >{index + 1}</td>
                                            <td style={{ width: 60, textAlign: 'center' }} >
                                                <EditOutlinedIcon
                                                    sx={{ color: '#196eb6', cursor: 'pointer' }}
                                                    onClick={() => editRow(index)}
                                                />

                                            </td>
                                            <td style={{ width: 'auto', textAlign: 'center' }}>{val.supplierName || val.supplier_name}</td>
                                            <td style={{ width: 'auto', textAlign: 'center' }}>{val.categoryName || val.category_name}</td>
                                            <td style={{ textAlign: 'center' }}>{val.qualityName || val.quality_name}</td>
                                            <td style={{ textAlign: 'center' }}>{val.unit}</td>
                                            <td style={{ textAlign: 'center' }}>{val.quantityName || val.condem_quantity_name}</td>
                                            <td style={{ textAlign: 'center' }}>{val.price}</td>
                                            <td style={{ width: 60, textAlign: 'center' }} >
                                                <DeleteOutlineIcon
                                                    sx={{ color: '#196eb6', cursor: 'pointer' }}
                                                    onClick={() => deleteRow(index)}
                                                />

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Box>
                    :
                    null}
            </CardMaster>

            <Box sx={{ bgcolor: 'white', px: .5, pt: 1, height: '65vh', overflow: 'auto' }}>
                <SupplierCondemRateTable setSupplierRateList={setSupplierRateList} />
            </Box>

        </Box >
    )
}

export default memo(SupplierCondemRateDetails)
