

import React, { memo, useState, useCallback, useEffect } from 'react'
import {
    Box,
    Card,
    Typography,
    Input,
    Grid,
    Divider,
} from '@mui/joy'
import EngineeringIcon from '@mui/icons-material/Engineering'
import AddIcon from "@mui/icons-material/Add"

const InstallationLabourCharge = () => {

    // const [labourData, setLabourData] = useState({
    //     description: '',
    //     specification: '',
    //     unitRate: '',
    //     quantity: '',
    //     rateUnit: '',
    //     totalAmount: ''
    // })

    const emptyLabour = {
        description: '',
        specification: '',
        unitRate: '',
        quantity: '',
        rateUnit: '',
        totalAmount: ''
    }

    const [labourData, setLabourData] = useState(emptyLabour)
    // const [labourList, setLabourList] = useState([])

    // console.log("labourList:", labourList);

    useEffect(() => {
        const total =
            Number(labourData.unitRate || 0) *
            Number(labourData.quantity || 0)

        setLabourData(prev => ({
            ...prev,
            totalAmount: total.toFixed(2)
        }))
    }, [labourData.unitRate, labourData.quantity])

    const handleAdd = useCallback(() => {
        if (!labourData.description || !labourData.unitRate) return

        // setLabourList(prev => [...prev, labourData])
        setLabourData(emptyLabour) // reset form
    }, [labourData])




    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setLabourData(prev => ({
            ...prev,
            [name]: value
        }))
    }, [])

    useEffect(() => {
        const total =
            Number(labourData.unitRate || 0) *
            Number(labourData.quantity || 0)

        setLabourData(prev => ({
            ...prev,
            totalAmount: total.toFixed(2)
        }))
    }, [labourData.unitRate, labourData.quantity])


    // const handleAdd = useCallback(() => {
    //     // setMaterialData(emptyMaterial)
    //     // setEditIndex(null)
    //     // setOpenModal(true)
    // }, [])


    return (
        <Card
            sx={{
                p: 3,
                borderRadius: '2xl',
                boxShadow: 'xl',
                background:
                    'linear-gradient(135deg, #fdfbff, #eef2ff)',
                backdropFilter: 'blur(8px)',
                animation: 'fadeUp 0.4s ease',
                '@keyframes fadeUp': {
                    from: { opacity: 0, transform: 'translateY(10px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                }
            }}
        >

            <Box display="flex" justifyContent="space-between" mb={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <EngineeringIcon sx={{ color: '#4f46e5' }} />
                    <Typography level="h4" fontWeight={800}>
                        Installation Labour Charges
                    </Typography>

                </Box>

                <Box
                    onClick={handleAdd}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: "999px",
                        cursor: "pointer",
                        color: "#fff",
                        background: "linear-gradient(135deg,#6A5ACD,#8A7CFB)",
                    }}
                >
                    <AddIcon fontSize="small" />
                    Add Labour
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
                {/* Description */}
                <Grid xs={12}>
                    <Typography level="body-sm" fontWeight={600}>
                        Description
                    </Typography>
                    <Input
                        name="description"
                        value={labourData.description}
                        onChange={handleChange}
                        placeholder="Enter labour work description"
                    />
                </Grid>

                {/* Specification */}
                <Grid xs={12}>
                    <Typography level="body-sm" fontWeight={600}>
                        Specification
                    </Typography>
                    <Input
                        name="specification"
                        value={labourData.specification}
                        onChange={handleChange}
                        placeholder="Specification / Scope of work"
                    />
                </Grid>

                {/* Unit Rate */}
                <Grid xs={12} sm={6} md={3}>
                    <Typography level="body-sm" fontWeight={600}>
                        Unit Rate (₹)
                    </Typography>
                    <Input
                        type="number"
                        name="unitRate"
                        value={labourData.unitRate}
                        onChange={handleChange}
                        placeholder="₹ 0.00"
                    />
                </Grid>

                {/* Quantity */}
                <Grid xs={12} sm={6} md={3}>
                    <Typography level="body-sm" fontWeight={600}>
                        Quantity
                    </Typography>
                    <Input
                        type="number"
                        name="quantity"
                        value={labourData.quantity}
                        onChange={handleChange}
                        placeholder="0"
                    />
                </Grid>

                {/* Rate Unit */}
                <Grid xs={12} sm={6} md={3}>
                    <Typography level="body-sm" fontWeight={600}>
                        Rate Unit
                    </Typography>
                    <Input
                        name="rateUnit"
                        value={labourData.rateUnit}
                        onChange={handleChange}
                        placeholder="Per Day / Per Job"
                    />
                </Grid>

                {/* Total Amount */}
                <Grid xs={12} sm={6} md={3}>
                    <Typography level="body-sm" fontWeight={600}>
                        Total Amount (₹)
                    </Typography>
                    <Input
                        readOnly
                        value={labourData.totalAmount}
                        sx={{
                            bgcolor: '#eef2ff',
                            fontWeight: 800,
                            color: '#4338ca'
                        }}
                    />
                </Grid>
            </Grid>

            {/* Summary Footer */}
            <Box
                sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 'lg',
                    background: 'linear-gradient(90deg,#e0e7ff,#f5f3ff)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography fontWeight={700}>
                    Calculated Labour Cost
                </Typography>
                <Typography
                    level="h4"
                    fontWeight={900}
                    sx={{ color: '#4f46e5' }}
                >
                    ₹ {labourData.totalAmount || '0.00'}
                </Typography>
            </Box>
        </Card>
    )
}

export default memo(InstallationLabourCharge)


// import React, { memo, useState, useCallback, useEffect } from 'react'
// import {
//     Box,
//     Card,
//     Typography,
//     Input,
//     Grid,
//     Divider,
// } from '@mui/joy'
// import EngineeringIcon from '@mui/icons-material/Engineering'

// const InstallationLabourCharge = () => {

//     const [labourData, setLabourData] = useState({
//         description: '',
//         specification: '',
//         unitRate: '',
//         quantity: '',
//         rateUnit: '',
//         totalAmount: ''
//     })

//     const handleChange = useCallback((e) => {
//         const { name, value } = e.target
//         setLabourData(prev => ({
//             ...prev,
//             [name]: value
//         }))
//     }, [])

//     useEffect(() => {
//         const total =
//             Number(labourData.unitRate || 0) *
//             Number(labourData.quantity || 0)

//         setLabourData(prev => ({
//             ...prev,
//             totalAmount: total.toFixed(2)
//         }))
//     }, [labourData.unitRate, labourData.quantity])


//     return (
//         <Card
//             sx={{
//                 p: 3,
//                 borderRadius: '2xl',
//                 boxShadow: 'xl',
//                 background:
//                     'linear-gradient(135deg, #fdfbff, #eef2ff)',
//                 backdropFilter: 'blur(8px)',
//                 animation: 'fadeUp 0.4s ease',
//                 '@keyframes fadeUp': {
//                     from: { opacity: 0, transform: 'translateY(10px)' },
//                     to: { opacity: 1, transform: 'translateY(0)' }
//                 }
//             }}
//         >
//             {/* Header */}
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                 <EngineeringIcon sx={{ color: '#4f46e5' }} />
//                 <Typography level="h4" fontWeight={800}>
//                     Installation Labour Charges
//                 </Typography>

//             </Box>

//             <Divider sx={{ mb: 3 }} />

//             <Grid container spacing={2}>
//                 {/* Description */}
//                 <Grid xs={12}>
//                     <Typography level="body-sm" fontWeight={600}>
//                         Description
//                     </Typography>
//                     <Input
//                         name="description"
//                         value={labourData.description}
//                         onChange={handleChange}
//                         placeholder="Enter labour work description"
//                     />
//                 </Grid>

//                 {/* Specification */}
//                 <Grid xs={12}>
//                     <Typography level="body-sm" fontWeight={600}>
//                         Specification
//                     </Typography>
//                     <Input
//                         name="specification"
//                         value={labourData.specification}
//                         onChange={handleChange}
//                         placeholder="Specification / Scope of work"
//                     />
//                 </Grid>

//                 {/* Unit Rate */}
//                 <Grid xs={12} sm={6} md={3}>
//                     <Typography level="body-sm" fontWeight={600}>
//                         Unit Rate (₹)
//                     </Typography>
//                     <Input
//                         type="number"
//                         name="unitRate"
//                         value={labourData.unitRate}
//                         onChange={handleChange}
//                         placeholder="₹ 0.00"
//                     />
//                 </Grid>

//                 {/* Quantity */}
//                 <Grid xs={12} sm={6} md={3}>
//                     <Typography level="body-sm" fontWeight={600}>
//                         Quantity
//                     </Typography>
//                     <Input
//                         type="number"
//                         name="quantity"
//                         value={labourData.quantity}
//                         onChange={handleChange}
//                         placeholder="0"
//                     />
//                 </Grid>

//                 {/* Rate Unit */}
//                 <Grid xs={12} sm={6} md={3}>
//                     <Typography level="body-sm" fontWeight={600}>
//                         Rate Unit
//                     </Typography>
//                     <Input
//                         name="rateUnit"
//                         value={labourData.rateUnit}
//                         onChange={handleChange}
//                         placeholder="Per Day / Per Job"
//                     />
//                 </Grid>

//                 {/* Total Amount */}
//                 <Grid xs={12} sm={6} md={3}>
//                     <Typography level="body-sm" fontWeight={600}>
//                         Total Amount (₹)
//                     </Typography>
//                     <Input
//                         readOnly
//                         value={labourData.totalAmount}
//                         sx={{
//                             bgcolor: '#eef2ff',
//                             fontWeight: 800,
//                             color: '#4338ca'
//                         }}
//                     />
//                 </Grid>
//             </Grid>

//             {/* Summary Footer */}
//             <Box
//                 sx={{
//                     mt: 3,
//                     p: 2,
//                     borderRadius: 'lg',
//                     background: 'linear-gradient(90deg,#e0e7ff,#f5f3ff)',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center'
//                 }}
//             >
//                 <Typography fontWeight={700}>
//                     Calculated Labour Cost
//                 </Typography>
//                 <Typography
//                     level="h4"
//                     fontWeight={900}
//                     sx={{ color: '#4f46e5' }}
//                 >
//                     ₹ {labourData.totalAmount || '0.00'}
//                 </Typography>
//             </Box>
//         </Card>
//     )
// }

// export default memo(InstallationLabourCharge)
