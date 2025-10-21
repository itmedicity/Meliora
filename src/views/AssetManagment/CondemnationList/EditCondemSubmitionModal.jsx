import { Box, Button, Checkbox, CssVarsProvider, Grid, Input, Modal, ModalDialog, Table, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { getCondemAddedDetails, getItemUnderForm } from 'src/api/AssetApis'
import TextComponent from 'src/views/Components/TextComponent'
import AddDetailOnItem from './AddDetailOnItem'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete';
import FileViewSingle from 'src/views/Components/FileViewSingle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DirectionsIcon from '@mui/icons-material/Directions';
import AssetDetailsModal from './AssetDetailsView/AssetDetailsModal'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { taskColor } from 'src/color/Color'
import KeepInDeptScrapStoreModal from './KeepInDeptScrapStoreModal'
import { fetchFilesFromZipWithFolder } from 'src/api/FileViewWithFolderFn'
import MoreIcon from '@mui/icons-material/More';


const EditCondemSubmitionModal = ({ modalEditOpen, setmodalEditOpen, setmodalEditFlag, empId, formDetails, setAddmoreItemFlag, queryClient }) => {

  const { condem_mast_slno, condem_form_prefix, condem_form_no, reg_date, req_dpt_name } = formDetails
  const [condemCount, setcondemCount] = useState(0)
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [addModalFlag, setaddModalFlag] = useState(0)
  const [itemDetails, setitemDetails] = useState([])
  const [checkedItems, setCheckedItems] = useState({});
  const [addedCondemFiles, setaddedCondemFiles] = useState([])
  const [detailsofItem, setdetailsofItem] = useState([])
  const [currentIndex, setcurrentIndex] = useState('')
  const [keepinScarpModalFlag, setkeepinScarpModalFlag] = useState(0)
  const [keepinScarpModalOpen, setkeepinScarpModalOpen] = useState(false)

  const postCondemSlno = useMemo(() => {
    return {
      condemMastslno: condem_mast_slno,
    }
  }, [condem_mast_slno])

  const [count, setcount] = useState(0)
  const { data: itemUnderForm } = useQuery({
    queryKey: ['getItemUnderForm', count],
    queryFn: () => getItemUnderForm(postCondemSlno),
    enabled: condem_mast_slno !== undefined,
  })

  const AddDetailsModal = useCallback((val) => {
    setaddModalFlag(1)
    setaddModalOpen(true)
    setitemDetails(val)
  }, [setaddModalFlag, setaddModalOpen])

  const CloseModal = useCallback(() => {
    setmodalEditOpen(false)
    setmodalEditFlag(0)
  }, [setmodalEditOpen, setmodalEditFlag])

  const buttonStyle = {
    fontSize: 16,
    color: '#523A28',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#523A28',
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  }


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

  const { data: CondemData } = useQuery({
    queryKey: ['getCondemAddedDetails', count],
    queryFn: () => getCondemAddedDetails(postCondemSlno),
    enabled: condem_mast_slno !== undefined,
  })

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
  const [AssetOpenModal, setAssetOpenModal] = useState(false)
  const [AssetModalFlag, setAssetModalFlag] = useState(0)
  const [AssetDetails, setAssetDetails] = useState([])


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

  const AddMoreItems = useCallback(() => {
    setmodalEditOpen(false)
    setmodalEditFlag(0)
    setAddmoreItemFlag(1)
  }, [])





  const AssetDetailsView = useCallback((val) => {
    setAssetOpenModal(true)
    setAssetDetails(val)
    setAssetModalFlag(1)
  }, [])


  return (
    <CssVarsProvider>
      {addModalFlag === 1 ?
        <Box>
          <AddDetailOnItem addModalOpen={addModalOpen}
            setaddModalOpen={setaddModalOpen}
            setaddModalFlag={setaddModalFlag}
            itemDetails={itemDetails}
            empId={empId}
            condemMastslno={condem_mast_slno}
            setcount={setcount}
            count={count}
            setcondemCount={setcondemCount}
            condemCount={condemCount}
          />
        </Box> : null}
      {AssetModalFlag === 1 ?
        <Box>
          <AssetDetailsModal
            AssetOpenModal={AssetOpenModal}
            setAssetOpenModal={setAssetOpenModal}
            AssetModalFlag={AssetModalFlag}
            setAssetModalFlag={setAssetModalFlag}
            AssetDetails={AssetDetails}
          />
        </Box> : null}

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
          condemMastslno={condem_mast_slno}

        />
      )}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalEditOpen}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
        <ModalDialog variant="outlined" sx={{ width: '95vw', p: 0, overflow: 'auto', }}>
          <Box sx={{ border: .1, borderColor: '#E8E6E5', m: 1, height: '100%' }}>
            <Box sx={{ flex: 1, display: 'flex', ml: 1, }}>
              <Box sx={{ flex: 1 }}>
                <TextComponent
                  text={"Condemnation Request Form"}
                  sx={{ fontWeight: 600, color: taskColor.darkPurple, pl: .8, pt: 1, fontSize: 21 }}
                />
                <TextComponent
                  text={req_dpt_name}
                  sx={{ fontWeight: 500, color: taskColor.darkPurple, pl: .8, fontSize: 13 }}
                />
              </Box>
              <Box sx={{ pr: 1, pt: 1, }}>
                <CancelIcon sx={{ width: 30, height: 30, color: taskColor.darkPurple, cursor: 'pointer' }} onClick={CloseModal} />
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 1, mt: 2 }}>
              <Box >
                <TextComponent
                  text={"Request Date"}
                  sx={{ fontWeight: 400, pl: .5, color: 'Black' }} />
                <Input
                  style={{ width: 200 }}
                  name="reg_date"
                  value={reg_date
                    ? format(new Date(reg_date), 'dd MMM yyyy,  hh:mm a')
                    : 'Invalid Date'}
                  readOnly
                />
              </Box>
              <Box>
                <TextComponent
                  text={
                    <>
                      Form No.<span style={{ color: "#74112F", fontSize: 15 }}>*</span>
                    </>
                  }
                  sx={{ fontWeight: 400, pl: 0.5, color: "black" }}
                />
                <Input
                  style={{ width: 200 }}
                  type="text"
                  value={`${condem_form_prefix}/${condem_form_no}`}
                  name="FromNo"
                  readOnly
                />
              </Box>

            </Box>
            <Box sx={{ flex: 1, mx: 1, mt: 2, }}>
              <Box sx={{ flex: 1, display: 'flex' }}>
                <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600, pl: .3, pt: 1 }}>
                  Item List
                </Box>
                <Box sx={{
                  height: 25, border: 1, borderRadius: 4, px: 1, my: .5, mr: .2, fontSize: 13, pt: .3, cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'white',
                    color: '#523A28',
                  },
                }} onClick={AddMoreItems} >
                  Add More Items +
                </Box>
              </Box>
              <Table
                borderAxis="both"
                size="sm"
                style={{
                  '& thead th': {
                    backgroundColor: taskColor.lightpurple,
                    color: '#444',
                    fontWeight: 600,
                    fontSize: 14,
                  }
                }}
              >
                <thead >
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
                    <th style={{ width: 50, textAlign: 'center' }}>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {itemUnderForm?.map((val, index) => {
                    const billamount = val.asset_bill_amount
                      ? val.asset_bill_amount
                      : val.spare_bill_amount
                        ? val.spare_bill_amount
                        : '';

                    return (
                      <tr
                        key={index}
                      >
                        <td style={{ width: 40, textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ width: 150, textAlign: 'center' }}>
                          <Checkbox
                            checked={checkedItems[index] ?? (val.keep_inscarp_status === 1)}
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
                            : val.cat_spare_name || ''}
                        </td>
                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.item_asset_name
                            ? val.item_asset_name
                            : val.item_spare_name || ''}
                        </td>
                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.sec1_name
                            ? val.sec1_name
                            : val.sec2_name || ''}
                        </td>
                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.ticket1_location || val.ticket1_block || val.ticket1_floor || val.ticket1_roomname || val.ticket1_roomtype ? (
                            <span>
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


                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.asset_am_manufacture_no || val.spare_am_manufacture_no || ''}
                        </td>
                        <td style={{ width: 100, textAlign: 'center' }}>
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                          }).format(billamount)}
                        </td>
                        <td style={{ width: 100, textAlign: 'center' }} >
                          {val.asset_complaint_slno
                            ? val.asset_complaint_slno
                            : val.spare_complaint_slno
                              ? val.spare_complaint_slno
                              : ''}
                        </td>
                        <td style={{ width: 'auto', textAlign: 'center' }}>
                          {val.asset_condm_transf_remarks
                            ? val.asset_condm_transf_remarks
                            : val.spare_condm_transf_remarks
                              ? val.spare_condm_transf_remarks
                              : ''}
                        </td>
                        <td style={{ width: 60, textAlign: 'center' }}>
                          <MoreIcon
                            sx={{ cursor: 'pointer', color: '#41729F' }}
                            onClick={() => AssetDetailsView(val)}
                          />
                        </td>
                        <td style={{ width: 50, textAlign: 'center' }}>
                          <AddCircleIcon
                            sx={{ cursor: 'pointer', color: '#A45C40' }}
                            onClick={() => AddDetailsModal(val)}
                          />
                        </td>
                        <td style={{ width: 50, textAlign: 'center' }}>
                          <Tooltip sx={{ width: 250 }}
                            placement='left'
                            title={"Clicking on the  item will result in its removal from the list and it will be added to the condemnation list."}>
                            <DeleteIcon
                              sx={{ cursor: 'pointer', color: 'darkred' }}
                            // onClick={() => RemoveItems(val)}
                            />
                          </Tooltip>

                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Box>
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
              backgroundColor: 'white',
            }}>
              <Button
                variant='outlined'
                sx={buttonStyle}
                onClick={CloseModal}
              >Cancel</Button>
            </Box>
          </Box>

        </ModalDialog>
      </Modal >
    </CssVarsProvider >
  )
}

export default memo(EditCondemSubmitionModal)