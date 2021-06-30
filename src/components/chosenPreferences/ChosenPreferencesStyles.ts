import createStyles from '@material-ui/styles/createStyles'

const styles = () =>
  createStyles({
    header: {
      marginBottom: '1.5em',
      marginTop: '1.5em',
    },
    grid: {
      minHeight: '470px',
    },
    spinnerWrapper: {
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& *': {
        textAlign: 'center',
      },
      '& h4': {
        color: '#bdbdbd',
      },
    },
  })

export default styles
