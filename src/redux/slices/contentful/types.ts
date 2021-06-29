import { Entry, Metadata, Sys } from 'contentful'

export type InitialState = {
  areas: Entry<Area>[]
  isFetchingAreas: boolean
  fetchingAreasSucceeded: boolean
  fetchingAreasFailed: boolean
}

export type Area = {
  address: string
  cardinalDirection: string
  description: string
  floors: number
  image: ContentfulImage
  title: string
  types: Types
}

type Types = {
  types: string[]
}

type ContentfulImage = {
  fields: ImageFields
  metadata: Metadata
  sys: Sys
}

type ImageFields = {
  file: File
  title: string
}

type File = {
  contentType: string
  details: Details
  fileName: string
  url: string
}

type Details = {
  image: ImageDimensions
  size: number
}

type ImageDimensions = {
  width: number
  height: number
}
