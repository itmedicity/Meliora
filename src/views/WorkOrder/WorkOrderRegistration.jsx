import { Box, IconButton, Textarea, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import CustomPaperTitle from '../Components/CustomPaperTitle'
import CustomInputDateCmp from '../CentralRequestManagement/ComonComponent/Components/CustomInputDateCmp'
import ContractTypeSelect from './ContractTypeSelect'
import TextFieldCustom from '../Components/TextFieldCustom'
import CrfSupplierSelect from '../CommonSelectCode/CrfSupplierSelect'
import AssetUOMSelect from '../CommonSelectCode/AssetUOMSelect'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import ClearIcon from '@mui/icons-material/Clear'
import WorklocationSelect from './WorklocationSelect'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'

const WorkOrderRegistration = () => {
    const [type, setContract] = useState(0)
    const [supCode, setSupCode] = useState(0)
    const [WorkLocation, setWorkLocation] = useState(0)

    const [OrderRegister, setOrderRegister] = useState({
        location: '',
        item_qty: 0,
        item_desc: '',
        item_brand: '',
        item_spec: '',
        unitprice: 0,
        approx_cost: 0,
        actual_require: '',
        needed: '',
        levelOne: 0,
        levelTwo: 0,
        deptType: 0,
        emergency: false,
        remarks: '',
        reqDetalSlno: 0,
        reqSlno: 0,
        imageshowFlag: 0,
        imageshow: false

    })

    const {
        location,
        item_qty,
        item_desc,
        unitprice,
        approx_cost,
        // actual_require,
        // needed,
        // levelOne,
        // levelTwo,
        // deptType,
        // emergency,
        // remarks,
        // reqDetalSlno,
        // startdate,
        // reqSlno,
        // imageshowFlag,
        // imageshow,
        item_brand,
        item_spec

    } = OrderRegister
    const updateOnchangeState = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setOrderRegister({ ...OrderRegister, [e.target.name]: value })
        },
        [OrderRegister]
    )
    return (
        <Paper variant="outlined" square sx={{ height: '100%', bgcolor: 'white', p: 3 }}>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                <Box sx={{ width: '50%' }}>
                    {/* Work Order */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ width: '20%' }}>
                            <CustomPaperTitle heading="Work Order" />
                        </Box>
                        <Box sx={{ pl: 2, width: '70%' }}>
                            <TextFieldCustom
                                placeholder="Work Order"
                                type="text"
                                size="sm"
                                name="workOrder"
                                value={location}
                                onchange={updateOnchangeState}
                            />
                        </Box>
                    </Box>

                    {/* Work Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ width: '20%' }}>
                            <CustomPaperTitle heading="Work Name" />
                        </Box>
                        <Box sx={{ pl: 2, width: '70%' }}>
                            <TextFieldCustom
                                placeholder="Work Name"
                                type="text"
                                size="sm"
                                name="workName"
                                value={location}
                                onchange={updateOnchangeState}
                            />
                        </Box>
                    </Box>

                    {/* Contract Type */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ width: '20%' }}>
                            <CustomPaperTitle heading="Contract Type" />
                        </Box>
                        <Box sx={{ pl: 2, width: '70%' }}>
                            <ContractTypeSelect value={type} setValue={setContract} />
                        </Box>
                    </Box>

                    {/* Supplier */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ width: '20%' }}>
                            <CustomPaperTitle heading="Supplier" />
                        </Box>
                        <Box sx={{ pl: 2, width: '70%' }}>
                            <CrfSupplierSelect supCode={supCode} setSupCode={setSupCode} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '50%', display: 'flex', }}>
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ width: '50%' }}>
                                <CustomPaperTitle heading="Contractor Address" />
                            </Box>
                            <Box sx={{ pl: 2, width: '50%' }}>
                                <Typography variant="subtitle2">Contractor Address</Typography>

                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ width: '50%' }}>
                                <CustomPaperTitle heading="Mobile Number" />
                            </Box>
                            <Box sx={{ pl: 2, width: '50%' }}>
                                <Typography variant="subtitle2">Mobile Number</Typography>

                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ width: '50%' }}>
                                <CustomPaperTitle heading="GST Number" />
                            </Box>
                            <Box sx={{ pl: 2, width: '50%' }}>
                                <Typography variant="subtitle2">GST Number</Typography>

                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ width: '50%' }}>
                                <CustomPaperTitle heading="Email" />
                            </Box>
                            <Box sx={{ pl: 2, width: '50%' }}>
                                <Typography variant="subtitle2">Email</Typography>

                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ width: '50%' }}>
                                <CustomPaperTitle heading="Gross Amount" />
                            </Box>
                            <Box sx={{ pl: 2, width: '50%' }}>
                                <Typography variant="subtitle2">Gross Amount</Typography>

                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ width: '50%' }}>
                                <CustomPaperTitle heading="Gst Amount" />
                            </Box>
                            <Box sx={{ pl: 2, width: '50%' }}>
                                <Typography variant="subtitle2">Gst Amount</Typography>

                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ width: '50%' }}>
                                <CustomPaperTitle heading="GST Number" />
                            </Box>
                            <Box sx={{ pl: 2, width: '50%' }}>
                                <Typography variant="subtitle2">GST Number</Typography>

                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ width: '50%' }}>
                                <CustomPaperTitle heading="Net Amount" />
                            </Box>
                            <Box sx={{ pl: 2, width: '50%' }}>
                                <Typography variant="subtitle2">Net Amount</Typography>

                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <Box sx={{ mx: 0.5, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', pt: 0.3 }}>
                    <Box sx={{ flex: 2, pl: 0.5 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading=" Description" mandtry={1} />
                        </Box>
                        <Box sx={{}}>
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                type="text"
                                autoComplete={'off'}
                                name={'item_desc'}
                                value={item_desc}
                                handleChange={updateOnchangeState}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.5, pr: 0.5, pl: 0.3 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading="Unit" />
                        </Box>
                        <Box sx={{ pt: 0.2 }}>
                            <AssetUOMSelect />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1.5, pl: 0.3 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading="Unit Price" />
                        </Box>
                        <Box sx={{ pt: 0.3 }}>
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                autoComplete={'off'}
                                type="text"
                                name={'item_brand'}
                                value={item_brand}
                                handleChange={updateOnchangeState}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.5, pl: 0.3 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading="Quantity" mandtry={1} />
                        </Box>
                        <Box sx={{}}>
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                type="number"
                                autoComplete={'off'}
                                name={'item_qty'}
                                value={item_qty}
                            // handleChange={onchangeQty}
                            />
                        </Box>
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', pt: 0.3, pb: 0.5 }}>
                    <Box sx={{ flex: 0.5, pl: 0.5 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading="Amount" />
                        </Box>
                        <Box sx={{ pt: 0.3 }}>
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                type="text"
                                autoComplete={'off'}
                                name={'item_spec'}
                                value={item_spec}
                                handleChange={updateOnchangeState}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.7, pl: 0.3 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading="Discount" />
                        </Box>
                        <Box sx={{ pt: 0.3 }}>
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                type="number"
                                autoComplete={'off'}
                                name={'unitprice'}
                                value={unitprice}
                            // handleChange={updateUnitPrice}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.5, pl: 0.3 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading="Tax" />
                        </Box>
                        <Box sx={{ pt: 0.3 }}>
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                type="number"
                                name={'approx_cost'}
                                value={approx_cost}
                                disabled={true}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.5, pl: 0.3 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading="Tax Amount" mandtry={1} />
                        </Box>
                        <Box sx={{}}>
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                type="number"
                                autoComplete={'off'}
                                name={'item_qty'}
                                value={item_qty}
                            // handleChange={onchangeQty}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.5, pl: 0.3 }}>
                        <Box sx={{}}>
                            <CustomPaperTitle heading="Total" mandtry={1} />
                        </Box>
                        <Box sx={{}}>
                            <CustomInputDateCmp
                                className={{ width: '100%', height: 35, bgcolor: 'white' }}
                                size={'sm'}
                                type="number"
                                autoComplete={'off'}
                                name={'item_qty'}
                                value={item_qty}
                            // handleChange={onchangeQty}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flex: 0.2, display: 'flex' }}>
                        <Box sx={{ pt: 3.3, pl: 1, bgcolor: 'white' }}>
                            <Tooltip title="Add Item" placement="bottom" sx={{ color: '#0074B7', bgcolor: '#e3f2fd' }}>
                                <AddCircleSharpIcon
                                    sx={{ color: '#0074B7', height: 28, width: 28, cursor: 'pointer' }}
                                //   onClick={AddItem}
                                />
                            </Tooltip>
                        </Box>
                        <Box sx={{ pt: 3.3, pl: 0.5 }}>
                            <Tooltip title="Clear All" placement="bottom" sx={{ bgcolor: '#ffebee', color: '#d50000' }}>
                                <ClearIcon
                                    sx={{
                                        height: 25,
                                        width: 25,
                                        color: '#ef9a9a',
                                        cursor: 'pointer',
                                        ':hover': {
                                            color: '#e57373'
                                        }
                                    }}
                                //   onClick={clearData}
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', pt: 0.3, pb: 0.5 }}>
                <Box sx={{ flex: 0.5, pl: 0.5 }}>
                    <Box sx={{}}>
                        <CustomPaperTitle heading="Work Location" />
                    </Box>
                    <Box sx={{ pt: 0.3 }}>
                        <WorklocationSelect value={WorkLocation} setValue={setWorkLocation} />

                    </Box>
                </Box>
                <Box sx={{ flex: 0.5, pl: 0.5 }}>
                    <Box sx={{}}>
                        <CustomPaperTitle heading="Retention" />
                    </Box>
                    <Box sx={{ pt: 0.3 }}>
                        <CustomInputDateCmp
                            className={{ width: '100%', height: 35, bgcolor: 'white' }}
                            size={'sm'}
                            type="number"
                            autoComplete={'off'}
                            name={'item_qty'}
                            value={item_qty}
                        // handleChange={onchangeQty}
                        />
                    </Box>
                </Box>

                <Box sx={{ flex: 0.5, pl: 0.5 }}>
                    <Box sx={{}}>
                        <CustomPaperTitle heading="Retention Amount" />
                    </Box>
                    <Box sx={{ pt: 0.3 }}>
                        <CustomInputDateCmp
                            className={{ width: '100%', height: 35, bgcolor: 'white' }}
                            size={'sm'}
                            type="number"
                            autoComplete={'off'}
                            name={'item_qty'}
                            value={item_qty}
                        // handleChange={onchangeQty}
                        />
                    </Box>
                </Box>

                <Box sx={{ flex: 0.5, pl: 0.5 }}>
                    <Box sx={{}}>
                        <CustomPaperTitle heading="Retention Period" />
                    </Box>
                    <Box sx={{ pt: 0.3 }}>
                        <CustomInputDateCmp
                            className={{ width: '100%', height: 35, bgcolor: 'white' }}
                            size={'sm'}
                            type="number"
                            autoComplete={'off'}
                            name={'item_qty'}
                            value={item_qty}
                        // handleChange={onchangeQty}
                        />
                    </Box>
                </Box>


                <Box sx={{ flex: 0.5, pl: 0.5 }}>
                    <Box sx={{}}>
                        <CustomPaperTitle heading="Remark" />
                    </Box>
                    <Box sx={{ pt: 0.3 }}>
                        <CustomInputDateCmp
                            className={{ width: '100%', height: 35, bgcolor: 'white' }}
                            size={'sm'}
                            type="text"
                            autoComplete={'off'}
                            name={'item_desc'}
                            value={item_desc}
                            handleChange={updateOnchangeState}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ flex: 1, pr: 0.5 }}>
                <Box sx={{ pt: 0.6 }}>
                    <CustomPaperTitle heading="Terms & Conditions" />
                </Box>
                <Box sx={{ pt: 0.5 }}>
                    <Textarea
                        required
                        type="text"
                        size="sm"
                        sx={{ bgcolor: 'white' }}
                        minRows={3}
                        maxRows={3}
                        style={{ width: '100%' }}
                        placeholder="type here ..."
                        name="actual_require"
                    //   value={actual_require}
                    //   onChange={updateOnchangeState}
                    />
                </Box>
            </Box>

            <Box sx={{ p: 0.5 }}>
                <label htmlFor="file-input">
                    <Tooltip title="Upload File" placement="bottom" sx={{ bgcolor: '#e8eaf6', color: '#283593' }}>
                        <IconButton
                            aria-label="upload file"
                            variant="soft"
                            component="span"
                            sx={{
                                bgcolor: 'white',
                                '&:hover': {
                                    bgcolor: 'white'
                                }
                            }}
                        >
                            <CloudUploadTwoToneIcon
                                fontSize="small"
                                sx={{
                                    width: 35,
                                    height: 25,
                                    color: '#3949ab',
                                    '&:hover': {
                                        color: '#5c6bc0'
                                    }
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: '#3949ab',
                                    '&:hover': {
                                        color: '#5c6bc0'
                                    }
                                }}
                            >
                                Maximum Size 25MB
                            </Typography>
                        </IconButton>
                    </Tooltip>
                </label>
                <input
                    multiple
                    id="file-input"
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf"
                    style={{ display: 'none' }}
                // onChange={uploadFile}
                />
            </Box>
        </Paper>

    )
}

export default memo(WorkOrderRegistration)