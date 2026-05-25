import React, { memo } from 'react';
import { Box, IconButton, Modal, Sheet, FormControl, Stack } from '@mui/joy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { textAreaStyleFivewhy } from '../CommonComponent/CommonCode';
import SectionHeader from '../Components/SectionHeader';
import ApprovalButton from '../ButtonComponent/ApprovalButton';
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdFilePresent } from "react-icons/md";
import { warningNotify } from 'src/views/Common/CommonCode';
import { FaFish } from "react-icons/fa";

const FishboneQuestionContainer = ({
    setFormValues, formValues, open, setOpen, setSaveDetail
}) => {

    const handleChange = (key, value) => {
        setFormValues((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const { MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT } = formValues;


    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
    };

    const handleSave = () => {
        if (![MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT]?.some(Boolean)) {
            warningNotify("Fishbone : Please Enter Any of the Above Before Submitting!");
            return
        }
        setSaveDetail(true)
        setOpen(false)
    }

    const questions = ['MATERIAL', 'MACHINE', 'MAN', 'MILIEU', 'METHOD', 'MEASUREMENT'];

    return (
        <Box>
            {/* Header */}

            <Box
                onClick={handleOpen}
                sx={{
                    width: '100%',
                    bgcolor: 'var(--royal-purple-400)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    px: 1.5,
                    mt: 2,
                    borderRadius: '6px',
                    borderLeft: '4px solid #0d0d0e'
                }}>
                <Box>
                    <IncidentTextComponent
                        text="FISHBONE QUESTION"
                        size={14}
                        weight={600}
                        color="white"
                    />
                    <IncidentTextComponent
                        text="Complete the Fish Bone Analysis Before Submitting...!"
                        size={10}
                        weight={400}
                        color="white"
                    />
                </Box>

                {/* ?? Icon + Fish Orbit Wrapper */}
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

                    {/* ?? Orbiting Fish */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',

                            '& > div': {
                                animation: 'orbit 3s linear infinite'
                            },

                            '@keyframes orbit': {
                                '0%': {
                                    transform: 'rotate(0deg) translateX(16px) rotate(0deg)'
                                },
                                '100%': {
                                    transform: 'rotate(360deg) translateX(16px) rotate(-360deg)'
                                }
                            }
                        }}
                    >
                        <div>
                            <FaFish style={{ fontSize: '14px', opacity: 0.7, color: 'white' }} />
                        </div>
                    </Box>

                    {/* ?? Your Original Icon */}
                    <IconButton onClick={handleOpen}>
                        <InfoOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>
            </Box>


            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Sheet
                    sx={{
                        maxWidth: 500,
                        mx: 'auto',
                        my: '5%',
                        p: 3,
                        borderRadius: 'md',
                        backgroundColor: 'white',
                        boxShadow: 'lg'
                    }}>
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: 'var(--rose-pink-300)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 0.5,
                            px: 0.5,
                            borderRadius: '3px',
                            mb: 2
                        }}>
                        <IncidentTextComponent
                            text="FISHBONE ANALYSIS QUESTIONS"
                            size={14}
                            weight={500}
                            color="white"
                        />
                    </Box>


                    <Stack spacing={2}>
                        {questions?.map((key) => (
                            <FormControl key={key}>
                                <SectionHeader text={key} fontSize={12} iconSize={18} />
                                <input
                                    placeholder={`Enter ${key} cause`}
                                    value={formValues?.[key] ?? ""}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    rows={4}
                                    style={textAreaStyleFivewhy}
                                    onFocus={(e) => {
                                        e.target.style.outline = 'none';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.border = '1.5px solid #d8dde2ff';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = '1.5px solid #d8dde2ff';
                                    }} />

                            </FormControl>
                        ))}
                    </Stack>

                    <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
                        <ApprovalButton
                            size={12}
                            iconSize={17}
                            text={"Close"}
                            icon={RiArrowGoBackFill}
                            onClick={handleClose}
                        />
                        <ApprovalButton
                            size={12}
                            iconSize={17}
                            text={"save"}
                            icon={MdFilePresent}
                            onClick={handleSave}
                        />
                    </Box>
                </Sheet>
            </Modal>
        </Box>
    );
};

export default memo(FishboneQuestionContainer);
