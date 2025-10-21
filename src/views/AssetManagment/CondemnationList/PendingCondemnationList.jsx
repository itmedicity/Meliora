import { Box, Checkbox, CircularProgress, Sheet, Table } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { getAssetUnderCondmnation, getSpareUnderCondmnation } from 'src/api/AssetApis';
import CusIconButton from 'src/views/Components/CusIconButton';
import { format } from 'date-fns';
import CondemSubmitionModal from './CondemSubmitionModal';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color'
import { infoNotify } from 'src/views/Common/CommonCode';
import EditCondemSubmitionModal from './EditCondemSubmitionModal';


const PendingCondemnationList = ({ empdept, empId, addmoreItemFlag, setFormDetailsInAddMoreItems, FormDetailsInAddMoreItems, setAddmoreItemFlag, queryClient,
  addMoreModalOpen, setaddMoreModalOpen }) => {

  const { condem_mast_slno } = FormDetailsInAddMoreItems
  const [condemCount, setcondemCount] = useState(0)
  const [sortedData, setSortedData] = useState([]);

  const { data: AsssetCodmnation, } = useQuery({
    queryKey: ['getAssetsUnderCondmnation', empdept, condemCount],
    queryFn: () => getAssetUnderCondmnation(empdept),
  });

  const { data: SpareCodmnation } = useQuery({
    queryKey: ['getSparesUnderCondmnation', empdept, condemCount],
    queryFn: () => getSpareUnderCondmnation(empdept),
  });

  const CombinedCodm = useMemo(() => {
    const spareList = (SpareCodmnation || []).map(item => ({ ...item, type: 'spare' }));
    const assetList = (AsssetCodmnation || []).map(item => ({ ...item, type: 'asset' }));
    return [...assetList, ...spareList];
  }, [SpareCodmnation, AsssetCodmnation]);

  useEffect(() => {
    setSortedData(CombinedCodm);
  }, [CombinedCodm]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalFlag, setmodalFlag] = useState(0);
  const [modalOpen, setmodalOpen] = useState(false);
  const [itemList, setitemList] = useState([])
  const [condemMastslno, setcondemMastslno] = useState(0)
  const [loading, setLoading] = useState(false);

  const SubmitForCondem = useCallback(() => {
    const selectedItems = CombinedCodm.filter((item) =>
      selectedRows.includes(`${item.slno}-${item.type}`)
    );
    if (selectedItems.length === 0) {
      infoNotify("Please select at least one item before submitting.");
      return;
    }
    setitemList(selectedItems);
    const PostForm = {
      create_user: empId,
      deatilData: selectedItems
    };
    CreateForm(PostForm);
  }, [CombinedCodm, selectedRows, empId]);
  const CreateForm = async (PostForm) => {
    try {
      const result = await axioslogin.post('/AssetCondemnation/insertCondemMasterData', PostForm);
      const { success, condem_mast_slno } = result.data;
      if (success === 1) {
        setcondemMastslno(condem_mast_slno)
        setmodalFlag(1);
        setmodalOpen(true);
        setSelectedRows([])
      } else {
      }
    } catch (error) {

    }
  };

  const handleSelectAllChange = () => {
    setSelectAll((prev) => {
      const newSelectAll = !prev;
      const newSelectedRows = newSelectAll ? CombinedCodm.map((item) => `${item.slno}-${item.type}`) : [];
      setSelectedRows(newSelectedRows);
      setSortedData([...CombinedCodm]);
      return newSelectAll;
    });
  };

  const handleRowSelection = (slno, type) => {
    setSelectedRows((prevSelected) => {
      const identifier = `${slno}-${type}`;
      const newSelected = prevSelected.includes(identifier)
        ? prevSelected.filter((id) => id !== identifier)
        : [...prevSelected, identifier];
      const selectedData = CombinedCodm.filter((item) => newSelected.includes(`${item.slno}-${item.type}`));
      const unselectedData = CombinedCodm.filter((item) => !newSelected.includes(`${item.slno}-${item.type}`));
      setTimeout(() => {
        setSortedData([...selectedData, ...unselectedData]);
      }, 400);
      return newSelected;
    });
  };

  const AddMoreItems = useCallback(async () => {
    setLoading(true);
    try {
      const selectedItems = CombinedCodm.filter((item) =>
        selectedRows.includes(`${item.slno}-${item.type}`)
      );
      const spareItems = selectedItems.filter(item => item.am_spare_item_map_slno !== undefined);
      const assetItems = selectedItems.filter(item => item.am_item_map_slno !== undefined);
      const PostForm = {
        create_user: empId,
        condem_mast_slno: condem_mast_slno,
        deatilData: selectedItems
      };
      const formResult = await addItemForm(PostForm);
      if (formResult === true) {
        if (assetItems.length > 0) {
          const assetPostForm = {
            assetItems: assetItems.map(item => ({
              am_item_map_slno: item.am_item_map_slno,
              submited_condemnation: 1
            }))
          };
          await UpdateAssetStatus(assetPostForm);
        }
        if (spareItems.length > 0) {
          const sparePostForm = {
            spareItems: spareItems.map(item => ({
              am_spare_item_map_slno: item.am_spare_item_map_slno,
              submited_condemnation: 1
            }))
          };
          await UpdateSpareStatus(sparePostForm);
        }
      }
    } catch (error) {
      infoNotify("Something went wrong while adding items");
    } finally {
      setLoading(false);
      setSelectedRows([]);
    }
  }, [CombinedCodm, selectedRows, empId, condem_mast_slno]);


  const UpdateAssetStatus = async (PostForm) => {
    try {
      const result = await axioslogin.patch('/AssetCondemnation/UpdateAssetStatus', PostForm);
      const { success, message } = result.data;

      if (success !== 1) {
        throw new Error(message || "Failed to update asset status.");
      }
    } catch (error) {
      infoNotify(error.message);
      throw error;
    }
  };

  const UpdateSpareStatus = async (PostForm) => {
    try {
      const result = await axioslogin.patch('/AssetCondemnation/UpdateSpareStatus', PostForm);
      const { success, message } = result.data;

      if (success !== 1) {
        throw new Error(message || "Failed to update spare status.");
      }
    } catch (error) {
      infoNotify(error.message);
      throw error;
    }
  };
  const addItemForm = async (PostForm) => {
    try {
      const result = await axioslogin.post('/AssetCondemnation/AddmoreItemsInForm', PostForm);
      const { success } = result.data;
      if (success === 1) {
        setAddmoreItemFlag(1);
        setaddMoreModalOpen(true);
        setSelectedRows([]);
        return true;
      } else {
        infoNotify("Failed to create condemnation form.");
        return false;
      }
    } catch (error) {
      infoNotify("Error occurred while creating form.");
      return false;
    }
  };

  const ExitAddmoreItems = useCallback(() => {
    setAddmoreItemFlag(0)
    setaddMoreModalOpen(false)
    setFormDetailsInAddMoreItems([])
  }, [])

  return (
    <Box>
      {modalFlag === 1 ?
        <CondemSubmitionModal open={modalOpen}
          setmodalOpen={setmodalOpen}
          setmodalFlag={setmodalFlag}
          itemList={itemList}
          setitemList={setitemList}
          empId={empId}
          condemMastslno={condemMastslno}
          empdept={empdept}
          setcondemCount={setcondemCount}
          condemCount={condemCount}
        />
        : null}
      {addmoreItemFlag === 1 && addMoreModalOpen ? (
        <EditCondemSubmitionModal
          modalEditOpen={addMoreModalOpen}
          setmodalEditOpen={setaddMoreModalOpen}
          setmodalEditFlag={setAddmoreItemFlag}
          empId={empId}
          formDetails={FormDetailsInAddMoreItems}
          empdept={empdept}
          setAddmoreItemFlag={setAddmoreItemFlag}
          setFormDetailsInAddMoreItems={setFormDetailsInAddMoreItems}
          queryClient={queryClient}
        />
      ) : null}
      {loading && (
        <Sheet
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
          }}
        >
          <CircularProgress
            size="md"
            sx={{
              "--CircularProgress-size": "64px",
              "--CircularProgress-thickness": "6px",
              color: "#584072ff",
            }}
          />
        </Sheet>
      )}

      {addmoreItemFlag === 1 ?
        <Box sx={{
          flex: 1, m: .5, py: .5, pl: .5, display: 'flex', justifyContent: 'flex-end', gap: 1
        }}>
          <CusIconButton size="sm" style={{ bgcolor: taskColor.lightpurple, border: 1, borderColor: taskColor.purple }}
            onClick={AddMoreItems}>
            <Box sx={{ px: 1 }}>
              Add More Items
            </Box>
          </CusIconButton>
          <CusIconButton size="sm" style={{ bgcolor: taskColor.lightpurple, border: 1, borderColor: taskColor.purple }}
            onClick={ExitAddmoreItems}>
            <Box sx={{ px: 1 }}>
              Exit
            </Box>
          </CusIconButton>
        </Box> :
        <Box sx={{ flex: 1, m: .5, py: .5, pl: .5, display: 'flex', justifyContent: 'flex-end' }}>
          <CusIconButton size="sm" style={{ bgcolor: taskColor.lightpurple, border: 1, borderColor: taskColor.purple }}
            onClick={SubmitForCondem}>
            <Box sx={{ px: 1 }}>
              Submit for Condemnation
            </Box>
          </CusIconButton>
        </Box>
      }
      {
        CombinedCodm?.length !== 0 ? (
          <Box sx={{ flex: 1, height: '78vh', overflow: 'auto', m: .5 }}>
            <Table
              variant="plain"
              borderAxis="both"
              stickyHeader
              size='sm'
              sx={{ '& thead th': { bgcolor: 'background.surface' } }}
            >
              <thead>
                <tr>
                  <th style={{ width: 45, textAlign: 'center' }}>
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                      variant="outlined"
                    />
                  </th>
                  <th style={{ width: 120, textAlign: 'center' }}>Asset No.</th>
                  <th style={{ width: 'auto', textAlign: 'center' }}>Category</th>
                  <th style={{ width: 'auto', textAlign: 'center' }}>Item Name</th>
                  <th style={{ width: 'auto', textAlign: 'center' }}>Department Section</th>
                  <th style={{ width: 'auto', textAlign: 'center' }}>Location</th>
                  <th style={{ width: 80, textAlign: 'center' }}>Ticket Id</th>
                  <th style={{ width: 'auto', textAlign: 'center' }}>Reason</th>
                  <th style={{ width: 'auto', textAlign: 'center' }}>Transfered Employee</th>
                  <th style={{ width: 140, textAlign: 'center' }}>Transfered Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((val) => {
                  const identifier = `${val.slno}-${val.type}`;
                  const isSelected = selectedRows.includes(identifier);
                  return (
                    <tr
                      key={identifier}
                      style={{
                        maxHeight: 300,
                        background: isSelected ? taskColor.lightpurple : val.hold_color,
                        transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <td style={{ textAlign: 'center' }}>
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleRowSelection(val.slno, val.type)}
                          variant="outlined"
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {val.spare_asset_no
                          ? `${val.spare_asset_no}/${(val.spare_asset_no_only ?? 0).toString().padStart(6, '0')}`
                          : `${val.item_asset_no}/${(val.item_asset_no_only ?? 0).toString().padStart(6, '0')}`}
                      </td>
                      <td style={{ textAlign: 'center' }}>{val.category_name}</td>
                      <td style={{ textAlign: 'center' }}>{val.item_name}</td>
                      <td style={{ textAlign: 'center' }}>{val.ticket_reg_location}</td>
                      <td style={{ textAlign: 'center' }}>
                        {val.rm_room_name}
                        {(val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name) ? (
                          ` (${val.rm_roomtype_name || ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name || ''}${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''}${val.rm_floor_name || ''})`
                        ) : (
                          val.cm_complaint_location || " "
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>{val.complaint_slno}</td>
                      <td style={{ textAlign: 'center' }}>{val.condm_transf_remarks}</td>
                      <td style={{ textAlign: 'center' }}>{val.condm_trans_emp}</td>
                      <td style={{ textAlign: 'center' }}>
                        {val.item_condm_date || val.deleted_date
                          ? format(new Date(val.item_condm_date || val.deleted_date), 'dd MMM yyyy, hh:mm a')
                          : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Box>
        ) : (
          <Box
            sx={{
              fontSize: 26,
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '65vh',
              width: '100%',
              textAlign: 'center',
              color: 'lightgrey',
              borderRadius: 2
            }}
          >
            Empty List
          </Box>
        )
      }

    </Box >
  )
}

export default memo(PendingCondemnationList)