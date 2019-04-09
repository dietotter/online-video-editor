import React from 'react'
import PropTypes from 'prop-types'
import Routes from './Routes'
import { withStyles } from '@material-ui/core/styles'
import { rootStyle as styles } from './theme'

export class App extends React.Component {
    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <div className={classes.content}>
                        <Routes />
                    </div>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element
}

export default withStyles(styles)(App)
