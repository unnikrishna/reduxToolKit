

export const logOnDispatch = (createStore) => {
    return (rootReducer, preloadedState, enhancers) => {
        const store = createStore(rootReducer, preloadedState, enhancers)

        function logDispatch(action) {
            const result = store.dispatch(action);
            console.log("Tekcasts Logger", action);
            return result;
        }

        return { ...store, dispatch: logDispatch }
    }
}