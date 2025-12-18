import React, { useMemo } from "react";
import { Box, Sheet, Typography } from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TiArrowForwardOutline } from "react-icons/ti";
import IncidentTextComponent from "../Components/IncidentTextComponent";
import { memo } from "react";
import { useIncidentCategory, useIncidentSubCategory } from "../CommonComponent/useQuery";
import SubCategoryItem from "./SubCategoryItem";

const IncidentCategorySelect = ({
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
}) => {


  const { data: categories } = useIncidentCategory();
  const { data: incidentsubcategory } = useIncidentSubCategory();

  //  Filter subcategories based on selected category & active status
  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory || !Array.isArray(incidentsubcategory)) return [];
    return incidentsubcategory.filter(
      (sub) =>
        sub?.inc_category_slno === selectedCategory &&
        sub?.inc_sub_category_status === 1
    );
  }, [selectedCategory, incidentsubcategory]);

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        p: 2,
        borderRadius: "md",
        boxShadow: "sm",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mx: "auto",
        width: "100%",
      }}
    >
      {/*  Category Selection */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 0.4 }}>
        <TiArrowForwardOutline
          style={{ color: "var(--rose-pink-400)", fontSize: 18 }}
        />
        <IncidentTextComponent
          text="Select Incident Category"
          size={14}
          weight={600}
          color="black"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {categories?.map((cat) => {
          const isSelected = selectedCategory === cat?.inc_category_slno;
          return (
            <Sheet
              key={cat?.inc_category_slno}
              onClick={() => {
                setSelectedCategory(cat?.inc_category_slno);
                setSelectedSubCategory(null); // reset subcategory when category changes
              }}
              variant="outlined"
              sx={{
                cursor: "pointer",
                px: 1.5,
                py: 0.75,
                borderRadius: "sm",
                borderWidth: "2px",
                borderColor: isSelected
                  ? "var(--royal-purple-300)"
                  : "neutral.outlinedBorder",
                backgroundColor: isSelected
                  ? "var(--royal-purple-100)"
                  : "background.body",
                minWidth: "130px",
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
                transition: "0.2s ease",
                "&:hover": {
                  boxShadow: "sm",
                  borderColor: "primary.outlinedHoverBorder",
                },
              }}
            >
              <Typography level="body-sm" sx={{ fontWeight: 500, fontSize: 13 }}>
                {cat?.inc_category_name}
              </Typography>

              {isSelected && (
                <CheckCircleIcon
                  fontSize="small"
                  sx={{ color: "var(--royal-purple-300)" }}
                />
              )}
            </Sheet>
          );
        })}
      </Box>

      {/*  Subcategory Selection */}
      {selectedCategory && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 0.4 }}>
            <TiArrowForwardOutline
              style={{ color: "var(--rose-pink-400)", fontSize: 18 }}
            />
            <IncidentTextComponent
              text="Select Subcategory"
              size={14}
              weight={600}
              color="black"
            />
          </Box>

          {filteredSubcategories?.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {
                filteredSubcategories?.map((sub) => {
                  return (
                    <SubCategoryItem
                      key={sub?.inc_sub_cat_slno}
                      sub={sub}
                      isSelected={selectedSubCategory === sub?.inc_sub_cat_slno}
                      onSelect={setSelectedSubCategory}
                    />
                  );
                })}
            </Box>
          ) : (
            <Typography
              level="body-sm"
              sx={{ color: "text.secondary", mt: 1, ml: 1 }}
            >
              No subcategories available for this category.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default memo(IncidentCategorySelect);

