import { combineReducers } from "redux";

import vaccineReducer from './vaccineReducer';
import inventoryReducer from "./inventoryReducer";
import thunkReducer from './thunkSlice';

const rootReducer = combineReducers({
    vaccine: vaccineReducer,
    inventory: inventoryReducer,
    thunkdata: thunkReducer
});

export default rootReducer;