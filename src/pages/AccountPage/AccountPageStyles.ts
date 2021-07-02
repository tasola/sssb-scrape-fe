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
      width: '100%',
      marginTop: '1.5em',
      display: 'flex',
    },
    switchStatus: {
      width: '3em',
    },
    chipWrapper: {
      margin: 'auto 0',
      opacity: 0,
      transition: 'opacity 0.1s',
      '&.active': {
        opacity: 1,
      },
    },
    removeAccount: {
      marginLeft: 'auto',
      marginTop: '1em',
      fontSize: '10px',
      color: 'gray',
      '& a': {
        color: 'inherit',
      },
    },
    MuiAccordionRoot: {
      '&.MuiAccordion-root:before': {
        backgroundColor: 'white',
      },
    },
  })

export default styles
