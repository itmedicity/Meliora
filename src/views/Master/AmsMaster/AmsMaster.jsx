import { Box, Checkbox, CircularProgress, CssVarsProvider, Option, Select } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import CusIconButton from 'src/views/Components/CusIconButton'
import AntibioticMasterTable from './AntibioticMasterTable'
import AntibioticFromEllider from './AntibioticFromEllider'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';


const AmsMaster = () => {

  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const queryClient = useQueryClient()
  const history = useHistory()
  const [antibioticSearch, setAntibioticSearch] = useState('')
  const [antibioticOpen, setantibioticOpen] = useState(0)
  const [antibioticList, setAntibioticList] = useState([])
  const [loading, setLoading] = useState(false)
  const [editFlag, setEditFlag] = useState(0)
  const [formData, setFormData] = useState({
    ams_mast_slno: '',
    itemCode: '',
    itemDescription: '',
    composition: '',
    vedAnalysis: '',
    dosageForm: '',
    itemStrip: '',
    pregnancyCategory: '',
    storageCondition: '',
    mrp: '',
    manufacturer: '',
  })

  const {
    itemCode,
    itemDescription,
    composition,
    vedAnalysis,
    dosageForm,
    itemStrip,
    pregnancyCategory,
    storageCondition,
    mrp,
    manufacturer,
    ams_mast_slno
  } = formData

  const [checkboxState, setCheckboxState] = useState({
    antibiotic: true,
    inactive: false,
    restricted: false,
    stoppedMedicine: false,
    highRisk: false,
    status: true,
  });

  const { antibiotic,
    inactive,
    restricted,
    stoppedMedicine,
    highRisk,
    status } = checkboxState

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const updateAntibioticSearch = useCallback((e) => {
    setAntibioticSearch(e.target.value.toUpperCase())
  }, [])

  const RefreshAntibiotic = useCallback(() => {
    setFormData({
      ams_mast_slno: '',
      itemCode: '',
      itemDescription: '',
      composition: '',
      vedAnalysis: '',
      dosageForm: '',
      itemStrip: '',
      pregnancyCategory: '',
      storageCondition: '',
      mrp: '',
      manufacturer: ''
    })
    setCheckboxState({
      antibiotic: true,
      inactive: false,
      restricted: false,
      stoppedMedicine: false,
      highRisk: false,
      status: true,
    })
    setAntibioticList([])
    setantibioticOpen(0)
    setEditFlag(0)
  }, [])

  const searchdata = useMemo(() => {
    return {
      itc_desc: antibioticSearch,
    }
  }, [antibioticSearch])

  const antibioticData = useCallback((val) => {
    const { ITC_DESC, ITN_ORIGINALMRP, ITN_STRIP, IT_CODE, MFC_DESC } = val
    setFormData({
      itemCode: IT_CODE,
      itemDescription: ITC_DESC,
      itemStrip: ITN_STRIP,
      mrp: ITN_ORIGINALMRP,
      manufacturer: MFC_DESC,
    })
  }, [])

  const editMast = useCallback((val) => {
    setEditFlag(1)
    const { ams_mast_slno, antibiotic, composition_volume, dosage_form, high_risk, inactive, itc_desc, item_code, item_mrp, manufacturer, pregnancy_category,
      restricted, status, stopped_medicine, storage_condition, strip, vital_essential, } = val
    setFormData({
      ams_mast_slno: ams_mast_slno || "",
      itemCode: item_code || "",
      itemDescription: itc_desc || "",
      composition: composition_volume || "",
      vedAnalysis: vital_essential || "",
      dosageForm: dosage_form || "",
      itemStrip: strip || "",
      pregnancyCategory: pregnancy_category || "",
      storageCondition: storage_condition || "",
      mrp: item_mrp || "",
      manufacturer: manufacturer || "",
    })
    setCheckboxState({
      antibiotic: antibiotic === 1 ? true : false,
      inactive: inactive === 1 ? true : false,
      restricted: restricted === 1 ? true : false,
      stoppedMedicine: stopped_medicine === 1 ? true : false,
      highRisk: high_risk === 1 ? true : false,
      status: status === 1 ? true : false,

    })
  }, [])

  const SearchAntibiotic = useCallback(() => {
    const getAntibioticData = async (searchdata) => {
      setLoading(true)
      try {
        const result = await axiosellider.post('/amsAntibiotic/getAntibiotic', searchdata)
        const { success, data } = result.data
        if (success === 1) {
          setantibioticOpen(1)
          setAntibioticList(data)
        } else {
          warningNotify('No Antibiotic Found')
          setAntibioticList([])
          setantibioticOpen(0)
        }
      } catch (error) {
        warningNotify('Error fetching data')
        setAntibioticList([])
        setantibioticOpen(0)
      } finally {
        setLoading(false)
      }
    }
    getAntibioticData(searchdata)
  }, [searchdata])

  const ResetAntibioticSearch = useCallback(() => {
    setantibioticOpen(0)
    setAntibioticSearch('')
    setEditFlag(1)
  }, [])

  const insertData = useMemo(() => {
    return {
      item_code: itemCode,
      itc_desc: itemDescription,
      composition_volume: composition,
      vital_essential: vedAnalysis,
      dosage_form: dosageForm,
      strip: itemStrip,
      pregnancy_category: pregnancyCategory,
      storage_condition: storageCondition,
      item_mrp: mrp,
      manufacturer: manufacturer,
      restricted: restricted === true ? 1 : 0,
      inactive: inactive === true ? 1 : 0,
      stopped_medicine: stoppedMedicine === true ? 1 : 0,
      high_risk: highRisk === true ? 1 : 0,
      antibiotic: antibiotic === true ? 1 : 0,
      status: status === true ? 1 : 0,
      create_user: id
    }
  }, [itemCode,
    itemDescription,
    composition,
    vedAnalysis,
    dosageForm,
    itemStrip,
    pregnancyCategory,
    storageCondition,
    mrp,
    manufacturer,
    antibiotic,
    inactive,
    restricted,
    stoppedMedicine,
    highRisk,
    status,
    id])

  const updateData = useMemo(() => {
    return {
      item_code: itemCode,
      itc_desc: itemDescription,
      composition_volume: composition,
      vital_essential: vedAnalysis,
      dosage_form: dosageForm,
      strip: itemStrip,
      pregnancy_category: pregnancyCategory,
      storage_condition: storageCondition,
      item_mrp: mrp,
      manufacturer: manufacturer,
      restricted: restricted === true ? 1 : 0,
      inactive: inactive === true ? 1 : 0,
      stopped_medicine: stoppedMedicine === true ? 1 : 0,
      high_risk: highRisk === true ? 1 : 0,
      antibiotic: antibiotic === true ? 1 : 0,
      status: status === true ? 1 : 0,
      edit_user: id,
      ams_mast_slno: ams_mast_slno,
    }
  }, [itemCode,
    itemDescription,
    composition,
    vedAnalysis,
    dosageForm,
    itemStrip,
    pregnancyCategory,
    storageCondition,
    mrp,
    manufacturer,
    antibiotic,
    inactive,
    restricted,
    stoppedMedicine,
    highRisk,
    status,
    id,
    ams_mast_slno])

  const SubmitAntibiotic = useCallback(async () => {
    try {
      let result;
      if (editFlag === 1) {
        result = await axioslogin.patch('/amsAntibiotic/update', updateData);
      } else {
        result = await axioslogin.post('/amsAntibiotic/insert', insertData);
      }
      const { success, message } = result.data;
      if (success === 1 || success === 2) {
        succesNotify(message);
        queryClient.invalidateQueries('getAllAntibioticList')
        RefreshAntibiotic();
      } else {
        warningNotify(message || 'Not Updated');
      }
    } catch (error) {
      errorNotify("An error occurred while saving data.");
    }
  }, [insertData, updateData, editFlag, RefreshAntibiotic, queryClient]);

  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])

  return (
    <Box>
      <Box sx={{ bgcolor: '#eff3f6', flex: 1, height: 32, display: 'flex' }}>
        <Box sx={{ flex: 1, p: .5 }}>
          Antibiotic Master
        </Box>
        <CusIconButton
          size="sm"
          variant="outlined"
          color="primary"
          clickable="true"
          onClick={backtoSetting}
        >
          <CloseIcon fontSize="small" />
        </CusIconButton>
      </Box>
      <Box sx={{ flex: 1, p: 1 }}>



        <CssVarsProvider>


          <Box sx={{ display: 'flex', flex: 1, gap: 0.5 }}>
            <Box sx={{ minWidth: 500 }}>
              <TextFieldCustom
                type="text"
                size="sm"
                name="antibioticSearch"
                value={antibioticSearch || ''}
                onchange={updateAntibioticSearch}
                placeholder={'Find Antibiotic From Ellider'}
              ></TextFieldCustom>
            </Box>
            <CusIconButton
              size="sm"
              variant="outlined"
              color="primary"
              clickable="true"
              onClick={SearchAntibiotic}
            >
              <ManageSearchIcon fontSize="small" />
            </CusIconButton>
            <CusIconButton
              size="sm"
              variant="outlined"
              color="primary"
              clickable="true"
              onClick={ResetAntibioticSearch}
            >
              <RefreshIcon fontSize="small" />
            </CusIconButton>
          </Box>
          {loading === true ?
            <CircularProgress thickness={2} sx={{ mt: 1 }} /> :
            <>
              {antibioticOpen === 1 ? (
                <Box sx={{ flex: 1, mt: 0.5 }}>
                  <AntibioticFromEllider
                    antibioticList={antibioticList}
                    antibioticData={antibioticData}
                  />
                </Box>
              ) : null}
            </>}


          <Box sx={{ border: 1, borderColor: 'lightgrey', mt: 1, borderRadius: 3 }}>
            <Box sx={{ flex: 1, display: 'flex', flexWrap: 'wrap', pt: 2, gap: 1.2, pl: 1 }}>
              <Box sx={{ width: 100 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Item code</Box>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="itemCode"
                  value={itemCode}
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>

              <Box sx={{ width: 330 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Item describtion</Box>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="itemDescription"
                  value={itemDescription || ""}
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>

              <Box sx={{ width: 330 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Composition/volume</Box>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="composition"
                  value={composition || ""}
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>

              <Box sx={{ width: 150 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>VED Analysis</Box>
                <Box >
                  <Select
                    size="sm"
                    name="vedAnalysis"
                    value={vedAnalysis || ""}
                    onChange={(e, newValue) => {
                      setFormData(prev => ({
                        ...prev,
                        vedAnalysis: newValue,
                      }));
                    }}
                  >
                    <Option value="Vital">Vital</Option>
                    <Option value="Essential">Essential</Option>
                    <Option value="Desirable">Desirable</Option>
                  </Select>
                </Box>
              </Box>

              <Box sx={{ width: 300 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Dosage Form</Box>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="dosageForm"
                  value={dosageForm || ""}
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>

              <Box sx={{ width: 100 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Item Strip</Box>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="itemStrip"
                  value={itemStrip || ""}
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>

              <Box sx={{ width: 170 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Pregnancy Category</Box>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="pregnancyCategory"
                  value={pregnancyCategory || ""}
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>

              <Box sx={{ width: 250 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Storage Condition</Box>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="storageCondition"
                  value={storageCondition || ""}
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>

              <Box sx={{ width: 150 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Max Retail Price</Box>
                <TextFieldCustom
                  type="number"
                  size="sm"
                  name="mrp"
                  value={mrp || ""}
                  startDecorator="Rs"
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>

              <Box sx={{ width: 300 }}>
                <Box sx={{ fontSize: 15, pl: .5 }}>Manufacturer</Box>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="manufacturer"
                  value={manufacturer || ""}
                  onchange={handleInputChange}
                ></TextFieldCustom>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', pt: 2, pl: 1 }}>
              <Box sx={{ width: 120, }}>
                <Checkbox
                  label="Antibiotic"
                  name="antibiotic"
                  checked={antibiotic}
                  onChange={handleCheckboxChange}
                />
              </Box>

              <Box sx={{ width: 120, }}>
                <Checkbox
                  label="Inactive"
                  name="inactive"
                  checked={inactive}
                  onChange={handleCheckboxChange}
                />
              </Box>

              <Box sx={{ width: 120, }}>
                <Checkbox
                  label="Restricted"
                  name="restricted"
                  checked={restricted}
                  onChange={handleCheckboxChange}
                />
              </Box>
              <Box sx={{ width: 200, }}>
                <Checkbox
                  label="Stopped Medicine"
                  name="stoppedMedicine"
                  checked={stoppedMedicine}
                  onChange={handleCheckboxChange}

                />
              </Box>


              <Box sx={{ width: 120, }}>
                <Checkbox
                  label="High Risk"
                  name="highRisk"
                  checked={highRisk}
                  onChange={handleCheckboxChange}
                />
              </Box>


              <Box sx={{ width: 120, }}>
                <Checkbox
                  label="Status"
                  name="status"
                  checked={status}
                  onChange={handleCheckboxChange}
                />
              </Box>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', gap: .5, mt: 1, p: .5, bgcolor: '#fbfcfe' }}>
              <CusIconButton
                size="sm"
                variant="outlined"
                color="primary"
                clickable="true"
                onClick={SubmitAntibiotic}
              >
                <SaveIcon fontSize="small" />
              </CusIconButton>
              <CusIconButton
                size="sm"
                variant="outlined"
                color="primary"
                clickable="true"
                onClick={RefreshAntibiotic}
              >
                <RefreshIcon fontSize="small" />
              </CusIconButton>
            </Box>
          </Box>

          <Box sx={{ flex: 1, }}>
            <AntibioticMasterTable editMast={editMast} />
          </Box>
        </CssVarsProvider>

      </Box>
      <Box sx={{ bgcolor: '#eff3f6', flex: 1, height: 35, display: 'flex', justifyContent: 'flex-end' }}>
        <CusIconButton
          size="sm"
          variant="outlined"
          color="primary"
          clickable="true"
          onClick={backtoSetting}
        >
          <CloseIcon fontSize="small" />
        </CusIconButton>
      </Box>
    </Box>
  )
}

export default memo(AmsMaster)