import React, { Component } from "react"
import Input from "../../presentational/Input/Input.js"
import { withStyles, Button, Typography, TextField } from '@material-ui/core'
import ReactPlayer from 'react-player'

class TestContainer extends Component {
    constructor() {
        super();
        this.state = {
            seo_title: "",
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        const { seo_title, message } = this.state;
        const { push, testContainerState: { counter, serverMsg }, testActions: { testAction, testActionWithPayload, testConnection }, classes} = this.props;

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
                <div>
                    <TextField
                        id="message"
                        label="Say smth to server"
                        className={classes.textField}
                        value={message}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <Button variant="contained" className={classes.connectionButton} color="primary" onClick={() => (message ? testConnection({message}) : false)}>
                        Check connection
                    </Button>
                    <Typography variant="h4" gutterBottom>
                        Server says: {serverMsg}
                    </Typography>
                </div>
                <div>
                    <Button variant="contained" color="secondary" onClick={() => push('editor')}>
                        Go to editor
                    </Button>
                </div>
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
    textField: {
        width: 200,
    },
    connectionButton: {
        display: 'block',
        margin: 20
    },
}

export default withStyles(style)(TestContainer)
