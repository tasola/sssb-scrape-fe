import { createSlice } from '@reduxjs/toolkit'
import { getClient } from 'src/contentful/contentful'

export const slice = createSlice({
  name: 'areas',
  initialState: {
    areas: [],
    isFetchingAreas: false,
    fetchingAreasSucceeded: false,
    fetchingAreasFailed: false
  },
  reducers: {
    requestAreas: (state): void => {
      state.isFetchingAreas = true
    },
    receiveAreas: (state, action): void => {
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

export const fetchApartmentMetaData = () => async (dispatch): Promise<void> => {
  dispatch(requestAreas())
  try {
    const client = await getClient()
    const res = await client.getEntries()
    dispatch(receiveAreas(res))
  } catch (error) {
    console.error('Failed to fetch areas from Contentful')
    dispatch(areasFetchFailed())
  }
}

export default slice.reducer