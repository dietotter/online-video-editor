import React, { Component } from "react"
import Input from "../../presentational/Input/Input.js"
import { withStyles, Button, Typography } from '@material-ui/core'
import ReactPlayer from 'react-player'

class TestContainer extends Component {
    constructor() {
        super();
        this.state = {
            seo_title: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        const { seo_title } = this.state;
        const { testContainerState: { counter }, testActions: { testAction, testActionWithPayload }, classes} = this.props;

        return (
            <div>
                {/*<form id="article-form">*/}
                    {/*<Input*/}
                        {/*text="SEO title"*/}
                        {/*label="seo_title"*/}
                        {/*type="text"*/}
                        {/*id="seo_title"*/}
                        {/*value={seo_title}*/}
                        {/*handleChange={this.handleChange}*/}
                    {/*/>*/}
                {/*</form>*/}
                {/*<ReactPlayer/>*/}

                <Typography variant="h2" gutterBottom>
                    Counter: {counter}
                </Typography>
                <Button variant="contained" className={classes.testButton} onClick={testAction}>
                    Test
                </Button>
                <Button variant="contained" color="secondary" className={classes.testButtonPayload} onClick={() => testActionWithPayload({counter: 5})}>
                    Test with payload 5
                </Button>
            </div>
        );
    }
}

// ============================= STYLE =============================
const style = {
    testButton: {
        backgroundColor: 'pink'
    },
    testButtonPayload: {
        marginLeft: 200
    },
}

export default withStyles(style)(TestContainer)
