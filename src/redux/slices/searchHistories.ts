import {createSlice} from '@reduxjs/toolkit'
import { PlaceType } from '../../pages/PlaceLocator/SearchInput/interface'

const initialState : PlaceType[] = []

const searchHistories = createSlice({
    name: 'searchHistories',
    initialState: initialState,
    reducers: {
        addHistory: (state : PlaceType[], action) => {
            state = [...state,action.payload]
            return state
        }
    }
})

export const {addHistory} = searchHistories.actions

export default searchHistories.reducer