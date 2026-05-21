import { Box } from '@mui/joy'
import React, { useCallback, useMemo, useState } from 'react'
import BedSuggestion from './BedSuggestion';
import { UseAllActiveBed } from '../../CommonData/UseQuery';

const BedSelect = ({ setBed }) => {
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const { data: Bed } = UseAllActiveBed()

    const filteredSuggestions = useMemo(() => {
        if (!query.trim() || !Array.isArray(Bed)) return [];

        const lowerQuery = query.toLowerCase();

        return Bed
            .filter(item => item?.fb_bdc_no) // remove invalid rows first
            .filter(item =>
                item.fb_bdc_no.toLowerCase().includes(lowerQuery)
            )
    }, [query, Bed]);

    const handleSelectFood = useCallback((bed) => {
        setQuery(bed.fb_bdc_no);
        setBed(bed.fb_bd_code)
    }, []);

    return (
        <Box sx={{ position: "relative" }}>
            <input
                value={query}
                placeholder='Select Bed'
                onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setQuery(value);
                    setShowSuggestions(Boolean(value.trim()));
                }}
                onFocus={() => query && setShowSuggestions(true)}
                onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                }
                onKeyDown={(e) => {
                    if (!filteredSuggestions.length) return;

                    if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setActiveIndex((prev) =>
                            prev < filteredSuggestions.length - 1 ? prev + 1 : 0
                        );
                    }

                    if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setActiveIndex((prev) =>
                            prev > 0 ? prev - 1 : filteredSuggestions.length - 1
                        );
                    }

                    if (e.key === "Enter") {
                        e.preventDefault();

                        //  CASE 1: user navigated
                        if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
                            handleSelectFood(filteredSuggestions[activeIndex]);
                            return;
                        }
                        //  CASE 2: only one item → auto select
                        if (filteredSuggestions.length === 1) {
                            handleSelectFood(filteredSuggestions[0]);
                            return;
                        }
                        //  CASE 3: fallback (optional)
                        // pick first item if exists
                        if (filteredSuggestions.length > 0) {
                            handleSelectFood(filteredSuggestions[0]);
                        }
                    }
                }}
                className="qty-input"
                style={{ width: "250px", fontSize: '12px' }}
            />
            {showSuggestions && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "110%",
                        left: 0,
                        right: 0,
                        bgcolor: "#fff",
                        borderRadius: 8,
                        boxShadow: "md",
                        zIndex: 20,
                    }}
                >
                    <BedSuggestion
                        suggestions={filteredSuggestions}
                        onSelect={handleSelectFood}
                        activeIndex={activeIndex}
                    />
                </Box>
            )}
        </Box>
    )
}

export default BedSelect