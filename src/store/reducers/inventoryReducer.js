import { createSlice, createAction } from '@reduxjs/toolkit'

const initialState = { stock: 100 }

const decrementStock = createAction('vaccine/addBeneficiary');

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addToInventory(state, action) {
            state.stock += action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(decrementStock, (state, action) => {
                state.stock--
            })
            .addDefaultCase((state, action) => { })
    },

})

export const { addToInventory } = inventorySlice.actions
export default inventorySlice.reducer