import React, { memo, useCallback } from "react"
import { IconButton } from "@mui/joy"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import SaveAsIcon from "@mui/icons-material/SaveAs"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import ChooseDietItemName from "src/views/CommonSelectCode/ChooseDietItemName"
import ChooseDietMeasurementSelect from "src/views/CommonSelectCode/ChooseDietMeasurementSelect"
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

const DietFoodItemRow = ({
    food,
    i,
    day,
    time,
    isEdit,
    editFood,
    setEditFood,
    handleEditSave,
    handleDeleteFood,
    unitMap,
    dietColor
}) => {

    const key = `${day}-${time}-${i}`

    const onQtyChange = useCallback((e) => {
        const val = e.target.value
        setEditFood(p => ({ ...p, qty: val }))
    }, [setEditFood])

    return (
        <tr key={key} style={{ ...subtr, backgroundColor: dietColor.bg }}>
            <td style={subTd}>{i + 1}</td>

            {/* FOOD */}
            <td style={subTd}>
                {isEdit ? (
                    <ChooseDietItemName
                        value={editFood?.item_id}
                        setValue={v => setEditFood(p => ({ ...p, item_id: v }))}
                        setName={n => setEditFood(p => ({ ...p, item_name: n }))}
                        setItemType={n => setEditFood(p => ({ ...p, itemtype: n }))}
                    />
                ) : food.item_name}
            </td>

            {/* QTY */}
            <td style={subTd}>
                {isEdit ? (
                    <input
                        className="qty-input"
                        type="number"
                        value={editFood?.qty}
                        onChange={onQtyChange}
                    />
                ) : food.qty}
            </td>

            {/* MEASURE */}
            <td style={subTd}>
                {isEdit ? (
                    <ChooseDietMeasurementSelect
                        value={editFood?.measure}
                        setValue={v =>
                            setEditFood(p => ({ ...p, measure: v }))
                        }
                    />
                ) : unitMap[food.measure]}
            </td>

            <td style={subTd}>{food.itemtype}</td>
            <td style={subTd}>120 cal</td>
            <td style={subTd}>
                {food?.is_active === 1
                    ? "Active"
                    : food?.is_active === 0
                        ? "Inactive"
                        : "Not Added Yet"}
            </td>

            {/* EDIT */}
            <td style={subTd}>
                <IconButton
                    size="sm"
                    onClick={() => handleEditSave(isEdit, i, key, food)}
                >
                    {isEdit
                        ? <SaveAsIcon sx={{ fontSize: 16 }} />
                        : <EditOutlinedIcon sx={{ fontSize: 16 }} />
                    }
                </IconButton>
            </td>

            {/* DELETE */}
            <td style={subTd}>
                <IconButton
                    size="sm"
                    color={food.is_active === 1 ? 'success' : food.is_active === 0 ? 'warning' : 'danger'}
                    onClick={() => handleDeleteFood(i, food)}>
                    {food.is_active === 1
                        ? <ToggleOnIcon color="success" sx={{ fontSize: 16 }} />
                        : food.is_active === 0
                            ? <ToggleOffIcon color="warning" sx={{ fontSize: 16 }} />
                            : <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
                </IconButton>
            </td>
        </tr>
    )
}

const subTd = { padding: 4, fontSize: 11 }
const subtr = { borderBottom: '1px solid rgba(0,0,0,0.1)' }


export default memo(DietFoodItemRow)