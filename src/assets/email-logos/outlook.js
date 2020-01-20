import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { ReactComponent as OutlookSvg } from './outlook.svg'

export const OutlookLogo = props => (
  <SvgIcon {...props}>
    <OutlookSvg />
  </SvgIcon>
)
