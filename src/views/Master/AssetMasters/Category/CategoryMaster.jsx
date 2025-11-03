import React, { memo, useMemo, useCallback, useState } from 'react'
import CategoryTable from './CategoryTable'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNotify, infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import imageCompression from 'browser-image-compression'
import { useSelector } from 'react-redux'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useNavigate } from 'react-router-dom'
import { Box, Input } from '@mui/joy'
import JSZip from 'jszip'

const CategoryMaster = () => {
  const history = useNavigate()
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)
  const [selectFile, setSelectFile] = useState(null)
  // const [categoryImg, setCategoryImg] = useState('')
  const [ImageArry, setImageArry] = useState([])

  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [category, setCategory] = useState({
    category_slno: '',
    category_name: '',
    category_status: false,
    am_category_pm_days: '0'
  })
  const { category_slno, category_name, category_status, am_category_pm_days } = category
  const updateCategory = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setCategory({ ...category, [e.target.name]: value })
    },
    [category]
  )
  const reset = () => {
    const frmdata = {
      category_slno: '',
      category_name: '',
      category_status: false,
      am_category_pm_days: ''
    }
    setCategory(frmdata)
    setCount(0)
    setValue(0)
    setSelectFile(null)
    setflag(0)
  }
  const postdata = useMemo(() => {
    return {
      category_name: category_name,
      category_status: category_status === true ? 1 : 0,
      am_category_pm_days: am_category_pm_days === '' ? null : am_category_pm_days,
      create_user: id
    }
  }, [category_name, category_status, am_category_pm_days, id])

  const patchdata = useMemo(() => {
    return {
      category_slno: category_slno,
      category_name: category_name,
      category_status: category_status === true ? 1 : 0,
      am_category_pm_days: am_category_pm_days === null ? null : am_category_pm_days,
      edit_user: id
    }
  }, [category_slno, category_name, category_status, am_category_pm_days, id])
  const rowSelect = useCallback(params => {
    setValue(1)
    const data = params.api.getSelectedRows()
    const { category_slno, category_name, category_status, am_category_pm_days } = data[0]
    const frmdata = {
      category_slno: category_slno,
      category_name: category_name,
      category_status: category_status === 1 ? true : false,
      am_category_pm_days: am_category_pm_days === null ? '' : am_category_pm_days
    }
    setCategory(frmdata)
    // setCategoryImg(file_name)

    const getImage = async category_slno => {
      setImageArry([])
      try {
        const result = await axioslogin.get(`/amcategory/getfile/${category_slno}`, {
          responseType: 'blob'
        });

        const contentType = result.headers['content-type'] || '';
        if (contentType?.includes('application/json')) {
          return;
        } else {
          const zip = await JSZip.loadAsync(result.data);
          // Extract image files (e.g., .jpg, .png)
          const imageEntries = Object.entries(zip.files).filter(
            ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
          );
          // Convert each to a Blob URL
          // const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
          //   const blob = await fileObj.async('blob');
          //   const url = URL.createObjectURL(blob);
          //   return { imageName: filename, url };
          // });
          const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
            // Get the original blob (no type)
            const originalBlob = await fileObj.async('blob');
            // Determine MIME type based on filename extension (or any other logic)
            let mimeType = '';
            if (filename.endsWith('.pdf')) {
              mimeType = 'application/pdf';
            } else if (filename.endsWith('.png')) {
              mimeType = 'image/png';
            } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
              mimeType = 'image/jpeg';
            } else {
              mimeType = 'application/octet-stream'; // fallback
            }
            // Recreate blob with correct type
            const blobWithType = new Blob([originalBlob], { type: mimeType });
            // Create URL from new blob
            const url = URL.createObjectURL(blobWithType);
            return { imageName: filename, url, blob: blobWithType };
          });
          const images = await Promise.all(imagePromises);
          setImageArry(images[0])
          // setImageShowFlag(1)
          // setImageShow(true)
        }
      } catch (error) {
        console.error('Error fetching or processing images:', error);
        setImageArry([])
      }
    }
    getImage(category_slno)
  }, [])

  const [flag, setflag] = useState(0)

  const uploadFile = async event => {
    const file = event.target.files[0]
    if (!file) return
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!validImageTypes.includes(file.type)) {
      infoNotify('The selected file is not a valid image. Please upload an image file.')
      return
    }
    setflag(1)
    setSelectFile(file)
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920
      }
      const compressedFile = await imageCompression(file, options)
      setSelectFile(compressedFile)
    } catch (error) {
      infoNotify('Error compressing the image. Please try again.')
      errorNotify('Image compression error:', error)
    }
  }

  const submitCategory = useCallback(
    e => {
      e.preventDefault()

      const InsertCategory = async postdata => {
        const result = await axioslogin.post('/amcategory/insert', postdata)
        return result.data
      }
      const CategoryUpdate = async patchdata => {
        const result = await axioslogin.patch('/amcategory/update', patchdata)
        return result.data
      }
      const FileInsert = async fileData => {
        const result = await axioslogin.post('/fileupload/uploadFile/Category', fileData)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          reset()
        } else {
          infoNotify(message)
        }
      }
      if (value === 0) {
        if (category_name !== '') {
          if (am_category_pm_days !== '') {
            InsertCategory(postdata).then(val => {
              const { message, success, insertid } = val
              if (success === 1) {
                if (selectFile !== null) {
                  const formData = new FormData()
                  formData.append('id', insertid)
                  formData.append('file', selectFile, selectFile.name)
                  FileInsert(formData)
                } else {
                  succesNotify(message)
                  setCount(count + 1)
                  reset()
                }
              } else if (success === 0) {
                infoNotify(message)
              } else {
                infoNotify(message)
              }
            })
          } else {
            infoNotify('Please Enter PM Days')
          }
        } else {
          infoNotify('Please Enter Category')
        }
      } else {
        if (category_name !== '') {
          if (am_category_pm_days !== '') {
            CategoryUpdate(patchdata).then(val => {
              const { message, success } = val
              if (success === 2) {
                if (selectFile !== null) {
                  const formData = new FormData()
                  formData.append('id', category_slno)
                  formData.append('file', selectFile, selectFile.name)
                  FileInsert(formData)
                } else {
                  succesNotify(message)
                  setCount(count + 1)
                  reset()
                }
              } else {
                infoNotify(message)
              }
            })
          } else {
            infoNotify('Please Enter PM Days')
          }
        } else {
          infoNotify('Please Enter Category')
        }
      }
    },
    [postdata, value, patchdata, count, selectFile, category_name, category_slno, am_category_pm_days]
  )
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    const frmdata = {
      category_slno: '',
      category_name: '',
      category_status: false,
      am_category_pm_days: ''
    }
    setCategory(frmdata)
    setValue(0)
    setSelectFile(null)
  }, [setCategory, setSelectFile])
  return (
    <CardMaster title="Category Master" submit={submitCategory} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ p: 1 }}>
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
          <Box sx={{ width: '30%', p: 1 }}>
            <Box>
              <TextFieldCustom
                placeholder="Category"
                type="text"
                size="sm"
                name="category_name"
                value={category_name}
                onchange={updateCategory}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 0.5, width: 160 }}>
              <TextFieldCustom
                placeholder="PM"
                type="number"
                size="sm"
                name="am_category_pm_days"
                value={am_category_pm_days}
                onchange={updateCategory}
                endDecorator={'PM Days'}
              ></TextFieldCustom>
            </Box>
            <Box sx={{ pt: 1 }}>
              <CusCheckBox
                label="status"
                color="primary"
                size="md"
                name="category_status"
                value={category_status}
                checked={category_status}
                onCheked={updateCategory}
              ></CusCheckBox>
            </Box>
            {flag === 1 ? null : (
              <>
                {value === 1 ? (
                  <Box
                    sx={{
                      height: 200,
                      width: 200,
                      p: 1,
                      border: 1,
                      borderRadius: 2,
                      borderColor: 'lightgrey'
                    }}
                  >
                    <img src={ImageArry?.url} alt={ImageArry?.imageName} style={{ height: '100%', width: '100%' }} />
                  </Box>
                ) : null}
              </>
            )}
            {selectFile !== null ? (
              <Box
                sx={{
                  height: 200,
                  width: 200,
                  p: 1,
                  border: 1,
                  borderRadius: 2,
                  borderColor: 'lightgrey',
                  mb: 0.5
                }}
              >
                {selectFile.type.includes('image') ? (
                  <img
                    src={URL.createObjectURL(selectFile)}
                    alt={selectFile.name}
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      fontWeight: 800,
                      fontSize: 18,
                      color: 'lightgrey',
                      textAlign: 'center',
                      pt: 7
                    }}
                  >
                    Image Format
                    <br></br>Not supported
                  </Box>
                )}
              </Box>
            ) : null}
            <Box
              sx={{
                fontSize: 15,
                cursor: 'pointer',
                flexGrow: 1,
                textAlign: 'center',
                width: 200,
                fontWeight: 600,
                color: 'black'
              }}
            >
              {selectFile?.name ? selectFile.name : null}
            </Box>
            <Box sx={{ alignItems: 'center', display: 'flex' }}>
              <label htmlFor="file-input">
                {flag === 1 ? (
                  <Box
                    sx={{
                      bgcolor: '#4961A8',
                      py: 0.5,
                      width: 200,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 0.5,
                      borderRadius: 1,
                      color: '#fff',
                      '&:hover': {
                        bgcolor: '#5874C6'
                      },
                      '&:active': {
                        bgcolor: '#3A4E8C'
                      }
                    }}
                  >
                    <AttachmentIcon />
                    Change Image
                  </Box>
                ) : (
                  <>
                    {value === 1 ? (
                      <Box
                        sx={{
                          bgcolor: '#4961A8',
                          py: 0.5,
                          mt: 0.5,
                          width: 200,
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 0.5,
                          borderRadius: 1,
                          color: '#fff',
                          '&:hover': {
                            bgcolor: '#5874C6'
                          },
                          '&:active': {
                            bgcolor: '#3A4E8C'
                          }
                        }}
                      >
                        <AttachmentIcon />
                        Change Image
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          bgcolor: '#4961A8',
                          py: 0.5,
                          width: 200,
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 0.5,
                          borderRadius: 1,
                          color: '#fff',
                          '&:hover': {
                            bgcolor: '#5874C6'
                          },
                          '&:active': {
                            bgcolor: '#3A4E8C'
                          }
                        }}
                      >
                        <AttachmentIcon />
                        Attach Image
                      </Box>
                    )}
                  </>
                )}
              </label>
              <Input
                id="file-input"
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                style={{ display: 'none' }}
                onChange={uploadFile}
              />
            </Box>
          </Box>
          <Box sx={{ width: '70%' }}>
            <CategoryTable count={count} rowSelect={rowSelect} />
          </Box>
        </Box>
      </Box>
    </CardMaster>
  )
}

export default memo(CategoryMaster)
