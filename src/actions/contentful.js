import axios from 'axios'

const {
  REACT_APP_CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  REACT_APP_CONTENTFUL_SPACE_ID
} = process.env
const API_BASE_URL = 'https://cdn.contentful.com'

export const FETCH_APARTMENT_META_DATA = 'FETCH_APARTMENT_META_DATA'

export const fetchApartmentMetaData = async () => {
  const request = await axios.get(
    `${API_BASE_URL}/spaces/${REACT_APP_CONTENTFUL_SPACE_ID}/entries?access_token=${REACT_APP_CONTENTFUL_DELIVERY_ACCESS_TOKEN}&content_type=area`
  )
  return {
    type: FETCH_APARTMENT_META_DATA,
    payload: request
  }
}
