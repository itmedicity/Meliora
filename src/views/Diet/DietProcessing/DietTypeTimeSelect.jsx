import React, { useMemo, useEffect } from 'react'
import { Box } from '@mui/joy'
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone'
import DietTextComponent from '../DietComponent/DietTextComponent'
import MealTypeCheckbox from './MealTypeCheckbox'
import { getSafeFormattedDate } from '../CommonData/CommonFun'

const DietTypeTimeSelect = ({
  selectedDiets,
  setSelectedDietTimes,
  selectedDietTimes,
  FormatedProcessedList,
  setSelectedDiets
}) => {

  const memoizedFormatedProcessedList = useMemo(() => FormatedProcessedList, [FormatedProcessedList]);

  /**
   * FAST LOOK UP VERY IMPORT
   * Converts the diet list array into a map keyed by diet_id.
   * This allows O(1) access to diet objects instead of scanning the array each time.
   */

  // Create a map of diet_id → diet object for fast lookup
  const dietMap = useMemo(() => {
    if (!memoizedFormatedProcessedList?.length) return {};
    // Reduce array to an object: { diet_id: diet }
    return memoizedFormatedProcessedList?.reduce((acc, diet) => {
      acc[diet.diet_id] = diet; // key = diet_id, value = diet object
      return acc;
    }, {});
  }, [memoizedFormatedProcessedList]);


  /**
 * Builds a grouped structure of meals by time ranges from the selected diets.
 * Ensures each meal type appears only once per range.
 * Memoized to avoid recalculating on every render unless selectedDiets or dietMap change.
 */
  const combinedTimes = useMemo(() => {
    if (!selectedDiets.length) return [];

    const grouped = {}; // Initialize an object to group meal types by time ranges
    const now = new Date();

    selectedDiets.forEach(dietId => {
      const diet = dietMap[dietId]; // Get diet details from the dietMap for fast lookup
      if (!diet?.types?.length) return;

      diet.types.forEach(typeItem => {

        const start = new Date(`${getSafeFormattedDate(new Date(), 'yyyy-MM-dd')} ${typeItem.start_time}`);
        // const end = new Date(`${getSafeFormattedDate(new Date(), 'yyyy-MM-dd')} ${typeItem.end_time}`);

        //  skip if started (covers running + past)
        if (now >= start) return;

        const range = `${typeItem.start_time} - ${typeItem.end_time}`; // Create a string for the time range
        if (!grouped[range]) grouped[range] = { range, meals: [] }; // Initialize the group for this range if it doesn't exist

        // Check if this meal type is already added for this time range
        if (!grouped[range].meals.some(m => m.type_id === typeItem.type_id)) {
          // Add meal type to the group if it's not a duplicate
          grouped[range].meals.push({
            type: typeItem.type_desc, // Meal type name, e.g., "BREAKFAST"
            type_id: typeItem.type_id, // Unique ID for the meal type
            dietId
          });
        }
      });
    });

    return Object.values(grouped); // Convert the grouped object into an array for easier rendering
  }, [selectedDiets, dietMap]);


  useEffect(() => {
    if (!selectedDiets.length) return;

    setSelectedDietTimes(prev => {
      const updated = { ...prev };
      let changed = false;

      selectedDiets.forEach(dietId => {
        const diet = dietMap[dietId] || memoizedFormatedProcessedList?.find(d => d.diet_id === dietId);
        if (!diet?.types?.length) return;

        const allowedTimes = diet.types.map(t => t.type_id);
        let currentTimes = updated[dietId] || [];

        // Only filter out invalid times (do NOT force select all)
        const filtered = currentTimes.filter(t => allowedTimes.includes(t));
        if (JSON.stringify(filtered) !== JSON.stringify(currentTimes)) {
          currentTimes = filtered;
          changed = true;
        }

        updated[dietId] = currentTimes;
      });

      return changed ? updated : prev;
    });
  }, [selectedDiets, dietMap, memoizedFormatedProcessedList]);



  /*Toggle time selection*/

  const handleTimeToggle = (typeId) => {
    setSelectedDietTimes(prev => {
      const updated = { ...prev };

      // Find the diet(s) that actually contain this type
      Object.keys(updated).forEach(dietId => {
        const currentTypes = updated[dietId] || [];
        const diet = dietMap[dietId];

        if (!diet?.types?.some(t => t.type_id === typeId)) {
          // This diet does not have this type, skip it
          return;
        }

        if (currentTypes.includes(typeId)) {
          // Remove the type
          const filtered = currentTypes.filter(t => t !== typeId);
          if (filtered.length > 0) {
            updated[dietId] = filtered; // diet still has other times
          } else {
            delete updated[dietId]; // remove diet only if NO times left
          }
        } else {
          // Add the type
          updated[dietId] = [...currentTypes, typeId];
        }
      });

      // Only keep diets with at least one type selected
      const newSelectedDiets = Object.keys(updated).filter(dietId => updated[dietId]?.length > 0);
      setSelectedDiets(newSelectedDiets);

      return updated;
    });
  };

  if (selectedDiets?.length === 0)
    return <DietTextComponent size={14} weight={500} value={"Select Diet to view timings"} />;

  return (
    <>
      {/* HEADER */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
          <PendingActionsTwoToneIcon sx={{ color: '#7c51a1' }} />
          <DietTextComponent size={16} weight={500} color='var(--royal-purple-400)' value={" DIET TIMES"} />
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%', }}>
        {combinedTimes?.map(group => (
          <Box key={group.range} sx={{ width: '100%' }}>
            <DietTextComponent size={13} weight={600} color='#7c51a1' value={group.range} />
            {group.meals.map(item => (
              <MealTypeCheckbox
                key={item.type_id}
                item={item}
                selectedDietTimes={selectedDietTimes}
                handleTimeToggle={handleTimeToggle}
              />
            ))}
          </Box>
        ))}
      </Box>
    </>
  )
}

export default DietTypeTimeSelect