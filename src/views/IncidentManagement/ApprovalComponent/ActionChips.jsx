// import React from "react";
// import { Chip, Box } from "@mui/joy";
// import EditIcon from "@mui/icons-material/Edit";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import DoneAllIcon from "@mui/icons-material/DoneAll";
// import { succesNotify, warningNotify } from "src/views/Common/CommonCode";
// import { axioslogin } from "src/views/Axios/Axios";
// import { useQueryClient } from "@tanstack/react-query";
// import { CiWarning } from "react-icons/ci";

// const ActionChips = ({ category, currentLevel, data, setEdit, setReview, setEditItem, title, preventEdit }) => {
//     const queryClient = useQueryClient();

//     const {
//         inc_rca,
//         inc_corrective_action,
//         inc_preventive_action,
//         inc_evaluation_status,
//         inc_rca_hod_approve,
//         inc_rca_qad_approve,
//         inc_register_slno,
//         inc_corrective_hod_approval,
//         inc_preventive_qad_approval,
//     } = data;

//     const approvalStatus = {
//         Preventive: inc_preventive_qad_approval,
//         Corrective: inc_corrective_hod_approval,
//         RCA_HOD: inc_rca_hod_approve,
//         RCA_QUALITY: inc_rca_qad_approve,
//     };



//     const makeChip = (label, color, icon, onClick) => (
//         <Chip
//             key={label}
//             size="sm"
//             variant="outlined"
//             color={color}
//             sx={{ cursor: onClick ? "pointer" : "default" }}
//             startDecorator={icon}
//             onClick={onClick}
//         >
//             {label}
//         </Chip>
//     );

//     const handleApprove = async () => {
//         const config = {
//             HOD: {
//                 url: category === 'RCA' ? "/incidentMaster/hodrcaapprovals" : "/incidentMaster/hodcrctiveapprovals",
//                 qkey: 'allIncidents',
//             },
//             QUALITY: {
//                 url: category === 'Preventive' ? "/incidentMaster/qadprtvapprovals" : "/incidentMaster/qadrcaapprovals",
//                 qkey: 'qadincident',
//             },
//         }[currentLevel];

//         if (!config) {
//             warningNotify("Invalid approval level");
//             return;
//         }

//         try {
//             const { data } = await axioslogin.patch(config.url, { inc_register_slno });
//             const { success, message } = data ?? {};
//             if (success === 2) {
//                 succesNotify(message);
//                 queryClient.invalidateQueries(config.qkey);
//             } else {
//                 warningNotify(message);
//             }
//         } catch (error) {
//             warningNotify(error?.message ?? "Something went wrong");
//         }
//     };

//     const handleEdit = () => {
//         const value = title === 'Preventive Action' ?
//             inc_preventive_action : title === 'Corrective Action' ?
//                 inc_corrective_action : title === 'Evaluation Status' ? inc_evaluation_status : inc_rca;

//         setEdit(true)
//         setReview(value)
//         setEditItem(category)
//     };



//     // === Centralized rendering configuration ===
//     const configMap = {
//         Preventive: {
//             HOD: {
//                 condition: inc_preventive_action,
//                 render: () => !preventEdit && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit),
//             },
//             QUALITY: {
//                 condition: inc_preventive_action,
//                 render: () => {
//                     const isApproved = preventEdit;
//                     return (
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                             {isApproved
//                                 ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
//                                 : makeChip("pending", "warning", <CiWarning sx={{ fontSize: 15 }} />)}
//                             {/* {!isApproved && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)} */}
//                         </Box>
//                     );
//                 },
//             },
//         },

//         Corrective: {
//             INCHARGE: {
//                 condition: inc_corrective_action,
//                 // render: () => makeChip("Edits", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit),
//                 render: () => {
//                     const isApproved = approvalStatus.Corrective === 'A';
//                     return (
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                             {isApproved && makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)}
//                             {!isApproved && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)}
//                         </Box>
//                     );
//                 },
//             },
//             HOD: {
//                 condition: inc_corrective_action,
//                 render: () => {
//                     const isApproved = approvalStatus.Corrective === 'A';
//                     console.log(isApproved, "sdalkjsfa");

//                     return (
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                             {isApproved
//                                 ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
//                                 : makeChip("Approve", "success", <VerifiedIcon sx={{ fontSize: 15 }} />, handleApprove)}
//                             {/* {!isApproved && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)} */}
//                         </Box>
//                     );
//                 },
//             },
//             QUALITY: {
//                 condition: inc_corrective_action,
//                 render: () => {
//                     const isApproved = approvalStatus.Corrective === 'A';
//                     return (
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                             {isApproved
//                                 ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
//                                 : makeChip("pending", "warning", <CiWarning sx={{ fontSize: 15 }} />)}
//                             {/* {!isApproved && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)} */}
//                         </Box>
//                     );
//                 }
//             },
//         },

//         Evaluation: {
//             QUALITY: {
//                 condition: inc_evaluation_status,
//                 render: () => makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit),
//             },
//         },

//         RCA: {
//             QUALITY: {
//                 condition: inc_rca,
//                 render: () => {
//                     const isApproved = approvalStatus.RCA_HOD === 'A';
//                     return (
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                             {isApproved
//                                 ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
//                                 : makeChip("pendingS", "warning", <CiWarning sx={{ fontSize: 15 }} />)}
//                             {/* {!isApproved && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)} */}
//                         </Box>
//                     );
//                 },
//             },
//             HOD: {
//                 condition: inc_rca,
//                 render: () => {
//                     const isApproved = approvalStatus.RCA_HOD === 'A';
//                     return (
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                             {isApproved
//                                 ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
//                                 : makeChip("Approve", "success", <VerifiedIcon sx={{ fontSize: 15 }} />, handleApprove)}
//                             {/* {!isApproved && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)} */}
//                         </Box>
//                     );
//                 },
//             },
//             INCHARGE: {
//                 condition: inc_rca,
//                 render: () => {
//                     const canEdit = inc_rca_qad_approve !== 'A' && inc_rca_hod_approve !== 'A';
//                     return (
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                             {canEdit
//                                 ? makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)
//                                 : makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)}
//                         </Box>
//                     );
//                 },
//             },
//         },
//     };

//     const levelConfig = configMap[category]?.[currentLevel];

//     if (levelConfig && levelConfig.condition) {
//         return levelConfig.render();
//     }

//     return "—";
// };

// export default ActionChips;



import React from "react";
import { Chip, Box } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/Verified";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { succesNotify, warningNotify } from "src/views/Common/CommonCode";
import { axioslogin } from "src/views/Axios/Axios";
import { useQueryClient } from "@tanstack/react-query";
import { CiWarning } from "react-icons/ci";
import { GiEmptyHourglass } from "react-icons/gi";

const ActionChips = ({ category, currentLevel, data, setEdit, setReview, setEditItem, title, preventEdit }) => {
    const queryClient = useQueryClient();

    const {
        inc_rca,
        inc_corrective_action,
        inc_preventive_action,
        inc_evaluation_status,
        inc_rca_hod_approve,
        inc_rca_qad_approve,
        inc_register_slno,
        inc_corrective_hod_approval,
        inc_preventive_qad_approval,
    } = data;

    const approvalStatus = {
        Preventive: inc_preventive_qad_approval,
        Corrective: inc_corrective_hod_approval,
        RCA_HOD: inc_rca_hod_approve,
        RCA_QUALITY: inc_rca_qad_approve,
    };

    const makeChip = (label, color, icon, onClick) => (
        <Chip
            key={label}
            size="sm"
            variant="outlined"
            color={color}
            sx={{ cursor: onClick ? "pointer" : "default" }}
            startDecorator={icon}
            onClick={onClick}
        >
            {label}
        </Chip>
    );

    const handleApprove = async () => {
        const config = {
            HOD: {
                url: category === 'RCA' ? "/incidentMaster/hodrcaapprovals" : "/incidentMaster/hodcrctiveapprovals",
                qkey: 'allIncidents',
            },
            QUALITY: {
                url: category === 'Preventive' ? "/incidentMaster/qadprtvapprovals" : "/incidentMaster/qadrcaapprovals",
                qkey: 'qadincident',
            },
        }[currentLevel];

        if (!config) {
            warningNotify("Invalid approval level");
            return;
        }

        try {
            const { data } = await axioslogin.patch(config.url, { inc_register_slno });
            const { success, message } = data ?? {};
            if (success === 2) {
                succesNotify(message);
                queryClient.invalidateQueries(config.qkey);
            } else {
                warningNotify(message);
            }
        } catch (error) {
            warningNotify(error?.message ?? "Something went wrong");
        }
    };

    const handleEdit = () => {
        const value = title === 'Preventive Action' ?
            inc_preventive_action : title === 'Corrective Action' ?
                inc_corrective_action : title === 'Evaluation Status' ? inc_evaluation_status : inc_rca;

        setEdit(true)
        setReview(value)
        setEditItem(category)
    };

    // === Centralized rendering configuration ===
    const configMap = {
        Preventive: {
            HOD: {
                condition: inc_preventive_action,
                render: () => !preventEdit && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit),
            },
            QUALITY: {
                condition: inc_preventive_action,
                render: () => {
                    const isApproved = preventEdit;
                    return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {isApproved
                                ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
                                : makeChip("Pending", "warning", <CiWarning sx={{ fontSize: 15 }} />)}
                        </Box>
                    );
                },
            },
        },

        Corrective: {
            INCHARGE: {
                condition: inc_corrective_action,
                render: () => {
                    const isApproved = approvalStatus.Corrective === 'A';
                    return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {isApproved && makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)}
                            {!isApproved && makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)}
                        </Box>
                    );
                },
            },
            HOD: {
                condition: inc_corrective_action,
                render: () => {
                    const isApproved = approvalStatus.Corrective === 'A';
                    return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {isApproved
                                ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
                                : makeChip("Approve", "success", <VerifiedIcon sx={{ fontSize: 15 }} />, handleApprove)}
                        </Box>
                    );
                },
            },
            QUALITY: {
                condition: inc_corrective_action,
                render: () => {
                    const isApproved = approvalStatus.Corrective === 'A';
                    return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {isApproved
                                ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
                                : makeChip("Pending", "warning", <CiWarning sx={{ fontSize: 15 }} />)}
                        </Box>
                    );
                }
            },
        },

        Evaluation: {
            QUALITY: {
                condition: inc_evaluation_status,
                // render: () => makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit),
                render: () => makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />),
            },
        },

        RCA: {
            QUALITY: {
                condition: inc_rca,
                render: () => {
                    const isApproved = approvalStatus.RCA_HOD === 'A';
                    return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {isApproved
                                ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
                                : makeChip("Pending", "warning", <CiWarning sx={{ fontSize: 15 }} />)}
                        </Box>
                    );
                },
            },
            HOD: {
                condition: inc_rca,
                render: () => {
                    const isApproved = approvalStatus.RCA_HOD === 'A';
                    return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {isApproved
                                ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
                                : makeChip("Approve", "success", <VerifiedIcon sx={{ fontSize: 15 }} />, handleApprove)}
                        </Box>
                    );
                },
            },
            INCHARGE: {
                condition: inc_rca,
                render: () => {
                    const canEdit = inc_rca_qad_approve !== 'A' && inc_rca_hod_approve !== 'A';
                    return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {canEdit
                                ? makeChip("Edit", "primary", <EditIcon sx={{ fontSize: 15 }} />, handleEdit)
                                : makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)}
                        </Box>
                    );
                },
            },
        },
    };

    const levelConfig = configMap[category]?.[currentLevel];

    // === existing logic for INCHARGE / HOD / QUALITY / EVALUATION ===
    if (levelConfig && levelConfig.condition) {
        return levelConfig.render();
    }

    // === UPDATED FALLBACK LOGIC (only this section changed) ===
    let fallbackChip;

    if (category === "RCA") {
        // RCA: show No Data if no RCA, otherwise Approved if HOD approved
        if (!inc_rca) {
            fallbackChip = makeChip("No Data Present", "neutral", <GiEmptyHourglass sx={{ fontSize: 15 }} />);
        } else {
            const isApproved = approvalStatus.RCA_HOD === 'A';
            fallbackChip = isApproved
                ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
                : makeChip("Pending", "warning", <CiWarning sx={{ fontSize: 15 }} />);
        }
    } else if (category === "Corrective") {
        // Corrective: show No Data if no Corrective Action
        if (!inc_corrective_action) {
            fallbackChip = makeChip("No Data Present", "neutral", <GiEmptyHourglass sx={{ fontSize: 15 }} />);
        } else {
            const isApproved = approvalStatus.Corrective === 'A';
            fallbackChip = isApproved
                ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
                : makeChip("Pending", "warning", <CiWarning sx={{ fontSize: 15 }} />);
        }
    } else if (category === "Preventive") {
        // Preventive: show No Data if no Preventive Action
        if (!inc_preventive_action) {
            fallbackChip = makeChip("No Data Present", "neutral", <GiEmptyHourglass sx={{ fontSize: 15 }} />);
        } else {
            const isApproved = preventEdit;
            fallbackChip = isApproved
                ? makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />)
                : makeChip("Pending", "warning", <CiWarning sx={{ fontSize: 15 }} />);
        }
    } else if (category === "Evaluation") {
        // Evaluation: show No Data if no Evaluation Status
        if (!inc_evaluation_status) {
            fallbackChip = makeChip("No Data Present", "neutral", <GiEmptyHourglass sx={{ fontSize: 15 }} />);
        } else {
            fallbackChip = makeChip("Approved", "success", <DoneAllIcon sx={{ fontSize: 15 }} />);
        }
    } else {
        // General fallback
        fallbackChip = makeChip("Pending", "warning", <CiWarning sx={{ fontSize: 15 }} />);
    }

    return <Box sx={{ display: "flex", gap: 1 }}>{fallbackChip}</Box>;

};

export default ActionChips;
