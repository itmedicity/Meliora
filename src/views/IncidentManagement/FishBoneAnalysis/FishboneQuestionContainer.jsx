import React, { memo, useEffect, useState } from 'react';
import { Box, IconButton, Modal, Sheet, FormControl } from '@mui/joy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { textAreaStyleFivewhy } from '../CommonComponent/CommonCode';
import SectionHeader from '../Components/SectionHeader';
import ApprovalButton from '../ButtonComponent/ApprovalButton';
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdFilePresent } from "react-icons/md";
import { warningNotify } from 'src/views/Common/CommonCode';
import { FaFish } from "react-icons/fa";
import { handleRateLimitError } from '../CommonComponent/CommonFun';
import { axioslogin } from 'src/views/Axios/Axios';

const FishboneQuestionContainer = ({
    setFormValues, formValues, open, setOpen, setSaveDetail,
    registraionNo
}) => {

    const [fbadetail, setFbaDetail] = useState([]);

    // Map question names to database field names
    const questionToField = {
        'MATERIAL': 'inc_material',
        'MACHINE': 'inc_machine',
        'MAN': 'inc_man',
        'MILIEU': 'inc_milieu',
        'METHOD': 'inc_method',
        'MEASUREMENT': 'inc_measurement'
    };

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
    };

    const questions = ['MATERIAL', 'MACHINE', 'MAN', 'MILIEU', 'METHOD', 'MEASUREMENT'];

    const handleFishboneModal = async () => {
        const payload = { inc_register_slno: registraionNo }
        try {
            const { data: deptRes } = await axioslogin.post("/incidentMaster/getallfbadetail", payload);
            if (deptRes?.success !== 2) return warningNotify(deptRes?.message);
            setFbaDetail(deptRes?.data || [])
        } catch (error) {
            if (handleRateLimitError(error)) return [];
            warningNotify(error?.message ?? "Something went wrong");
        }
    }

    useEffect(() => {
        handleFishboneModal()
    }, [open])


    // Get previous answers grouped by employee
    const getPreviousAnswersGrouped = (question) => {
        const field = questionToField[question];
        const allAnswers = fbadetail?.filter(item => item?.[field]?.trim()) || [];

        // Group by employee (em_name)
        const grouped = allAnswers?.reduce((acc, item) => {
            const employeeKey = `${item?.em_name}|${item?.sec_name || item?.Requested_user}`;
            if (!acc[employeeKey]) {
                acc[employeeKey] = {
                    em_name: item?.em_name,
                    sec_name: item?.sec_name || item?.Requested_user,
                    answers: []
                };
            }
            acc[employeeKey].answers.push(item?.[field]?.toUpperCase());
            return acc;
        }, {});

        return Object.values(grouped);
    };


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

                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            '& > div': { animation: 'orbit 3s linear infinite' },
                            '@keyframes orbit': {
                                '0%': { transform: 'rotate(0deg) translateX(16px) rotate(0deg)' },
                                '100%': { transform: 'rotate(360deg) translateX(16px) rotate(-360deg)' }
                            }
                        }}>
                        <div>
                            <FaFish style={{ fontSize: '14px', opacity: 0.7, color: 'white' }} />
                        </div>
                    </Box>

                    <IconButton onClick={handleOpen}>
                        <InfoOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Sheet
                    sx={{
                        maxWidth: 800,
                        mx: 'auto',
                        my: '1%',
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

                    <Box sx={{
                        minHeight: '35vh',
                        maxHeight: '70vh',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        '-ms-overflow-style': 'none',  // IE and Edge
                        'scrollbar-width': 'none',     // Firefox
                    }}>
                        {questions?.map((key) => {
                            const previousAnswers = getPreviousAnswersGrouped(key);
                            return (
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
                                    {/* Previous Answers Below Input - Grouped by Employee */}
                                    {previousAnswers?.length > 0 && (
                                        <Box
                                            sx={{
                                                mt: 0.5,
                                                ml: 0.5,
                                                maxHeight: previousAnswers?.length > 3 ? '100px' : 'auto',
                                                overflow: previousAnswers?.length > 3 ? 'auto' : 'hidden',
                                                pr: 1,
                                                '&::-webkit-scrollbar': {
                                                    width: '4px',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    backgroundColor: '#ccc',
                                                    borderRadius: '2px',
                                                },
                                                '&::-webkit-scrollbar-track': {
                                                    backgroundColor: '#f5f5f5',
                                                }
                                            }}
                                        >
                                            {previousAnswers?.map((employeeGroup, idx) => (
                                                <Box key={idx} sx={{ mb: 0.5 }}>
                                                    {/* Employee Header */}
                                                    <IncidentTextComponent
                                                        text={`● ${employeeGroup?.sec_name} (${employeeGroup?.em_name})`}
                                                        size={9}
                                                        weight={500}
                                                        color="#272323"
                                                        sx={{ mb: 0.2, fontWeight: 600 }}
                                                    />
                                                    {/* Employee's Answers */}
                                                    {employeeGroup?.answers?.map((answer, ansIdx) => (
                                                        <IncidentTextComponent
                                                            key={ansIdx}
                                                            text={`   • ${answer}`}
                                                            size={9}
                                                            weight={400}
                                                            color="#272323"
                                                            sx={{ mb: 0.2 }}
                                                        />
                                                    ))}
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </FormControl>
                            );
                        })}
                    </Box>

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
