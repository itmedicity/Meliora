import React, { memo } from 'react';
import {
    Box,
    IconButton,
    Modal,
    Sheet,
    FormControl,
    Stack
} from '@mui/joy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { textAreaStyleFivewhy } from '../CommonComponent/CommonCode';
import SectionHeader from '../Components/SectionHeader';
import ApprovalButton from '../ButtonComponent/ApprovalButton';
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdFilePresent } from "react-icons/md";

const FishboneQuestionContainer = ({
    setFormValues, formValues, open, setOpen, setSaveDetail
}) => {

    const handleChange = (key, value) => {
        setFormValues((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
    };

    const handleSave = () => {
        setSaveDetail(true)
        setOpen(false)
    }

    const questions = ['MATERIAL', 'MACHINE', 'MAN', 'MILIEU', 'METHOD', 'MEASUREMENT'];

    return (
        <Box>
            {/* Header */}
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'var(--royal-purple-400)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 0.5,
                    px: 1.5,
                    mt: 2,
                    borderRadius: '6px'
                }}
            >
                <IncidentTextComponent
                    text="FISHBONE QUESTION"
                    size={14}
                    weight={600}
                    color="white"
                />
                <IconButton onClick={handleOpen}>
                    <InfoOutlinedIcon sx={{ color: 'white' }} />
                </IconButton>
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
