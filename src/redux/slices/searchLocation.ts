import {createSlice} from '@reduxjs/toolkit'
import { PlaceType } from '../../pages/PlaceLocator/SearchInput/interface'

const initialState : PlaceType[] = []

const searchLocation = createSlice({
    name: 'searchLocation',
    initialState: initialState,
    reducers: {
        setLocation: (state : PlaceType[], action) => {
            state = action.payload
            return state
        }
    }
})

export const {setLocation} = searchLocation.actions

export default searchLocation.reducer