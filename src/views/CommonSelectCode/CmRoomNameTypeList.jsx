import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider } from '@mui/joy/';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CmRoomNameTypeList = ({ roomName, setRoomName }) => {
    const RoomsNameNdTypeList = useSelector((state) => state.getRoomsNameNdTypeList?.RoomsNameNdTypeList);

    const [roomNameType, setRoomNameType] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (roomName !== 0) {
            let newObj = RoomsNameNdTypeList?.find((e) => e.rm_room_slno === roomName) || null
            setValue(newObj);
        }
    }, [roomName, RoomsNameNdTypeList]);

    const Onclick = useCallback(
        (value) => {
            if (value !== null) {
                setValue(value);
                setRoomName(value.rm_room_slno);
            } else {
                setRoomName(0);
            }
        },
        [setRoomName]
    );

    useEffect(() => {
        if (RoomsNameNdTypeList.length !== 0) {
            setRoomNameType(RoomsNameNdTypeList);
        } else {
            setRoomNameType([]);
        }
    }, [RoomsNameNdTypeList]);

    const getOptionLabel = (option) => {
        if (option.rm_room_name) {
            return `${option.rm_room_name} (${option.rm_roomtype_name} - ${option.rm_insidebuildblock_name} - ${option.rm_floor_name})`;
        }
        return '';
    };

    const isOptionEqualToValue = (option, value) => option.rm_room_slno === value?.rm_room_slno;

    return (
        <Fragment>
            <CssVarsProvider>
                <Autocomplete
                    sx={{
                        "--Input-minHeight": "29px",
                    }}
                    value={value}
                    placeholder="Select Location"
                    clearOnBlur
                    style={{ minHeight: 36, borderRadius: 0 }}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        Onclick(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    loading={roomNameType.length === 0}
                    loadingText="No data"
                    freeSolo
                    isOptionEqualToValue={isOptionEqualToValue}
                    getOptionLabel={getOptionLabel}
                    options={roomNameType}
                    endDecorator={<ArrowDropDownIcon />}
                />
            </CssVarsProvider>
        </Fragment>
    );
};

export default memo(CmRoomNameTypeList);

