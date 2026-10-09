import React, { memo } from "react";
import { Box } from "@mui/joy";
import DietTextComponent from "../../DietComponent/DietTextComponent";

const PartyTypeSelector = ({
    data = [],
    value,
    onChange
}) => {

    return (
        <Box
            sx={{
                display: "flex",
                gap: 0.5,
                p: 0.5,
                borderRadius: 3,
                bgcolor: "#f1f3f6",
                position: "relative"
            }}
        >
            {data?.map(type => {
                const active = value === type.party_type_id;

                return (
                    <Box
                        key={type.party_type_id}
                        onClick={() => onChange(type.party_type_id)}
                        sx={{
                            flex: 1,
                            py: 1,
                            textAlign: "center",
                            borderRadius: 4,
                            cursor: "pointer",
                            position: "relative",
                            borderRight: active ? '4px solid black' : '',
                            borderLeft: active ? '4px solid black' : '',
                            zIndex: 1,

                            //  Smooth active background
                            bgcolor: active ? 'var(--royal-purple-300)' : "transparent",

                            //  Elevation when active
                            boxShadow: active
                                ? "0 2px 8px rgba(0,0,0,0.08)"
                                : "none",

                            //  Text styling
                            color: active ? "#f8f8f8" : "#666",

                            transition: "all 0.25s ease"
                        }}
                    >
                        <DietTextComponent
                            color={active ? "white" : 'black'}
                            value={type?.party_name}
                            size={13}
                            weight={active ? 700 : 500}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};

export default memo(PartyTypeSelector);