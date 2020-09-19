const styles = () => ({
  noPreferences: {
    // The height of one Grid row, minus button margin, minus Grid row's odd negative margin
    height: 'calc(451px - 40px - 40px)',
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
