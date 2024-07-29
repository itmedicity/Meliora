import { Box, Button, Checkbox, CssVarsProvider, Input, Table, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'

const RoomCheckListForm = ({ ptDetails }) => {
    const [declare, setDeclare] = useState(false)
    const { ptid, ptname, bed, doctor, room } = ptDetails
    const [roomChecklist, setRoomChecklist] = useState([])
    const capitalizeWords = (str) => str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const [nameSignList, setnameSignList] = useState({
        bystandNameIn: '', bystandNameOut: '', staffNameIn: '', staffNameOut: '', bystandSignIn: '',
        bystandSignOut: '', staffSignIn: '', staffSignOut: ''
    })
    const { bystandNameIn, bystandNameOut, staffNameIn, staffNameOut, bystandSignIn, bystandSignOut,
        staffSignIn, staffSignOut } = nameSignList
    useEffect(() => {
        if (room === 1) {
            const roomList = [
                { id: 1, amenity: 'FAN & REMOTE', in: true, out: false },
                { id: 2, amenity: 'AC', in: false, out: false },
                { id: 3, amenity: 'AC REMOTE', in: false, out: false },
                { id: 4, amenity: 'TV', in: true, out: false },
                { id: 5, amenity: 'TV REMOTE', in: true, out: false },
                { id: 6, amenity: 'SET-TOP BOX', in: true, out: false },
                { id: 7, amenity: 'SET-TOP BOX REMOTE', in: true, out: false },
                { id: 8, amenity: 'OVEN', in: false, out: false },
                { id: 9, amenity: 'GEYSER', in: false, out: false },
                { id: 10, amenity: 'ELECTRIC KETTLE', in: true, out: false },
            ]
            setRoomChecklist(roomList)
            const formdata = {
                bystandNameIn: 'Anu',
                bystandNameOut: '',
                staffNameIn: 'Ajmi',
                staffNameOut: '',
                bystandSignIn: '',
                bystandSignOut: '',
                staffSignIn: '',
                staffSignOut: ''
            }
            setnameSignList(formdata)
        }
        else {
            const roomList = [
                { id: 1, amenity: 'FAN & REMOTE', in: false, out: false },
                { id: 2, amenity: 'AC', in: false, out: false },
                { id: 3, amenity: 'AC REMOTE', in: false, out: false },
                { id: 4, amenity: 'TV', in: false, out: false },
                { id: 5, amenity: 'TV REMOTE', in: false, out: false },
                { id: 6, amenity: 'SET-TOP BOX', in: false, out: false },
                { id: 7, amenity: 'SET-TOP BOX REMOTE', in: false, out: false },
                { id: 8, amenity: 'OVEN', in: false, out: false },
                { id: 9, amenity: 'GEYSER', in: false, out: false },
                { id: 10, amenity: 'ELECTRIC KETTLE', in: false, out: false },
            ]
            setRoomChecklist(roomList)
        }
    }, [room])

    const updateNameSign = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setnameSignList({ ...nameSignList, [e.target.name]: value })
    }, [nameSignList])

    const getInValue = (checked, val) => {
        let arr = roomChecklist?.map((item) => item.id === val.id ? { ...item, in: checked } : item);
        setRoomChecklist(arr);
    };
    const getOutValue = (checked, val) => {
        let arr = roomChecklist?.map((item) => item.id === val.id ? { ...item, out: checked } : item);
        setRoomChecklist(arr);
    };
    const inputStyle =
    {
        '--Input-radius': '0px',
        borderColor: 'neutral.outlinedBorder',
        '&:hover': {
            borderColor: 'white'
        },
        '&::before': {
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
        },
        '&:focus-within::before': {
            transform: 'scaleX(1)',
        },
    }

    const buttonStyle = {
        fontSize: 17,
        color: '#424242',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#424242',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }
    const ResetDetails = useCallback(() => {
        const formdata = {
            bystandNameIn: '', bystandNameOut: '', staffNameIn: '', staffNameOut: '', bystandSignIn: '',
            bystandSignOut: '', staffSignIn: '', staffSignOut: ''
        }
        setnameSignList(formdata)
        let arr = roomChecklist?.map((val) => {
            return {
                id: val.id,
                amenity: val.amenity,
                in: val.in === true ? false : false,
                out: val.out === true ? false : false,
            }
        })
        setRoomChecklist(arr);
        setDeclare(false)
    }, [roomChecklist])
    const SaveDetails = useCallback(() => {
        if (declare === false) {
            infoNotify("Please indicate that you accept the Terms and Conditions")
        } else {
            succesNotify("Saved")
            ResetDetails()
        }

    }, [ResetDetails, declare])
    return (
        <Fragment>
            <Box sx={{ borderRadius: 5, m: 0.5, maxHeight: window.innerHeight - 270, overflow: 'auto', }}>
                <Typography sx={{ fontSize: 17, pl: 2, py: 0.5, fontWeight: 550 }}>Room Checklist</Typography>
                <Box variant="outlined" sx={{ overflow: 'auto', '&::-webkit-scrollbar': { height: 8 }, my: 0.5 }}>
                    <CssVarsProvider>
                        <Table aria-label="table with sticky header" borderAxis="both" padding="none" stickyHeader size="sm">
                            <thead style={{ alignItems: 'center', flexWrap: 'wrap' }}>
                                <tr style={{ height: 0.5, flexWrap: 'wrap' }}>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}> PATIENT NAME </th>
                                    <th size="sm" style={{ width: 150, fontSize: 14, }}>&nbsp;&nbsp;{capitalizeWords(ptname)}</th>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>MRD NO.</th>
                                    <th size="sm" style={{ width: 150, fontSize: 14 }}>&nbsp;&nbsp; {ptid}</th>
                                </tr>
                                <tr style={{ height: 0.5, flexWrap: 'wrap' }}>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>ROOM NO. </th>
                                    <th size="sm" style={{ width: 150, fontSize: 14, }}>&nbsp;&nbsp;{bed}</th>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>DOCTOR NAME</th>
                                    <th size="sm" style={{ width: 150, fontSize: 14 }}>&nbsp;&nbsp;{"Dr. " + capitalizeWords(doctor)}</th>
                                </tr>
                            </thead>
                        </Table>
                    </CssVarsProvider>
                </Box>
                <Box variant="outlined" sx={{ overflow: 'auto', '&::-webkit-scrollbar': { height: 8 }, my: 0.5 }}>
                    <CssVarsProvider>
                        <Table aria-label="table with sticky header" borderAxis="both" padding="none" stickyHeader size="sm">
                            <thead style={{ alignItems: 'center' }}>
                                <tr style={{ height: 0.5 }}>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center' }}>AMENITY</th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>IN</th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center' }}>OUT</th>
                                </tr>
                            </thead>
                            <tbody size="small">
                                {roomChecklist.map((val) => (
                                    <tr key={val.id} size="small" style={{ cursor: 'pointer' }}>
                                        <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{val.amenity}</td>
                                        <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                                            <Checkbox
                                                checked={val.in}
                                                color='neutral'
                                                onChange={(e) => getInValue(e.target.checked, val)}
                                            />
                                        </td>
                                        <td size="sm" style={{ fontSize: 12, height: 5, textAlign: 'center' }}>
                                            <Checkbox
                                                checked={val.out}
                                                color='neutral'
                                                onChange={(e) => getOutValue(e.target.checked, val)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: 'flex', pt: 1 }}>
                    <Box sx={{ pl: 1, pt: 0.3 }}>
                        <Checkbox
                            checked={declare}
                            color='neutral'
                            onChange={(e) => setDeclare(e.target.checked)}
                        /></Box>
                    <Box sx={{ pl: 1 }}>I hereby state that I have received all the information with regards the amenities of the room
                        which I occupied and are on working Condition during check-in and check-out time.
                    </Box>
                </Box>
                <Box variant="outlined" sx={{ overflow: 'auto', '&::-webkit-scrollbar': { height: 8 }, my: 0.5 }}>
                    <CssVarsProvider>
                        <Table aria-label="table with sticky header" borderAxis="both" padding="none" stickyHeader size="sm">
                            <thead style={{ alignItems: 'center' }}>
                                <tr style={{ height: 0.5 }}>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>NAME </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>IN</th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>OUT</th>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>SIGNATURE </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>IN</th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', backgroundColor: '#F0F4F8' }}>OUT</th>
                                </tr>
                                <tr style={{ height: 0.5 }}>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', }}>BYSTANDER </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', }}>
                                        <Input variant="plain" name="bystandNameIn" value={bystandNameIn} sx={inputStyle}
                                            onChange={updateNameSign} />
                                    </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', }}>
                                        <Input variant="plain" name="bystandNameOut" value={bystandNameOut} sx={inputStyle}
                                            onChange={updateNameSign} />
                                    </th>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', }}>BYSTANDER </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', }}>
                                        <Input variant="plain" name="bystandSignIn" value={bystandSignIn} sx={inputStyle}
                                            onChange={updateNameSign} />
                                    </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', }}>
                                        <Input variant="plain" name="bystandSignOut" value={bystandSignOut} sx={inputStyle}
                                            onChange={updateNameSign} />
                                    </th>
                                </tr>
                                <tr style={{ height: 0.5 }}>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', }}>STAFF </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', }}>
                                        <Input variant="plain" name="staffNameIn" value={staffNameIn} sx={inputStyle}
                                            onChange={updateNameSign} />
                                    </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', }}>
                                        <Input variant="plain" name="staffNameOut" value={staffNameOut} sx={inputStyle}
                                            onChange={updateNameSign} />
                                    </th>
                                    <th size="sm" style={{ width: 100, fontSize: 14, textAlign: 'center', }}>STAFF </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', }}>
                                        <Input variant="plain" name="staffSignIn" value={staffSignIn} sx={inputStyle}
                                            onChange={updateNameSign} />
                                    </th>
                                    <th size="sm" style={{ width: 50, fontSize: 14, textAlign: 'center', }}>
                                        <Input variant="plain" name="staffSignOut" value={staffSignOut} sx={inputStyle}
                                            onChange={updateNameSign} />
                                    </th>
                                </tr>
                            </thead>
                        </Table>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ pt: 0.4 }}>
                        <Button
                            variant="plain"
                            sx={buttonStyle}
                            onClick={SaveDetails}>
                            Save
                        </Button>
                    </Box>
                    <Box sx={{ pr: 2, pt: 0.4 }}>
                        <Button
                            variant="plain"
                            sx={buttonStyle}
                            onClick={ResetDetails}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Fragment >
    )
}

export default memo(RoomCheckListForm)