const styles = () => ({
  profileModifyPage: {
    '& h1': {
      marginTop: '1.5em',
    },
  },
  selectPreferences: {
    marginBottom: 20,
    '&:first-of-type': {
      marginTop: 30,
    },
  },
  modifyPreferencesButtons: {
    width: '100%',
    '& *': {
      float: 'right',
    },
    '& button': {
      marginLeft: 10,
    },
  },
  removePreferences: {
    float: 'left',
    marginLeft: 0,
  },
  destructiveButton: {
    color: '#db4437',
  },
})

export default styles
