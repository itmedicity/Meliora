import React, {
    memo,
    useMemo,
    useState,
    useRef
} from "react";
import { Box } from "@mui/joy";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const NsPatientListPanel = ({
    data = [],
    selectedBed,
    onSelectPatient,
    isPanelOpen,
    setIsPanelOpen
}) => {

    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const inputRef = useRef(null);

    const hasData = data?.length > 0 && isPanelOpen && !selectedBed;


    //  FILTER
    const filteredData = useMemo(() => {

        //  PRIORITY: filter by selected bed
        if (selectedBed) {
            return data.filter(
                (item) => item?.fb_bd_code === selectedBed
            );
        }

        //  Then normal search
        if (!query.trim()) return data;

        return data.filter((item) =>
            item?.fb_ptc_name
                ?.toLowerCase()
                .includes(query.trim().toLowerCase())
        );

    }, [data, query, selectedBed]);

    return (
        <Box
            sx={{
                width: hasData ? 360 : 0,
                minWidth: hasData ? 240 : 0,
                opacity: hasData ? 1 : 0,

                height: "65vh",

                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",

                overflow: "hidden",
                borderRadius: 3,
                bgcolor: "#ffffff",
                border: hasData ? "1px solid #eee" : "none",

                display: "flex",
                flexDirection: "column",
                boxShadow: hasData
                    ? "0 4px 12px rgba(0,0,0,0.05)"
                    : "none"
            }}
        >
            {hasData && (
                <>
                    {/* HEADER */}
                    <Box
                        sx={{
                            p: 1.5,
                            borderBottom: "1px solid #f0f0f0",
                            bgcolor: "#fafafa",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1
                        }}
                    >
                        <DietTextComponent
                            value={`Patients (${filteredData.length})`}
                            size={13}
                            weight={700}
                        />

                        {/* SEARCH */}
                        {showSearch ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <input
                                    ref={inputRef}
                                    className="qty-input"
                                    type="text"
                                    placeholder="Search patient..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    style={{
                                        fontSize: 12,
                                        padding: "4px 8px",
                                        width: 140
                                    }}
                                />
                                <CloseIcon
                                    sx={{ cursor: "pointer", fontSize: 18 }}
                                    onClick={() => {
                                        setShowSearch(false);
                                        setQuery("");
                                    }}
                                />
                            </Box>
                        ) : (
                            <SearchIcon
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    setShowSearch(true);
                                    setTimeout(() => {
                                        inputRef.current?.focus();
                                    }, 200);
                                }}
                            />
                        )}
                    </Box>

                    {/* LIST */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",

                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}
                    >
                        {filteredData?.length > 0 ? (
                            filteredData.map((pt) => {
                                const isActive =
                                    selectedBed === pt?.fb_bed_slno;

                                return (
                                    <Box
                                        key={pt.fb_ipad_slno}
                                        onClick={() => {
                                            onSelectPatient(pt);

                                            // 🔥 CLOSE PANEL AFTER SELECT
                                            setIsPanelOpen(false);
                                            setShowSearch(false);
                                            setQuery("");
                                        }}
                                        sx={{
                                            p: 1.3,
                                            mx: 1,
                                            my: 0.5,
                                            borderRadius: 2,
                                            cursor: "pointer",

                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 0.3,

                                            bgcolor: isActive
                                                ? "#e3f2fd"
                                                : "#fff",

                                            border: isActive
                                                ? "1px solid #1976d2"
                                                : "1px solid transparent",

                                            transition: "all 0.25s ease",

                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow:
                                                    "0 6px 14px rgba(0,0,0,0.08)",
                                                bgcolor: "#f9fbff"
                                            }
                                        }}
                                    >
                                        <DietTextComponent
                                            value={pt?.fb_ptc_name}
                                            size={12.5}
                                            weight={600}
                                        />

                                        <DietTextComponent
                                            value={`Bed: ${pt?.fb_bdc_no}`}
                                            size={11}
                                            color="#666"
                                        />

                                        <DietTextComponent
                                            value={
                                                pt?.diet_name ??
                                                "Not under diet"
                                            }
                                            size={10.5}
                                            color="#999"
                                        />
                                    </Box>
                                );
                            })
                        ) : (
                            <Box sx={{ p: 2 }}>
                                <DietTextComponent
                                    value="No patients found"
                                    size={12}
                                    color="#aaa"
                                />
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default memo(NsPatientListPanel);