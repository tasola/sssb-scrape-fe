import { createClient } from 'contentful'

// export default class ContentfulClient {
//   getClient = async () => {
//     const client = await createClient({
//       space: process.env.CONTENTFUL_SPACE_ID,
//       accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
//     })
//     return client
//   }
// }

export const getClient = async () => {
  const client = await createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_ACCESS_TOKEN
  })
  return client
}
