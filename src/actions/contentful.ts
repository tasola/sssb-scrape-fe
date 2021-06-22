import { getClient } from '../contentful/contentful'

export const FETCH_APARTMENT_META_DATA = 'FETCH_APARTMENT_META_DATA'

export const fetchApartmentMetaData = async () => {
  const client = await getClient()
  const res = await client.getEntries()
  return {
    type: FETCH_APARTMENT_META_DATA,
    payload: res,
  }
}
