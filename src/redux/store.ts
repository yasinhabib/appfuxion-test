import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { rootSaga } from "./sagas";
import searchHistories from "./slices/searchHistories";
import searchLocation from "./slices/searchLocation";

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        searchHistories,
        searchLocation
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export default store