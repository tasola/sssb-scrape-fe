import { getClient } from 'src/contentful/contentful'
import { requestAreas, receiveAreas, areasFetchFailed } from 'src/redux/slices/contentful/contentful'

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