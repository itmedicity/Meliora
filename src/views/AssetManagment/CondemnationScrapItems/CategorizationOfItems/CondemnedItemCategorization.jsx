import { Box, Checkbox, Table, IconButton } from '@mui/joy';
import React, { memo, useMemo, useState } from 'react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { getAddedItemNotCategorized, getScrapNotCategorized } from 'src/api/AssetApis';
import ScarpCategorizeModal from './ScarpCategorizeModal';
import AddNewScapAtCatgorization from '../AddNewScapAtCatgorization';
import { useQuery, useQueryClient } from '@tanstack/react-query';


const CondemnedItemCategorization = ({ addMoreItemFlag, setaddMoreItemFlag, addmoreItemOpen, setaddmoreItemOpen, CategorizeScarpFlag, setCategorizeScarpFlag,
  CategorizeScarpOpen, setCategorizeScarpOpen }) => {

  const queryClient = useQueryClient()
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});


  const { data: getAssetSpareNotUnderCategorization } = useQuery({
    queryKey: ['getScrapNotUnderCategorization',],
    queryFn: () => getScrapNotCategorized(),
  });


  const { data: getAddedItemsNotUnderCategorization } = useQuery({
    queryKey: ['getAddedItemNotUnderCategorization',],
    queryFn: () => getAddedItemNotCategorized(),
  });

  const CombinedCodm = useMemo(() => {
    const ItemListz = (getAssetSpareNotUnderCategorization || []).map(item => ({ ...item, type: 'ItemList' }));
    const AddedItemz = (getAddedItemsNotUnderCategorization || []).map(item => ({ ...item, type: 'AddedItems' }));
    return [...ItemListz, ...AddedItemz];
  }, [getAssetSpareNotUnderCategorization, getAddedItemsNotUnderCategorization]);
  const groupedData = useMemo(() => {
    const groups = {};
    CombinedCodm.forEach(item => {
      const category = item.cat_asset_name || item.cat_spare_name || item.item_name || 'Unknown';
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [CombinedCodm]);


  const handleToggleGroup = (category) => {
    setExpandedGroups(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSelectAllChange = () => {
    const allIds = Object.values(groupedData).flat().map(item => `${item.slno}-${item.type}`);
    const newSelected = selectAll ? [] : allIds;
    setSelectedRows(newSelected);
    setSelectAll(!selectAll);
  };

  const handleRowSelection = (slno, type) => {
    const id = `${slno}-${type}`;
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedItemDetails = useMemo(() => {
    return CombinedCodm.filter(item => selectedRows.includes(`${item.slno}-${item.type}`));
  }, [CombinedCodm, selectedRows]);



  return (

    <Box sx={{ p: .5, height: '80vh', }}>
      {addMoreItemFlag === 1 ?
        <AddNewScapAtCatgorization addMoreItemFlag={addMoreItemFlag} setaddMoreItemFlag={setaddMoreItemFlag} addmoreItemOpen={addmoreItemOpen}
          setaddmoreItemOpen={setaddmoreItemOpen} queryClient={queryClient} />
        : null}
      {CategorizeScarpFlag === 1 ?
        <ScarpCategorizeModal CategorizeScarpFlag={CategorizeScarpFlag} setCategorizeScarpFlag={setCategorizeScarpFlag} CategorizeScarpOpen={CategorizeScarpOpen}
          setCategorizeScarpOpen={setCategorizeScarpOpen} selectedRows={selectedRows} setSelectedRows={setSelectedRows}
          selectedItems={selectedItemDetails} queryClient={queryClient} />
        :
        null}
      <Box sx={{ p: .5, overflow: 'auto', height: '75vh', }}>
        <Table stickyHeader borderAxis="both" sx={{ fontSize: 12, }}>
          <thead>
            <tr>
              <th style={{ width: 50, textAlign: 'center' }}>
                <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
              </th>
              <th style={{ width: 50, textAlign: 'center' }}>
              </th>
              <th style={{ width: 'auto', }}>Category</th>
              <th style={{ textAlign: 'center', width: 70 }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedData).map(([category, items]) => {
              const isOpen = expandedGroups[category] || false;
              return (
                <React.Fragment key={category}>
                  <tr style={{}}>
                    <td style={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={items.every(item => selectedRows.includes(`${item.slno}-${item.type}`))}
                        indeterminate={
                          items.some(item => selectedRows.includes(`${item.slno}-${item.type}`)) &&
                          !items.every(item => selectedRows.includes(`${item.slno}-${item.type}`))
                        }
                        onChange={(e) => {
                          const itemIds = items.map(item => `${item.slno}-${item.type}`);
                          setSelectedRows(prev => {
                            if (e.target.checked) {
                              return [...new Set([...prev, ...itemIds])];
                            } else {
                              return prev.filter(id => !itemIds.includes(id));
                            }
                          });
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', }}>
                      <IconButton
                        size="sm"
                        onClick={() => handleToggleGroup(category)}
                      >
                        {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </td>
                    <td colSpan={1} style={{ fontWeight: 600, width: 'auto', }}>{category}</td>
                    <td style={{ textAlign: 'center', width: 70, fontWeight: 600, fontSize: 14 }}>{items.length}</td>
                  </tr>
                  {isOpen && items.map((item) => {
                    const id = `${item.slno}-${item.type}`;
                    const isSelected = selectedRows.includes(id);
                    return (
                      <tr
                        key={id}
                        style={{
                          background: isSelected ? '#e0f7fa' : '#f0f4f8',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <td style={{ textAlign: 'center' }}>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleRowSelection(item.slno, item.type)}
                          />
                        </td>
                        <td colSpan={3}>
                          {item.asset_item_name || item.spare_item_name || item.item_name}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </Box>
    </Box >

  );
};

export default memo(CondemnedItemCategorization);
