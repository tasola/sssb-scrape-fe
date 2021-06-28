import { EntryCollection } from 'contentful'
import { getClient } from 'src/contentful/contentful'
import { requestAreas, receiveAreas, areasFetchFailed } from 'src/redux/slices/contentful/contentful'

import { Area } from '../slices/contentful/types'


export const fetchApartmentMetaData = () => async (dispatch): Promise<void> => {
  dispatch(requestAreas())
  try {
    const client = await getClient()
    const res: EntryCollection<Area> = await client.getEntries()
    dispatch(receiveAreas(res.items))
  } catch (error) {
    console.error('Failed to fetch areas from Contentful')
    dispatch(areasFetchFailed())
  }
}