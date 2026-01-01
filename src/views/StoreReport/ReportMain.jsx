import React, { memo, useCallback, useState } from "react";
import CardCloseOnly from "../Components/CardCloseOnly";
import PurchaseReport from "./StoreReportMain";
import RatevariationReport from "./Ratevariation";
import { Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import GrnReport from "./GrnReport";
import RateVariationUpdation from "./RateVariationUpdation";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getStoreUserRights } from "./CommonApiFun";
import PendingApprovalQuatation from "./PendingApprovalQuatation";
import RateVariationResolved from "./RateVariationResolved";

const ReportMain = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const history = useNavigate()

    const loginId = useSelector(state => state.LoginUserData.empid)

    const {
        data: fetchStoreUserRights,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['getStoreRights', loginId],
        queryFn: () => getStoreUserRights(loginId),
        enabled: !!loginId,
        staleTime: Infinity
    })

    const reportItems = [
        { id: 1, label: "Purchase Report", component: <PurchaseReport /> },
        { id: 2, label: "GRN Report", component: <GrnReport /> },
        { id: 3, label: "Rate Variation Report", component: <RateVariationUpdation /> },
        { id: 4, label: "Rate Variation Updation", component: <RatevariationReport /> },
        { id: 5, label: "Pending Approval Quatation", component: <PendingApprovalQuatation /> },
        { id: 6, label: "Resolved List", component: <RateVariationResolved /> },


    ];

    const allowedReportItems = reportItems.filter(item =>
        fetchStoreUserRights?.includes(item.id)
    );

    const backToSetting = useCallback(() => {
        history(`/Home`)
    }, [history])

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error Occurred.</p>

    return (
        <>
            {/* ===== SELECTED COMPONENT VIEW ===== */}
            {activeComponent === 1 ? <PurchaseReport setActiveComponent={setActiveComponent} /> :
                activeComponent === 2 ? <GrnReport setActiveComponent={setActiveComponent} /> :
                    activeComponent === 3 ? <RateVariationUpdation setActiveComponent={setActiveComponent} /> :
                        activeComponent === 4 ? <RatevariationReport setActiveComponent={setActiveComponent} /> :
                            activeComponent === 5 ? <PendingApprovalQuatation setActiveComponent={setActiveComponent} /> :
                                activeComponent === 6 ? <RateVariationResolved setActiveComponent={setActiveComponent} /> :

                                    <Box sx={{ width: "100%" }}>
                                        <CardCloseOnly title="Store Reports" close={backToSetting}>
                                            <Box
                                                sx={{
                                                    display: "grid",
                                                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                                                    gap: 2,
                                                    p: 2,
                                                }}
                                            >
                                                {allowedReportItems.map((item) => (
                                                    <Box
                                                        key={item.id}
                                                        onClick={() => setActiveComponent(item.id)}
                                                        sx={{
                                                            p: 1.5,
                                                            border: 1,
                                                            borderColor: "#BB8ED0",
                                                            borderRadius: 2,
                                                            bgcolor: "neutral.softBg",
                                                            boxShadow: "sm",
                                                            cursor: "pointer",
                                                            textAlign: "center",
                                                            fontWeight: "lg",
                                                            transition: "all 0.2s",
                                                            "&:hover": {
                                                                bgcolor: "primary.softBg",
                                                                boxShadow: "lg",
                                                                transform: "scale(1.03)"
                                                            }
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </CardCloseOnly>
                                    </Box>
            }
        </>
    );
};

export default memo(ReportMain);
