import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  button: {
    background: '#3da9db',
    color: '#fff',
    width: 250,
    height: 50,
    fontWeight: 'bold',
    margin: '30px 0',
  },
})

const PrimaryButton = (props) => {
  const classes = useStyles()
  return (
    <Button
      variant='contained'
      className={classes.button}
      onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default PrimaryButton
