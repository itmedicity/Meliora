import { ActionTyps } from '../constants/action.type'
const {
    FETCH_SET_STEP,
    FETCH_UPDATE_VENDOR,
    FETCH_SET_MATERIALS,
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
    RESET_MATERIAL_DETAILS,
    FETCH_SET_MATERIAL_LIST,
    FETCH_SET_LABOUR_LIST
} = ActionTyps

const initialState = {
    step: 0,

    vendorDetails: {
        vendor_slno: 0,
        // vendor_desc: '',
        wod: '',
        fromDate: '',
        toDate: '',
        contractType: '',
        crfNo: '',
        req_date: '',
        sec_id: '',
        wo_number: '',
        sup_name: '',
        sup_first_mob: '',
        sup_second_mob: '',
        sup_email_one: '',
        sup_email_two: '',
    },
    materialDetails: {
        itemName: '',
        itemCode: '',
        itemBrand: '',
        itemDesc: '',
        specification: '',
        quantity: 0,
        unitPrice: 0,
        gstAmount: 0,
        totalAmount: 0,
        grossAmount: 0,
        uom: null,
        uomName: '',
    },

    materialList: [],

    labourList: [],
    labourDetails: {
        description: '',
        specification: '',
        unitRate: '',
        quantity: '',
        rateUnit: 'Per Day',
        totalAmount: '0.00'
    },
    retentionDetails: {
        description: '',
        paymentType: '',
        amount: ''
    },

    terms: {
        validUpto: '',
        terms: [{ text: '', date: '' }]
    },
    paymentTerms: {
        validUpto: '',
        terms: [{ text: '', date: '' }]
    },
    billingTerms: {
        validUpto: '',
        terms: [{ text: '', date: '' }]
    },

    previewOpen: false,
    loading: false,
    error: null
}

export default function getworkOrderReducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_SET_STEP:
            return { ...state, step: action.payload }

        case FETCH_UPDATE_VENDOR:
            return {
                ...state,
                vendorDetails: {
                    ...state.vendorDetails,
                    ...action.payload
                }
            }
        case FETCH_SET_MATERIALS:
            return {
                ...state,
                materialDetails: {
                    ...state.materialDetails,
                    ...action.payload,
                },
            }

        case FETCH_SET_MATERIAL_LIST:
            return {
                ...state,
                materialList: action.payload,
            }

        case RESET_MATERIAL_DETAILS:
            return {
                ...state,
                materialDetails: initialState.materialDetails,
            }


        case FETCH_SET_LABOUR:
            return { ...state, labourDetails: action.payload }

        case FETCH_SET_LABOUR_LIST:
            return {
                ...state,
                labourList: action.payload
            }

        // case FETCH_SET_RETENTION:
        //     return { ...state, retentionDetails: action.payload }

        case FETCH_SET_RETENTION:
            return {
                ...state,
                retentionDetails: {
                    ...state.retentionDetails,
                    ...action.payload
                }
            }
        case FETCH_SET_TERMS:
            return { ...state, terms: action.payload }

        case FETCH_SET_PAYMENT_TERMS:
            return { ...state, paymentTerms: action.payload }

        case FETCH_SET_BILLING_TERMS:
            return { ...state, billingTerms: action.payload }

        case FETCH_TOGGLE_PREVIEW:
            return { ...state, previewOpen: action.payload }

        case FETCH_SAVE_WO_REQUEST:
            return { ...state, loading: true }

        case FETCH_SAVE_WO_SUCCESS:
            return initialState

        case FETCH_SAVE_WO_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case FETCH_RESET_WO:
            return initialState

        default:
            return state
    }
}
