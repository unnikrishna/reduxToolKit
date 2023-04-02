import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRegistrants = createAsyncThunk(
    'vaccine/fetchRegistrants',
    async (arg, thunkAPI) => {
        try {
            const source = axios.CancelToken.source();
            thunkAPI.signal.addEventListener('abort', () => {
                source.cancel()
            })
            const response = await axios.get("http://localhost:8080/vaccinelist", { cancelToken: source.token });
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }

    },
    {
        condition: (arg, { getState, extra }) => {
            const { thunkdata } = getState()
            const { loading, ids } = thunkdata
            if (loading === true || ids.length > 0) {
                return false
            }
        },
    }
)



export const fetchRegistrantInfoById = createAsyncThunk(
    'vaccine/fetchRegistrantInfoById',
    async (benid, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8080/vaccinelist/${benid}`);
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    },
    {
        condition: (benid, { getState, extra }) => {
            const { thunkdata } = getState()
            const { entities } = thunkdata
            if (entities[benid].hasOwnProperty('additionalDetails') && entities[benid].additionalDetails) {
                return false
            }
        },
    }
)

const registrantsAdapter = createEntityAdapter({
    selectId: (beneficiary) => beneficiary.benid,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});


const initialState = registrantsAdapter.getInitialState({
    loading: false,
    error: ''
});

const thunkSlice = createSlice({
    name: 'thunkdata',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase('vaccine/fetchRegistrants/pending', (state, action) => {
                state.loading = true
            })
            .addCase('vaccine/fetchRegistrants/fulfilled', (state, action) => {
                registrantsAdapter.upsertMany(state, action.payload);
                state.loading = false
            })
            .addCase('vaccine/fetchRegistrantInfoById/fulfilled', (state, action) => {
                // console.log(action)
                registrantsAdapter.updateOne(state, { id: action.meta.arg, changes: { ...action.payload, additionalDetails: true } })
            })
            .addCase('vaccine/fetchRegistrants/rejected', (state, action) => {
                //console.log(action);
                state.loading = false
                state.error = action.payload
            })
            .addDefaultCase((state, action) => { })
    }
})

export default thunkSlice.reducer


export const {
    selectIds: getRegistrantsIds,
    selectEntities: getRegistrantsEntities,
    selectAll: getAllRegistrants,
} = registrantsAdapter.getSelectors((state) => state.thunkdata)



// export const getVaccineList = () => {
//     return (dispatch) => {
//         dispatch(beneficiaryLoad())
//         return axios.get("http://localhost:8080/vaccinelist").then(
//             response => dispatch(beneficiarySuccess(response.data)),
//             err => dispatch(beneficiaryFailure(err))
//         )
//     };
// }