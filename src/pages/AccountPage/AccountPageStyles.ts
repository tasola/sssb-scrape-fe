import createStyles from '@material-ui/styles/createStyles'

const styles = () =>
  createStyles({
    header: {
      marginBottom: '1.5em',
      marginTop: '1.5em',
    },
    accordionHeader: {
      fontSize: '18px',
    },
    detailsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    text: {
      width: '100%',
    },
    switch: {
      marginTop: '1.5em',
      paddingLeft: '1.5em',
    },
    MuiAccordionRoot: {
      '&.MuiAccordion-root:before': {
        backgroundColor: 'white',
      },
    },
  })

export default styles
