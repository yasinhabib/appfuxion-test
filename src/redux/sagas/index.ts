import { all } from "redux-saga/effects";
import { watchGetLocationAsync } from "./searchLocation";

export function* rootSaga() {
    yield all([
        watchGetLocationAsync()
    ])
}