const styles = () => ({
  '@global': {
    body: {
      backgroundColor: '#fff',
    },
  },
  paper: {
    marginTop: 100,
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f50057',
  },
  form: {
    marginTop: 1,
  },
  submit: {
    marginTop: 20,
  },
  alreadyGotAnAccount: {
    marginTop: 15,
    fontSize: 13,
  },
  loading: {
    color: 'white',
    marginRight: 18,
  },
  errorText: {
    color: '#f50057',
    marginBottom: 5,
    textAlign: 'center',
  },
  goToLogin: {
    textDecoration: 'none',
    color: '#0366d6',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

export default styles
