import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { ReactComponent as GmailSvg } from './gmail.svg'

export const GmailLogo = (props) => (
  <SvgIcon {...props}>
    <GmailSvg />
  </SvgIcon>
)
