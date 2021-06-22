import { WithStyles } from '@material-ui/core'
import { Metadata, Sys } from 'contentful'

import styles from './ChosenPreferenceCardStyles'

export type Props = WithStyles<typeof styles> & {
  preference: Preference;
  areaObject: Area;
  id: number;
}

export type Preference = {
  area: string;
  floors: number[];
  types: string[];
}

export type Area = {
  fields: Fields;
  metadata: Metadata;
  sys: Sys;
}

type Fields = {
  address: string;
  cardinalDirection: string;
  description: string;
  floors: number;
  image: ContentfulImage;
  title: string;
  types: Types;
}

type Types = {
  types: string[];
}

type ContentfulImage = {
  fields: ImageFields;
  metadata: Metadata;
  sys: Sys;
}

type ImageFields = {
  file: File;
  title: string;
}

type File = {
  contentType: string;
  details: Details;
  fileName: string;
  url: string;
}

type Details = {
  image: ImageDimensions;
  size: number;
}

type ImageDimensions = {
  width: number;
  height: number;
}