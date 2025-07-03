import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify } from 'src/views/Common/CommonCode'

export const AddorRemovePatients = async (updateArray, qitype, count, setCount) => {
  const UpadateEndoData = async updateArray => {
    const result = await axioslogin.patch('/qiendoscopy/update', updateArray)
    return result.data
  }
  if (qitype === 1) {
    UpadateEndoData(updateArray).then(val => {
      const { success, message } = val
      if (success === 1) {
        succesNotify(message)
        setCount(count + 1)
      }
    })
  }
}
