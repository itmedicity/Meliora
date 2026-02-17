import React, { useState } from 'react'
import { Box, IconButton } from '@mui/joy'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import ChooseDietItemName from 'src/views/CommonSelectCode/ChooseDietItemName'
import ChooseDietMeasurementSelect from 'src/views/CommonSelectCode/ChooseDietMeasurementSelect'
import ChooseDIetType from 'src/views/CommonSelectCode/ChooseDIetType'
import DietButton from 'src/views/Diet/DietComponent/DietButton'
import { DAYS, DIET_ALT_COLORS } from 'src/views/Diet/CommonData/Common'
import { useDietTimes } from 'src/views/Diet/CommonData/UseQuery'



const DietWeekTable = ({ weekData = {}, onUpdateWeek = () => { } }) => {

    const [addDay, setAddDay] = useState(null)
    const [viewDay, setViewDay] = useState({})
    const [selectedTime, setSelectedTime] = useState({})
    const [editingIndex, setEditingIndex] = useState(null)
    const { data: DietTime = [] } = useDietTimes()

    const [tempFood, setTempFood] = useState({
        item_id: null,
        item_name: '',
        qty: '',
        measure: '',
        itemtype: ''
    })


    const [editFood, setEditFood] = useState(null)

    /* ADD FOOD (keep form open) */
    const handleAddFood = (day) => {
        const time = selectedTime[day]
        if (!time || !tempFood.item_id || !tempFood.qty) return

        onUpdateWeek({
            ...weekData,
            [day]: {
                ...(weekData[day] || {}),
                [time]: [...(weekData[day]?.[time] || []), tempFood]
            }
        })

        setTempFood({ item_id: null, item_name: '', qty: '', measure: '' })
    }

    /* CLOSE FORM */
    const handleClose = () => {
        setAddDay(null)
        setTempFood({ item_id: null, item_name: '', qty: '', measure: '' })
    }

    /* DELETE FOOD */
    const handleDelete = (day, time, index) => {
        const copy = weekData[day][time].filter((_, i) => i !== index)
        onUpdateWeek({
            ...weekData,
            [day]: { ...weekData[day], [time]: copy }
        })
    }

    return (
        <Box sx={{ border: '1px solid rgba(0,0,0,0.12)', borderRadius: 6, }}>
            <table width="100%" style={{ borderCollapse: 'collapse', }}>
                <thead>
                    <tr>
                        <th style={{
                            padding: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            background: '#f5f5f5',
                            textAlign: 'left',
                            width: '80%'
                        }}>Day</th>
                        <th style={th}>View</th>
                        <th style={th}>Add</th>
                    </tr>
                </thead>

                {DAYS?.map((day, inx) => {
                    console.log(inx);

                    return (
                        <tbody key={day} style={{ width: '100%' }}>

                            {/* DAY ROW */}
                            <tr style={tr}>
                                <td style={td}>{day}</td>

                                <td style={td}>

                                    <IconButton onClick={() =>
                                        setViewDay(p => ({ ...p, [day]: !p[day] }))
                                    }>
                                        {viewDay[day]
                                            ? <VisibilityOffOutlinedIcon sx={{ fontSize: 16 }} />
                                            : <VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
                                        }
                                    </IconButton>
                                </td>
                                <td style={td}>
                                    <IconButton onClick={() =>
                                        setAddDay(addDay === day ? null : day)
                                    }>
                                        {addDay === day
                                            ? <CloseIcon sx={{ fontSize: 16 }} />
                                            : <AddIcon sx={{ fontSize: 16 }} />
                                        }
                                    </IconButton>
                                </td>
                            </tr>

                            {/* ADD FORM */}
                            {addDay === day && (
                                <tr style={{ width: '100%' }}>
                                    <td colSpan={3} style={{ padding: 8 }}>
                                        <Box sx={{
                                            width: '100%',
                                            margin: 'auto',
                                            display: 'flex',
                                            gap: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <ChooseDIetType
                                                value={selectedTime[day] || ''}
                                                setValue={v =>
                                                    setSelectedTime(p => ({ ...p, [day]: v }))
                                                }
                                            />

                                            <ChooseDietItemName
                                                value={tempFood.item_id}
                                                setValue={v => setTempFood(p => ({ ...p, item_id: v }))}
                                                setName={n => setTempFood(p => ({ ...p, item_name: n }))}
                                                setItemType={n => setTempFood(p => ({ ...p, itemtype: n }))}
                                            />

                                            <ChooseDietMeasurementSelect
                                                value={tempFood.measure}
                                                setValue={v => setTempFood(p => ({ ...p, measure: v }))}
                                            />

                                            <input
                                                className="qty-input"
                                                type="number"
                                                placeholder="Quantity"
                                                value={tempFood.qty}
                                                onChange={e =>
                                                    setTempFood(p => ({ ...p, qty: e.target.value }))
                                                }
                                            />

                                            <DietButton name="Save" onClick={() => handleAddFood(day)} />
                                            <DietButton name="Close" onClick={handleClose} />

                                        </Box>
                                    </td>
                                </tr>
                            )}

                            {/* FOOD LIST */}
                            {(viewDay[day] || addDay === day) && Object.entries(weekData[day] || {}).map(([time, foods], index) => {
                                const DietType = DietTime?.find(i => Number(i?.type_slno) === Number(time));
                                const dietColor = DIET_ALT_COLORS[index % 2]

                                return (
                                    foods?.length > 0 && (
                                        <tr key={time} style={{
                                            width: '100%',
                                            boxShadow:
                                                '0 4px 8px rgba(0,0,0,0.07), 0 6px 20px rgba(0,0,0,0.08)',

                                        }}>
                                            <td colSpan={3} style={{ padding: 8 }}>
                                                <Box
                                                    sx={{
                                                        borderLeft: `4px solid ${dietColor.border}`,
                                                        backgroundColor: dietColor.bg,
                                                        padding: '4px 8px',
                                                        borderRadius: 4,
                                                        marginBottom: 1,
                                                        fontSize: 12,
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    {DietType?.type_desc}
                                                </Box>


                                                <table width="100%" style={{ borderCollapse: 'collapse', marginTop: 6 }}>
                                                    <thead>
                                                        <tr>
                                                            <th style={subTh}>Item No</th>
                                                            <th style={subTh}>Food</th>
                                                            <th style={subTh}>Qty/No</th>
                                                            <th style={subTh}>Measurement</th>
                                                            <th style={subTh}>Veg/noVeg</th>
                                                            <th style={subTh}>Caloreis</th>
                                                            <th style={subTh}>Edit</th>
                                                            <th style={subTh}>Delete</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {foods?.map((food, i) => {
                                                            const key = `${day}-${time}-${i}`
                                                            const isEdit = editingIndex === key

                                                            return (
                                                                <tr key={key} style={{ ...subtr, backgroundColor: dietColor.bg }}>
                                                                    <td style={subTd}>
                                                                        {i + 1}
                                                                    </td>
                                                                    <td style={subTd}>
                                                                        {isEdit ? (
                                                                            <ChooseDietItemName
                                                                                value={editFood?.item_id}
                                                                                setValue={v =>
                                                                                    setEditFood(p => ({ ...p, item_id: v }))
                                                                                }
                                                                                setName={n =>
                                                                                    setEditFood(p => ({ ...p, item_name: n }))
                                                                                }
                                                                            />
                                                                        ) : food.item_name}
                                                                    </td>

                                                                    <td style={subTd}>
                                                                        {isEdit ? (
                                                                            <input
                                                                                className="qty-input"
                                                                                type="number"
                                                                                value={editFood?.qty}
                                                                                onChange={e =>
                                                                                    setEditFood(p => ({ ...p, qty: e.target.value }))
                                                                                }
                                                                            />
                                                                        ) : food.qty}
                                                                    </td>

                                                                    <td style={subTd}>
                                                                        {isEdit ? (
                                                                            <ChooseDietMeasurementSelect
                                                                                value={editFood?.measure}
                                                                                setValue={v =>
                                                                                    setEditFood(p => ({ ...p, measure: v }))
                                                                                }
                                                                            />
                                                                        ) : food.measure}
                                                                    </td>
                                                                    <td style={subTd}>
                                                                        {food.itemtype}
                                                                    </td>
                                                                    <td style={subTd}>
                                                                        120 cal
                                                                    </td>
                                                                    <td style={subTd}>
                                                                        <IconButton
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                if (isEdit) {
                                                                                    const copy = [...foods]
                                                                                    copy[i] = editFood
                                                                                    onUpdateWeek({
                                                                                        ...weekData,
                                                                                        [day]: {
                                                                                            ...weekData[day],
                                                                                            [time]: copy
                                                                                        }
                                                                                    })
                                                                                    setEditingIndex(null)
                                                                                    setEditFood(null)
                                                                                } else {
                                                                                    setEditingIndex(key)
                                                                                    setEditFood(food)
                                                                                }
                                                                            }}
                                                                        >
                                                                            {isEdit
                                                                                ? <SaveAsIcon sx={{ fontSize: 16 }} />
                                                                                : <EditOutlinedIcon sx={{ fontSize: 16 }} />
                                                                            }
                                                                        </IconButton>
                                                                    </td>


                                                                    <td style={subTd}>
                                                                        <IconButton
                                                                            size="sm"
                                                                            color="danger"
                                                                            onClick={() => handleDelete(day, time, i)}
                                                                        >
                                                                            <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
                                                                        </IconButton>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>

                                            </td>
                                        </tr>
                                    )
                                )
                            })}

                            {/* </React.Fragment> */}
                        </tbody>
                    )
                })}
            </table>
        </Box>
    )
}

/* STYLES — UNTOUCHED */
const th = { padding: 8, fontSize: 12, fontWeight: 700, background: '#f5f5f5', textAlign: 'left' }
const td = { padding: 6, fontSize: 12 }
const tr = { borderBottom: '1px solid rgba(0,0,0,0.15)', borderTop: '1px solid rgba(0,0,0,0.15)' }

const subTh = { padding: 6, fontSize: 11, background: '#f0f0f0', textAlign: 'left', width: '15%' }
const subTd = { padding: 4, fontSize: 11 }
const subtr = { borderBottom: '1px solid rgba(0,0,0,0.1)' }

export default DietWeekTable
