const styles = () => ({
  noPreferences: {
    // The height of one Grid row, minus button margin, minus Grid row's odd negative margin
    margin: 'auto',
    height: '100%',
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
