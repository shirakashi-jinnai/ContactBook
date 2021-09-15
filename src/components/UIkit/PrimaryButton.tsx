import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { FC } from 'react'

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

type PrimaryButton = {
  label: string
  onClick?: () => Function
}

const PrimaryButton: FC<PrimaryButton> = (props) => {
  const onClick = () => props.onClick || undefined
  const classes = useStyles()
  return (
    <Button variant='contained' className={classes.button} onClick={onClick()}>
      {props.label}
    </Button>
  )
}

export default PrimaryButton
