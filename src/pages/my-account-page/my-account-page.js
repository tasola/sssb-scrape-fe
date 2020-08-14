const styles = () => ({
  spinner: {
    width: '15px !important',
    height: '15px !important',
    marginLeft: '1rem',
  },
  buttonWrapper: {
    float: 'right',
    marginTop: '2rem',
  },
  accountButton: {
    margin: '0 0.5em 0 0.5em',
    '&:first-child': {
      marginLeft: 0,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  headerWrapper: {
    width: 'calc(40vw + 1.5rem)',
    minWidth: 'calc(550px + 1.5rem)',
    margin: '0 auto',
    '@media (max-width: 700px)': {
      minWidth: '94vw',
    },
    '& h1': {
      opacity: 0.87,
    },
  },
  section: {
    width: '40vw',
    minWidth: 550,
    padding: '1rem 1.5rem',
    margin: '0 auto',
    '& p': {
      marginTop: 5,
      marginBottom: 0,
      opacity: 0.6,
    },
    '& h2': {
      opacity: 0.87,
    },
    '@media (max-width: 700px)': {
      minWidth: '85vw',
    },
  },
  dialog: {
    width: '40vw',
    minWidth: 550,
    padding: '1rem 1.5rem',
    margin: '0 auto',
    '& p': {
      marginTop: 5,
      marginBottom: 0,
      opacity: 0.6,
    },
    '& h2': {
      opacity: 0.87,
    },
    '@media (max-width: 700px)': {
      minWidth: '85vw',
    },
  },
})

export default styles
