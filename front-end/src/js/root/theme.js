import { createMuiTheme } from '@material-ui/core/styles'
import yellow from '@material-ui/core/colors/yellow'
import green from '@material-ui/core/colors/green'

export default createMuiTheme({
  // https://material-ui-next.com/customization/themes/#the-other-variables
  // overrides
  palette: {
    primary: {
      ...yellow
    },
    secondary: {
      ...green,
      A200: green[500]
    }
  }
})

export const rootStyle = theme => ({
  root: {
    width: '100%',
    // marginBottom: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  content: {
    margin: 'auto',
    maxWidth: '900px',
    // padding: '16px',
    position: 'relative',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: '100%',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64
    }
  }
})
