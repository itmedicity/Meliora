import { Box, Button, Checkbox, CssVarsProvider, Grid, Input, Modal, ModalDialog, Table, } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextComponent from 'src/views/Components/TextComponent';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreIcon from '@mui/icons-material/More';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddDetailOnItem from './AddDetailOnItem';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { getCondemAddedDetails, getCustodianDetails } from 'src/api/AssetApis';
import { axioslogin } from 'src/views/Axios/Axios';
import FileViewSingle from 'src/views/Components/FileViewSingle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AssetDetailsModal from './AssetDetailsView/AssetDetailsModal';
import { useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color';
import KeepInDeptScrapStoreModal from './KeepInDeptScrapStoreModal';
import DirectionsIcon from '@mui/icons-material/Directions';
import { fetchFilesFromZipWithFolder } from 'src/api/FileViewWithFolderFn';

const CondemSubmitionModal = ({ open, setmodalFlag, setmodalOpen, setitemList, itemList, empId, condemMastslno, empdept, setcondemCount,
  condemCount }) => {


  const queryClient = useQueryClient()
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [addModalFlag, setaddModalFlag] = useState(0)
  const [itemDetails, setitemDetails] = useState([])
  const [keepinScarpModalOpen, setkeepinScarpModalOpen] = useState(false)
  const [keepinScarpModalFlag, setkeepinScarpModalFlag] = useState(0)


  const AddDetailsModal = useCallback((val) => {
    setaddModalFlag(1)
    setaddModalOpen(true)
    setitemDetails(val)
  }, [setaddModalFlag, setaddModalOpen])

  const CloseModal = useCallback(() => {
    setmodalOpen(false)
    setmodalFlag(0)
    setitemList([])
  }, [setmodalOpen, setmodalFlag, setitemList])

  const buttonStyle = {
    fontSize: 16,
    color: taskColor.darkPurple,
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: taskColor.darkPurple,
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  }

  const [checkedItems, setCheckedItems] = useState({});
  const [addedCondemFiles, setaddedCondemFiles] = useState([])
  const [condemformPrefix, setcondemformPrefix] = useState('')
  const [detailsofItem, setdetailsofItem] = useState([])
  const [currentIndex, setcurrentIndex] = useState('')

  const handleOpen = (e, index, val) => {
    if (e.target.checked) {
      setCheckedItems((prev) => ({ ...prev, [index]: true }));
      setcurrentIndex(index)
      setdetailsofItem(val);
      setkeepinScarpModalFlag(1);
      setkeepinScarpModalOpen(true);
    } else {
      setCheckedItems((prev) => ({ ...prev, [index]: false }));
      setdetailsofItem(val);
      setcurrentIndex(index)
      setkeepinScarpModalFlag(2);
      setkeepinScarpModalOpen(true);
    }
  };



  const postCondemSlno = useMemo(() => {
    return {
      condemMastslno,
    }
  }, [condemMastslno])

  const [count, setcount] = useState(0)

  const { data: CondemData } = useQuery({
    queryKey: ['getCondemAddedDetails', count],
    queryFn: () => getCondemAddedDetails(postCondemSlno),
    enabled: condemMastslno !== undefined,
  })
  const { data: CustodianData, isSuccess } = useQuery({
    queryKey: ['CustodianDatas', empdept],
    enabled: empdept !== 0,
    queryFn: () => getCustodianDetails(empdept),
  });

  const custodianDetails = useMemo(() => CustodianData, [CustodianData])

  useEffect(() => {
    if (isSuccess && custodianDetails && custodianDetails.length > 0) {
      const { am_custdn_asset_no_first, am_custdn_asset_no_second } = custodianDetails[0];
      setcondemformPrefix(`${am_custdn_asset_no_first}/${am_custdn_asset_no_second}`);
    }
  }, [isSuccess, custodianDetails]);


  const fetchCondemFiles = useCallback(async () => {
    if (!CondemData?.length) {
      setaddedCondemFiles({});
      return;
    }
    await fetchFilesFromZipWithFolder(
      '/AssetFileUpload/uploadFile/getCondemnation',
      CondemData.map((row) => ({
        id: row.condem_mast_slno,
        detailId: row.am_condem_detail_slno,
      })),
      setaddedCondemFiles,
      ['id', 'detailId']
    );
  }, [CondemData]);

  useEffect(() => {
    fetchCondemFiles();
  }, [fetchCondemFiles]);

  const [imageShowsingleFlag, setImagesingle] = useState(0)
  const [imageShowSingle, setImageShowSingle] = useState(false)
  const [uploadedFile, setUplodedFile] = useState({ url: "", type: "" });

  const SingleView = useCallback((file) => {
    const fileType = file.url
      ? file.url.endsWith(".pdf")
        ? "pdf"
        : "image"
      : file.type && file.type.includes("application/pdf")
        ? "image"
        : "pdf";

    const fileUrl = file.url || URL.createObjectURL(file);
    setUplodedFile({ url: fileUrl, type: fileType });
    setImageShowSingle(true);
    setImagesingle(1);

    const modalElement = document.querySelector('.MuiModal-root');
    if (modalElement && modalElement.hasAttribute('aria-hidden') && modalElement.getAttribute('aria-hidden') === 'true') {
      document.activeElement.blur();
    }
  }, []);

  const CloseSingleFile = useCallback(() => {
    setImagesingle(0)
    setImageShowSingle(false)
  }, [])

  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(false);

  const submitForm = async () => {
    if (loadingRef.current || isLoading) return;
    if (condemformPrefix === null) {
      infoNotify("Enter Form Number ");
      return;
    }
    loadingRef.current = true;
    setIsLoading(true);
    try {
      const spareItems = itemList.filter(item => item.am_spare_item_map_slno !== undefined);
      const assetItems = itemList.filter(item => item.am_item_map_slno !== undefined);
      const patchdata = {
        condem_mast_slno: condemMastslno,
        condem_form_prefix: condemformPrefix,
        condem_form_no: condemMastslno,
        edit_user: empId,
        condem_status: 1,
        req_dept: empdept
      };

      await FormUpdate(patchdata);
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
      succesNotify("Form Submitted Successfully");
      queryClient.invalidateQueries('getAssetsUnderCondmnation');
      queryClient.invalidateQueries('getSparesUnderCondmnation');
      CloseModal();
    } catch (error) {
      infoNotify("An error occurred while submitting the form.");
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadingRef.current = false;
  }, []);

  const FormUpdate = async (patchdata) => {
    try {
      const result = await axioslogin.patch('/AssetCondemnation/updateCondemMasterData', patchdata);
      const { success, message } = result.data;
      if (success !== 2) {
        throw new Error(message || "Failed to update master data.");
      }

    } catch (error) {
      infoNotify(error.message);
      throw error;
    }
  };

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

  const [AssetOpenModal, setAssetOpenModal] = useState(false)
  const [AssetModalFlag, setAssetModalFlag] = useState(0)
  const [AssetDetails, setAssetDetails] = useState([])

  const AssetDetailsView = useCallback((val) => {
    setAssetOpenModal(true)
    setAssetDetails(val)
    setAssetModalFlag(1)
  }, [])



  return (
    <Box>
      <CssVarsProvider>
        {addModalFlag === 1 ?
          <Box>
            <AddDetailOnItem addModalOpen={addModalOpen}
              setaddModalOpen={setaddModalOpen}
              setaddModalFlag={setaddModalFlag}
              itemDetails={itemDetails}
              empId={empId}
              condemMastslno={condemMastslno}
              setcount={setcount}
              count={count}
              setcondemCount={setcondemCount}
              condemCount={condemCount}
            />
          </Box>
          : null}
        {AssetModalFlag === 1 ?
          <Box>
            <AssetDetailsModal
              AssetOpenModal={AssetOpenModal}
              setAssetOpenModal={setAssetOpenModal}
              AssetModalFlag={AssetModalFlag}
              setAssetModalFlag={setAssetModalFlag}
              AssetDetails={AssetDetails}

            />
          </Box>
          : null}

        {(keepinScarpModalFlag === 1 || keepinScarpModalFlag === 2) && (
          <KeepInDeptScrapStoreModal
            keepinScarpModalOpen={keepinScarpModalOpen}
            setkeepinScarpModalOpen={setkeepinScarpModalOpen}
            setkeepinScarpModalFlag={setkeepinScarpModalFlag}
            detailsofItem={detailsofItem}
            empId={empId}
            keepinScarpModalFlag={keepinScarpModalFlag}
            setCheckedItems={setCheckedItems}
            currentIndex={currentIndex}
            setcurrentIndex={setcurrentIndex}
            queryClient={queryClient}
            condemMastslno={condemMastslno}

          />
        )}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pl: 1,
            borderRadius: 10,
            zIndex: 1300,
          }}
        >
          <ModalDialog variant="outlined" sx={{ width: "95vw", p: 0, overflow: "auto" }}>

            <Box sx={{ border: .1, borderColor: taskColor.lightpurple, m: 1, height: '99%' }}>
              <Box sx={{ flex: 1, display: 'flex', ml: 1, }}>
                <Box sx={{ flex: 1 }}>
                  <TextComponent
                    text={"Condemnation Request Form"}
                    sx={{ fontWeight: 600, color: taskColor.darkPurple, pl: .8, pt: 1, fontSize: 21 }}
                  />
                </Box>
                <Box sx={{ pr: 1, pt: 1, }}>
                  <CancelIcon sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }} onClick={CloseModal} />
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 1, mt: 2 }}>
                <Box>
                  <TextComponent
                    text={
                      <>
                        Form No.<span style={{ color: "#74112F", fontSize: 15 }}>*</span>
                      </>
                    }
                    sx={{ fontWeight: 400, pl: 0.5, color: "black" }} />
                  <Input
                    style={{ width: 200 }}
                    type="text"
                    value={`${condemformPrefix}/${condemMastslno}`}
                    name="FromNo"
                    readOnly
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 1, mx: 1, mt: 2, }}>
                <Box sx={{ flex: 1, fontWeight: 600, pl: 1 }}>
                  Item List
                </Box>
                <Table
                  borderAxis="both"
                  size="sm"
                  sx={{
                    '& thead th': {
                      backgroundColor: taskColor.lightpurple,
                      color: '#444',
                      fontWeight: 600,
                      fontSize: 14,
                    },
                    '& tbody td': {
                      fontSize: 14,
                      color: '#444',
                      fontWeight: 600,
                    },
                  }}
                >
                  <thead>
                    <tr style={{ borderRadius: 0 }}>
                      <th style={{ width: 40, textAlign: 'center' }}>#</th>
                      <th style={{ width: 135, textAlign: 'center' }}>Keep in Dept Store</th>
                      <th style={{ width: 120, textAlign: 'center' }}>Asset/Spare No.</th>
                      <th style={{ width: 'auto', textAlign: 'center' }}>Category</th>
                      <th style={{ width: 'auto', textAlign: 'center' }}>Item Name</th>
                      <th style={{ width: 'auto', textAlign: 'center' }}>Department Section</th>
                      <th style={{ width: 'auto', textAlign: 'center' }}>Location</th>
                      <th style={{ width: 'auto', textAlign: 'center' }}>Serial No.</th>
                      <th style={{ width: 160, textAlign: 'center' }}>Item Purchase Value</th>
                      <th style={{ width: 100, textAlign: 'center' }}>Ticket No.</th>
                      <th style={{ width: 'auto', textAlign: 'center' }}>Condem Reason</th>
                      <th style={{ width: 60, textAlign: 'center' }}>Details</th>
                      <th style={{ width: 50, textAlign: 'center' }}>Add</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemList?.map((val, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: 'white',
                          maxHeight: 300
                        }}
                      >
                        <td style={{ width: 40, textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ width: 150, textAlign: 'center' }}>
                          <Checkbox
                            checked={checkedItems[index] || false}
                            onChange={(e) => handleOpen(e, index, val)}
                          />
                        </td>

                        <td style={{ width: 120, textAlign: 'center' }}>
                          {val.spare_asset_no
                            ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                            : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`}
                        </td>

                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.cat_asset_name
                            ? val.cat_asset_name
                            : val.cat_spare_name ?
                              val.cat_spare_name :
                              val.category_name || ''}
                        </td>
                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.item_asset_name
                            ? val.item_asset_name
                            : val.item_spare_name ?
                              val.item_spare_name :
                              val.item_name || ''}
                        </td>
                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.sec1_name
                            ? val.sec1_name
                            : val.sec2_name ?
                              val.sec2_name
                              : val.ticket_reg_location || ''}
                        </td>
                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.ticket1_location || val.ticket1_block || val.ticket1_floor || val.ticket1_roomname || val.ticket1_roomtype || val.cm_complaint_location ? (
                            <span>
                              {val.cm_complaint_location && val.cm_complaint_location}
                              {val.ticket1_location && val.ticket1_block && " - "}
                              {val.ticket1_block && <>{val.ticket1_block}</>}
                              {(val.ticket1_block || val.ticket1_location) && val.ticket1_floor && " - "}
                              {val.ticket1_floor && <>{val.ticket1_floor}</>}
                              {(val.ticket1_floor || val.ticket1_block || val.ticket1_location) && val.ticket1_roomname && " - "}
                              {val.ticket1_roomname && <>{val.ticket1_roomname}</>}
                              {(val.ticket1_roomname || val.ticket1_floor || val.ticket1_block || val.ticket1_location) && val.ticket1_roomtype && " - "}
                              {val.ticket1_roomtype && <>{val.ticket1_roomtype}</>}
                              {val.ticket1_location && <>{val.ticket1_location}</>}
                            </span>
                          ) : (
                            <>{"Not Updated"}</>
                          )}

                        </td>
                        <td style={{ width: 120, textAlign: 'center' }}>{val.am_manufacture_no || ''}</td>
                        <td style={{ width: 160, textAlign: 'center' }}>
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                          }).format(val.am_bill_amount)}
                        </td>
                        <td style={{ width: 100, textAlign: 'center' }}>{val.complaint_slno}</td>
                        {/* <td style={{ width: 'auto', textAlign: 'center', fontSize: 12 }}>{val.ticket_reg_location}</td> */}
                        {/* <td style={{ width: 'auto', textAlign: 'center', fontSize: 12 }}>
                          {val.rm_room_name}
                          {(val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name) ? (
                            ` (${val.rm_roomtype_name || ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name || ''}${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''}${val.rm_floor_name || ''})`
                          ) : (
                            val.cm_complaint_location || " "
                          )}
                        </td> */}
                        <td style={{ width: 'auto', textAlign: 'center', }}>{val.condm_transf_remarks}</td>
                        <td style={{ width: 60, textAlign: 'center' }}>
                          <MoreIcon sx={{ cursor: 'pointer', color: '#41729F' }} onClick={() => AssetDetailsView(val)} />
                        </td>
                        <td style={{ width: 50, textAlign: 'center' }}>
                          <AddCircleIcon sx={{ cursor: 'pointer', color: '#A45C40' }} onClick={() => AddDetailsModal(val)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>

              {/* {CondemData?.some(
                item =>
                  item?.keep_inscarp_status === 1 ||
                  (addedCondemFiles?.[item.am_condem_detail_slno]?.length > 0)
              ) && (
                  <Box sx={{ flex: 1, mx: 1, mt: 1, pb: 0.5 }}>
                    <TextComponent
                      text={"Item Details and Attachments"}
                      sx={{ fontWeight: 500, color: taskColor.darkPurple, pl: 0.8, pt: 0.5, fontSize: 15 }}
                    />

                    {CondemData?.map((val, index) => (
                      <Box
                        key={index}
                        sx={{ flex: 1, mx: 0.5, border: 1, borderColor: 'lightgray', mt: 0.5, p: 0.5 }}
                      >
                        {val.keep_inscarp_status === 1 ?
                          <Box sx={{ flex: 1, display: 'flex', bgcolor: taskColor.lightYellow, pl: .5 }}>
                            <DirectionsIcon sx={{ color: 'black', }} />
                            <Box sx={{ fontWeight: 600, pl: .5, color: 'black' }}>
                              Keeped In Department Scrap Store :
                            </Box>
                            <Box sx={{ pl: 1, fontWeight: 600, fontsize: 12, color: 'black' }}>
                              {val.keep_in_srap_store_reason}
                            </Box>
                          </Box>
                          : null}
                        <Box sx={{ flex: 1, display: 'flex' }}>
                          <TextComponent
                            text={
                              val.spare_asset_no
                                ? `${val.spare_asset_no}/${val.spare_asset_no_only.toString().padStart(6, '0')}`
                                : `${val.item_asset_no}/${val.item_asset_no_only.toString().padStart(6, '0')}`
                            }
                            sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                          <TextComponent
                            text={`(${val.cat_asset_name !== null ? val.cat_asset_name : val.cat_spare_name !== null ? val.cat_spare_name : ''})`}
                            sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                          <TextComponent
                            text={val.item_asset_name !== null ? val.item_asset_name : val.item_spare_name !== null ? val.item_spare_name : ''}
                            sx={{ fontWeight: 500, color: '#0C2D48', pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                        </Box>
                        {val.am_condem_reason === null ?
                          null :
                          <Box sx={{ flex: 1, display: 'flex' }}>
                            <TextComponent
                              text={"Reason :"}
                              sx={{ fontWeight: 500, color: 'black', pl: 0.8, pt: 0.5, fontSize: 14 }}
                            />
                            <TextComponent
                              text={val.am_condem_reason || null}
                              sx={{ color: 'black', pl: 0.8, pt: 0.5, fontSize: 14 }}
                            />
                          </Box>}
                        <Box sx={{ flex: 1, mr: 1, my: 0.5, ml: 0.5 }}>
                          {imageShowsingleFlag === 1 && (
                            <Box>
                              <FileViewSingle previewFile={uploadedFile} imageShow={imageShowSingle} CloseFile={CloseSingleFile} />
                            </Box>
                          )}
                          {addedCondemFiles[val.am_condem_detail_slno]?.length > 0 && (
                            <Grid container spacing={0.5} sx={{ gap: .5 }}>
                              {addedCondemFiles[val.am_condem_detail_slno].map((url, fileIndex) => {
                                if (!url || typeof url !== "string") return null;
                                const isPdf = url.toLowerCase().endsWith(".pdf");
                                const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(url);

                                return (
                                  <Box key={fileIndex} sx={{ display: "flex" }}>
                                    {isImage ? (
                                      <Box sx={{ display: "flex", border: 0.5, borderColor: "#E0E1E3", mr: 0.5 }}>
                                        <Box sx={{ p: 0.5 }}>
                                          <img
                                            src={url}
                                            alt={`Complaint file ${fileIndex}`}
                                            style={{
                                              width: 48,
                                              height: 48,
                                              color: "#e53935",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => SingleView({ url })}
                                          />
                                        </Box>
                                        <Box
                                          sx={{
                                            fontSize: 12,
                                            color: "#333",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            width: 90,
                                            pt: 2,
                                          }}
                                        >
                                          {url.split("/").pop() || "N/A"}
                                        </Box>
                                      </Box>
                                    ) : isPdf ? (
                                      <Box sx={{ display: "flex", border: 0.5, borderColor: "#E0E1E3", mr: 0.5 }}>
                                        <PictureAsPdfIcon
                                          sx={{
                                            width: 48,
                                            height: 48,
                                            color: "#e53935",
                                            cursor: "pointer",
                                            mt: 0.5,
                                          }}
                                          onClick={() => SingleView({ url })}
                                        />
                                        <Box
                                          sx={{
                                            fontSize: 12,
                                            color: "#333",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            width: 90,
                                            pt: 2,
                                          }}
                                        >
                                          {url.split("/").pop() || "N/A"}
                                        </Box>
                                      </Box>
                                    ) : (
                                      <InsertDriveFileIcon
                                        sx={{
                                          width: 50,
                                          height: 50,
                                          color: "#e53935",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => SingleView({ url })}
                                      />
                                    )}
                                  </Box>
                                );
                              })}
                            </Grid>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )} */}

              {(CondemData?.some(
                item => item.am_condem_reason !== null || item.keep_inscarp_status === 1
              ) ||
                Object.keys(addedCondemFiles).length > 0) && (
                  <Box sx={{ flex: 1, border: 1, borderColor: "lightgray", mx: 1, mt: 1, pb: 0.5 }}>
                    <TextComponent
                      text={"Item Details and Attachments"}
                      sx={{ fontWeight: 500, color: taskColor.darkPurple, pl: 0.8, pt: 0.5, fontSize: 15 }}
                    />

                    {CondemData?.filter(
                      val =>
                        val.am_condem_reason !== null ||
                        val.keep_inscarp_status === 1 ||
                        (addedCondemFiles[val.am_condem_detail_slno]?.length > 0)
                    ).map((val, index) => (
                      <Box
                        key={index}
                        sx={{ flex: 1, mx: 0.5, border: 1, borderColor: "lightgray", mt: 0.5, p: 0.5 }}
                      >
                        {val.keep_inscarp_status === 1 && (
                          <Box sx={{ flex: 1, bgcolor: "#F7F9A7", pl: 0.5 }}>
                            <Box sx={{ display: "flex", }}>
                              <DirectionsIcon sx={{ color: "black" }} />
                              <Box sx={{ fontWeight: 600, pl: 0.5, color: "black" }}>
                                Keeped In Department Sort Store :
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                p: 1,
                                fontWeight: 600,
                                fontSize: 12,
                                color: "black"
                              }}
                            >
                              {val.keep_in_srap_store_reason}
                            </Box>
                          </Box>
                        )}

                        {/* Asset Info */}
                        <Box sx={{ flex: 1, display: "flex" }}>
                          <TextComponent
                            text={
                              val.spare_asset_no
                                ? `${val.spare_asset_no}/${val.spare_asset_no_only
                                  .toString()
                                  .padStart(6, "0")}`
                                : `${val.item_asset_no}/${val.item_asset_no_only
                                  .toString()
                                  .padStart(6, "0")}`
                            }
                            sx={{ fontWeight: 500, color: "#0C2D48", pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                          <TextComponent
                            text={`(${val.cat_asset_name ??
                              val.cat_spare_name ??
                              ""
                              })`}
                            sx={{ fontWeight: 500, color: "#0C2D48", pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                          <TextComponent
                            text={val.item_asset_name ?? val.item_spare_name ?? ""}
                            sx={{ fontWeight: 500, color: "#0C2D48", pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                        </Box>

                        {/* Reason */}
                        <Box sx={{ flex: 1, display: "flex" }}>
                          <TextComponent
                            text={"Reason :"}
                            sx={{ fontWeight: 500, color: "black", pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                          <TextComponent
                            text={val.am_condem_reason || ""}
                            sx={{ color: "black", pl: 0.8, pt: 0.5, fontSize: 14 }}
                          />
                        </Box>

                        {/* Attachments */}
                        <Box sx={{ flex: 1, mr: 1, my: 0.5, ml: 0.5 }}>
                          {imageShowsingleFlag === 1 && (
                            <FileViewSingle
                              previewFile={uploadedFile}
                              imageShow={imageShowSingle}
                              CloseFile={CloseSingleFile}
                            />
                          )}

                          {addedCondemFiles[val.am_condem_detail_slno]?.length > 0 && (
                            <Grid container spacing={0.5}>
                              {addedCondemFiles[val.am_condem_detail_slno].map((file, fileIndex) => {
                                if (!file || !file.url) return null;

                                const { url, imageName } = file;
                                const isPdf = imageName.toLowerCase().endsWith(".pdf");
                                const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(imageName);

                                return (
                                  <Box key={fileIndex} sx={{ display: "flex" }}>
                                    {isImage ? (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          border: 0.5,
                                          borderColor: "#E0E1E3",
                                          mr: 0.5
                                        }}
                                      >
                                        <Box sx={{ p: 0.5 }}>
                                          <img
                                            src={url}
                                            alt={imageName}
                                            style={{
                                              width: 48,
                                              height: 48,
                                              cursor: "pointer"
                                            }}
                                            onClick={() => SingleView({ url })}
                                          />
                                        </Box>
                                        <Box
                                          sx={{
                                            fontSize: 12,
                                            color: "#333",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            width: 90,
                                            pt: 2
                                          }}
                                        >
                                          {imageName}
                                        </Box>
                                      </Box>
                                    ) : isPdf ? (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          border: 0.5,
                                          borderColor: "#E0E1E3",
                                          mr: 0.5
                                        }}
                                      >
                                        <PictureAsPdfIcon
                                          sx={{
                                            width: 48,
                                            height: 48,
                                            color: "#e53935",
                                            cursor: "pointer",
                                            mt: 0.5
                                          }}
                                          onClick={() => SingleView({ url })}
                                        />
                                        <Box
                                          sx={{
                                            fontSize: 12,
                                            color: "#333",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            width: 90,
                                            pt: 2
                                          }}
                                        >
                                          {imageName}
                                        </Box>
                                      </Box>
                                    ) : (
                                      <InsertDriveFileIcon
                                        sx={{
                                          width: 50,
                                          height: 50,
                                          color: "#e53935",
                                          cursor: "pointer"
                                        }}
                                        onClick={() => SingleView({ url })}
                                      />
                                    )}
                                  </Box>
                                );
                              })}
                            </Grid>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

              <Box sx={{
                bottom: 0,
                left: 0,
                textAlign: 'right',
                py: 1,
                mr: 2,
              }}>
                <Button
                  variant='outlined'
                  sx={buttonStyle}
                  onClick={submitForm}
                >Submit</Button>
                <Button
                  variant='outlined'
                  sx={buttonStyle}
                  onClick={CloseModal}
                >Cancel</Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider >

    </Box >
  )
}

export default memo(CondemSubmitionModal)