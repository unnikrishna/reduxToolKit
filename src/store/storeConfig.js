
import { configureStore } from "@reduxjs/toolkit";

//import loggerMiddleware from 'redux-logger'

import { persistStore, persistReducer, FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import rootReducer from "./reducers";
import { logOnDispatch } from "./enhancers";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}


const preloadedState = {
    vaccine: {
        registrants: [
            { name: "Deva", date: "12 Oct 21", vaccine: "CV" }
        ]
    }
}

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: true,
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST]
        }
    }),
    devTools: true,
    preloadedState,
    enhancers: [logOnDispatch]
});

export const persistor = persistStore(store)

export default store;