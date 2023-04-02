import { createSlice } from '@reduxjs/toolkit'

const initialState = { registrants: [] }

const vaccineSlice = createSlice({
    name: 'vaccine',
    initialState,
    reducers: {
        addBeneficiary(state, action) {
            state.registrants.push(action.payload)
        },
    },
})

export const { addBeneficiary } = vaccineSlice.actions
export default vaccineSlice.reducer





// import { createReducer, createAction } from "@reduxjs/toolkit";


// const initialState = {
//     registrants: []
// }

// export const addBeneficiary = createAction('vaccine/addBeneficiary');

// const vaccineReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(addBeneficiary, (state, action) => {
//             state.registrants.push(action.payload)
//         })
//         .addDefaultCase((state, action) => { })
// })

// export default vaccineReducer;

