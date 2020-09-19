const styles = () => ({
  addButton: {
    display: 'block',
    height: 60,
    width: 60,
    borderRadius: '50%',
    backgroundColor: 'rgba(65, 84, 175)',
    color: 'white',
    float: 'right',
    border: 0,
    transition: '0.4s',
    marginTop: 40,
    marginBottom: 40,
    '& *': {
      marginTop: 3,
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '&:focus': {
      outline: 'inherit',
    },
    '&:visited': {
      color: 'white',
    },
  },
})

export default styles
