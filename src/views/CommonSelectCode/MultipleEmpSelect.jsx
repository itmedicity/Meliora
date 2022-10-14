import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const options = [
    { id: "1", name: "HR" },
    { id: "2", name: "Interviewer" },
    { id: "3", name: "Hiring Manager" }
];

export default function MultipleSelectChip() {
    // const [value, setValue] = React.useState<string[]>([]);
    const [value, setValue] = React.useState([]);
    const handleChange = (e) => {
        const {
            target: { value }
        } = e;
        setValue(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    console.log(value);
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => {
                        return (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => {
                                    const option = options.find((o) => o.id === value);
                                    console.log(option);
                                    return <Chip key={value} label={option.name} />;
                                })}
                            </Box>
                        );
                    }}
                    MenuProps={MenuProps}
                >

                    <MenuItem value={0} disabled  >Select Employee</MenuItem>

                    {options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
