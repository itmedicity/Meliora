import { axioslogin } from 'src/views/Axios/Axios';
import { ActionTyps } from '../constants/action.type'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';

// destructure action types
const {
    FETCH_SET_STEP,
    FETCH_UPDATE_VENDOR,
    FETCH_SET_MATERIALS,
    RESET_MATERIAL_DETAILS,
    FETCH_SET_LABOUR,
    FETCH_SET_RETENTION,
    FETCH_SET_TERMS,
    FETCH_SET_PAYMENT_TERMS,
    FETCH_SET_BILLING_TERMS,
    FETCH_TOGGLE_PREVIEW,
    FETCH_SAVE_WO_REQUEST,
    FETCH_SAVE_WO_SUCCESS,
    FETCH_SAVE_WO_FAILURE,
    FETCH_RESET_WO,
    FETCH_SET_MATERIAL_LIST,
    FETCH_SET_LABOUR_LIST
} = ActionTyps

/* -------------------- BASIC ACTIONS -------------------- */

export const setStep = (step) => ({
    type: FETCH_SET_STEP,
    payload: step
})

export const updateVendorDetails = (data) => ({
    type: FETCH_UPDATE_VENDOR,
    payload: data
})

export const resetMaterialDetails = () => ({
    type: RESET_MATERIAL_DETAILS,
});

export const setMaterialDetails = (payload) => ({
    type: FETCH_SET_MATERIALS,
    payload,
})

export const setMaterialList = (payload) => ({
    type: FETCH_SET_MATERIAL_LIST,
    payload,
})


export const setLabourList = (payload) => ({
    type: FETCH_SET_LABOUR_LIST,
    payload,
})

export const setLabourDetails = (data) => ({
    type: FETCH_SET_LABOUR,
    payload: data
})

export const setRetentionDetails = (data) => ({
    type: FETCH_SET_RETENTION,
    payload: data
})

export const setTerms = (data) => ({
    type: FETCH_SET_TERMS,
    payload: data
})

export const setPaymentTerms = (data) => ({
    type: FETCH_SET_PAYMENT_TERMS,
    payload: data
})

export const setBillingTerms = (data) => ({
    type: FETCH_SET_BILLING_TERMS,
    payload: data
})

export const togglePreview = (status) => ({
    type: FETCH_TOGGLE_PREVIEW,
    payload: status
})


/* -------------------- SAVE WORK ORDER (THUNK) -------------------- */


export const saveWorkOrder = (postData, queryClient) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_SAVE_WO_REQUEST });

        const result = await axioslogin.post(
            '/workOrder/insertWorkOrderDetails',
            postData
        );

        const { success, message } = result.data;

        if (success !== 1) {
            warningNotify(message || 'Work Order Cant Saved');

            throw new Error(message || 'Save failed');
        }

        succesNotify(message || 'Work Order Saved Successfully');
        queryClient.invalidateQueries('getCRFDatas')

        dispatch({ type: FETCH_SAVE_WO_SUCCESS });

        return true;   // 🔥 return success

    } catch (error) {
        warningNotify('Work Order Cant Saved');
        dispatch({
            type: FETCH_SAVE_WO_FAILURE,
            payload: error?.message || 'Something went wrong'
        });

        return false;  // 🔥 return failure
    }
};

/* -------------------- RESET -------------------- */

export const resetWorkOrder = () => ({
    type: FETCH_RESET_WO
})
