import createStyles from '@material-ui/styles/createStyles'

const styles = () =>
  createStyles({
    header: {
      marginBottom: '1.5em',
      marginTop: '1.5em',
    },
    MuiAccordionRoot: {
      '&.MuiAccordion-root:before': {
        backgroundColor: 'white',
      },
    },
  })

export default styles
