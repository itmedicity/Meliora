//@Not using
// import React, { useState } from 'react'
// import {
//     Box,
//     Typography,
//     Card,
//     Stack,
//     Divider,
//     Input
// } from '@mui/joy'
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
// import SaveAsIcon from '@mui/icons-material/SaveAs';
// import ChooseDietItemName from 'src/views/CommonSelectCode/ChooseDietItemName'

// const DietDayFoodList = ({ schedule, timeId, onUpdateSchedule }) => {
//     const dayData = schedule?.[timeId]
//     const [editingItem, setEditingItem] = useState(null) // { day, index }

//     if (!dayData) return null

//     const handleChange = (day, index, key, value) => {
//         const updatedSchedule = { ...schedule } // top-level clone
//         const dayFoods = [...updatedSchedule[timeId][day]] // clone day array
//         dayFoods[index] = { ...dayFoods[index], [key]: value } // clone specific item
//         updatedSchedule[timeId][day] = dayFoods
//         onUpdateSchedule(updatedSchedule)
//     }

//     const handleRemove = (day, index) => {
//         const updatedSchedule = { ...schedule }
//         updatedSchedule[timeId][day] = updatedSchedule[timeId][day].filter((_, i) => i !== index)
//         if (updatedSchedule[timeId][day].length === 0) delete updatedSchedule[timeId][day]
//         if (Object.keys(updatedSchedule[timeId]).length === 0) delete updatedSchedule[timeId]
//         onUpdateSchedule(updatedSchedule)
//         setEditingItem(null)
//     }

//     return (
//         <Box sx={{ mt: 1, width: '100%', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//             {Object.entries(dayData).map(([day, foods]) => (
//                 <Card key={day} sx={{ p: 1, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', minWidth: '20%' }}>
//                     {/* HEADER */}
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Typography fontWeight={700}>{day}</Typography>
//                     </Box>

//                     <Divider />

//                     {/* FOOD LIST */}
//                     {foods?.map((f, i) => (
//                         <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             {editingItem?.day === day && editingItem?.index === i ? (
//                                 <>
//                                     <ChooseDietItemName
//                                         value={f.item_id}
//                                         setValue={val => handleChange(day, i, 'item_id', val)}
//                                         setName={name => handleChange(day, i, 'item_name', name)}
//                                     />
//                                     <Input
//                                         size="sm"
//                                         type="number"
//                                         value={f.qty}
//                                         onChange={e => handleChange(day, i, 'qty', e.target.value)}
//                                         sx={{ width: 80 }}
//                                     />
//                                     <SaveAsIcon
//                                         size="sm"
//                                         variant="soft"
//                                         color="success"
//                                         sx={{ cursor: 'pointer' }}
//                                         onClick={() => setEditingItem(null)}
//                                         fontSize="small"
//                                     />
//                                 </>
//                             ) : (
//                                 <>
//                                     <Typography sx={{ flex: 1, fontSize: 12, fontWeight: 600 }}>
//                                         • {f.item_name} – {f.qty}
//                                     </Typography>
//                                     <Stack direction="row" spacing={1}>
//                                         <EditOutlinedIcon
//                                             color="primary"
//                                             onClick={() => setEditingItem({ day, index: i })}
//                                             fontSize="small"
//                                             sx={{ cursor: 'pointer' }}
//                                         />
//                                         <DeleteOutlineOutlinedIcon
//                                             sx={{ color: '#ff6f6f', cursor: 'pointer' }}
//                                             onClick={() => handleRemove(day, i)}
//                                             fontSize="small"
//                                         />
//                                     </Stack>
//                                 </>
//                             )}
//                         </Box>
//                     ))}
//                 </Card>
//             ))}
//         </Box>
//     )
// }

// export default DietDayFoodList
