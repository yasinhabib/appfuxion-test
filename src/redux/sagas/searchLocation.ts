import { PlaceType } from '../../pages/PlaceLocator/SearchInput/interface';
import { setLocation } from '../slices/searchLocation';
import { GET_LOCATION } from '../types'
import { put, takeEvery } from 'redux-saga/effects'
import { call } from 'redux-saga/effects';
type AnyAction = {type: string, [key: string]: any}

export function* getLocation({location} : AnyAction) {
    const autocompleteService = new (window as any).google.maps.places.AutocompleteService();
    
    const results : {predictions: PlaceType[]} = yield autocompleteService.getPlacePredictions({input: location})

    yield put(setLocation(results.predictions))
}

export function* watchGetLocationAsync() {
    yield takeEvery(GET_LOCATION, getLocation)
}