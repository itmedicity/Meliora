import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Box } from '@mui/joy'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import CloseIcon from '@mui/icons-material/Close'
import DietTextComponent from '../DietComponent/DietTextComponent'
import DietButton from '../DietComponent/DietButton'
import RecommendIcon from '@mui/icons-material/Recommend';
import { STATUS_BORDER_COLOR } from '../CommonData/Common'

const PatientCard = ({ pt, index, nsstation }) => {
    const [showMeals, setShowMeals] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Box
                sx={{
                    mt: 1,
                    p: 1.5,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    // default border
                    border: '1px solid #e9d7ff',
                    // right border override
                    borderRight: '4px solid',
                    borderRightColor: `var(--joy-palette-${STATUS_BORDER_COLOR[pt.patient_status_code]}-solidBg)`
                }}>
                {/* Header */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box sx={{ width: '40%' }}>
                        <DietTextComponent size={17} value={pt.ptc_ptname} />
                        <DietTextComponent
                            size={11}
                            value={`NS: ${nsstation.fb_ns_name.toUpperCase()} | PT: ${pt.pt_no}`}
                        />
                    </Box>

                    <Box sx={{ width: '20%' }}>
                        <DietTextComponent size={13} value={pt.diet_name} />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                        sx={{ gap: 1, width: '40%' }}>
                        {/* Toggle meals */}
                        <DietButton
                            onClick={() => setShowMeals(prev => !prev)}
                            icon={showMeals ? CloseIcon : RestaurantIcon}
                            name={showMeals ? "Hide " : 'View'}
                        />
                        <DietButton
                            // onClick={processDiet}
                            icon={RecommendIcon}
                            name="Confirm"
                        />
                    </Box>
                </Box>

                {/* Meal Details */}
                {showMeals && (
                    <Box sx={{
                        mt: 1,
                        p: 1,
                        bgcolor: '#fff',
                        boxShadow: 'md'
                    }}>
                        
                        {pt.orders.map((order) => (
                            <Box
                                key={order.order_id}
                                mb={1}
                                sx={{
                                    border: '1px solid #e9d7ff',
                                    p: 1,
                                    borderRadius: 3,
                                    bgcolor: '#faf7ff'
                                }}
                            >
                                {/* Order Header */}
                                <DietTextComponent
                                    size={16}
                                    weight={600}
                                    color="#5a2d82"
                                    value={`${order.meal} • #${order.order_id}`}
                                />

                                {/* Order Items */}
                                {order.items.map((item, index) => (
                                    <Box key={index} sx={{ ml: 1, mt: 0.5 }}>
                                        <DietTextComponent
                                            size={14}
                                            value={`• ${item.item_name} × ${item.qty}`}
                                        />
                                        <DietTextComponent
                                            size={12}
                                            color="#6b6b6b"
                                            value={`₹${item.price} | ${item.calories} cal | ${item.nutritious_value}`}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ))}

                    </Box>
                )}
            </Box>
        </motion.div>
    )
}

export default PatientCard
