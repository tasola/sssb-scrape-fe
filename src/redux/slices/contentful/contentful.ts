import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialState, Area } from './types'

const initialState: InitialState = {
  areas: [],
  isFetchingAreas: false,
  fetchingAreasSucceeded: false,
  fetchingAreasFailed: false
}

export const slice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    requestAreas: (state): void => {
      state.isFetchingAreas = true
    },
    receiveAreas: (state, action: PayloadAction<Area[]>): void => {
      state.areas = action.payload
      state.isFetchingAreas = false
      state.fetchingAreasSucceeded = true
      state.fetchingAreasFailed = false
    },
    areasFetchFailed: (state): void => {
      state.isFetchingAreas = false
      state.fetchingAreasSucceeded = false
      state.fetchingAreasFailed = true
    }
  }
})

export const { requestAreas, receiveAreas, areasFetchFailed } = slice.actions

export default slice.reducer