import React, { Component } from "react"
import {withStyles, Button, Typography} from '@material-ui/core'
import ReactPlayer from 'react-player'
import Timeline from 'timeline-editor-react'
import JSMpeg from 'jsmpeg-player'

let videoUrl = './static/encoded.ts'

class VideoEditor extends Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {
            kek: '',
            videoInput: null,
            blockUploadButton: false,
            uploadingStatus: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.uploadVideoToServer = this.uploadVideoToServer.bind(this);
    }

    componentDidMount() {
        new JSMpeg.VideoElement('#videoWrapper', videoUrl)

        // read video from server
        // let fileBuffer
        // this.socket.on('')
    }

    componentDidUpdate(prevProps, prevState) {
        // upload video to server
        if (this.state.uploadingStatus === 'uploading' && prevState.uploadingStatus !== 'uploading') {
            // when button is blocked, start uploading

            const { videoInput } = this.state
            let fileReader = new FileReader()
            let slice = videoInput.slice(0, 100000)

            fileReader.readAsArrayBuffer(slice)
            fileReader.onload = (evt) => {
                let arrayBuffer = fileReader.result
                this.socket.emit('slice upload', {
                    name: videoInput.name,
                    type: videoInput.type,
                    size: videoInput.size,
                    data: arrayBuffer,
                })
            }

            this.socket.on('request slice upload', (data) => {
                let place = data.currentSlice * 100000,
                    slice = videoInput.slice(place, place + Math.min(100000, videoInput.size - place))

                fileReader.readAsArrayBuffer(slice)
            })

            this.socket.on('end upload', ({status}) => {
                console.log('Finished uploading: ' + status)
                this.socket.off('request slice upload')
                this.socket.off('end upload')
                this.setState({videoInput: null, uploadingStatus: status})
            })
        }
    }

    uploadVideoToServer() {
        this.setState({blockUploadButton: true, uploadingStatus: 'uploading'})
    }

    handleChange(event) {
        console.log('event')
        if (event.target.id === 'videoInput') {
            this.setState({videoInput: event.target.files[0], blockUploadButton: false})
            return;
        }
        this.setState({ [event.target.id]: event.target.value })
    }

    render() {
        const { kek, videoInput, blockUploadButton, uploadingStatus } = this.state;
        const { classes } = this.props;

        console.log(videoInput)

        return (
            <div>
                <div>
                    <div id="videoWrapper" className={classes.playerJSMpeg}></div>
                </div>
                {/*<ReactPlayer url="https://www.youtube.com/watch?v=zOujzvtwZ6M" playbackRate={0.5} controls={true}/>*/}
                {/*<div>*/}
                    {/*<Timeline layers={layers} frames={frames} onUpdateFrames={onUpdateFrames}/>*/}
                {/*</div>*/}
                <div>
                    <Typography variant="subtitle1" gutterBottom>
                        {!uploadingStatus ? 'Choose your video to upload!' : `Uploading status: ${uploadingStatus}`}
                    </Typography>
                    <div>
                        <input type="file"
                               id="videoInput" name="videoInput"
                               className={classes.input}
                               style={{ display: 'none' }}
                               accept="video/*"
                               onChange={this.handleChange}
                        />
                        <label htmlFor="videoInput">
                            <Button variant="contained" component="span" className={classes.button}>
                                {!videoInput ? 'Choose video' : 'Change video'}
                            </Button>
                        </label>
                        {videoInput ? <
                            Button variant="contained"
                                   component="span"
                                   className={classes.button}
                                   onClick={this.uploadVideoToServer}
                                   disabled={blockUploadButton}
                        >
                            Upload
                        </Button> : null}
                    </div>
                </div>
            </div>
        );
    }
}

// ============================= STYLE =============================
const style = {
    player: {
        display: 'block',
        margin: 20
    },
    playerJSMpeg: {
        width: 640,
        height: 360
    },
    button: {
        margin: 10
    }
}

// ============================= TIMELINE STUFF =============================
let layers = [
    {
        id: "3d1df1b4-4d9d-45a4-bf14-cb580ee74675",
        name: "Left"
    },
    {
        id: "7d8c4210-0cfa-4a10-8b21-01e6601e00bf",
        name: "Top"
    },
    {
        id: "65079f30-47a8-4469-833e-4f0eea04d233",
        name: "Bottom"
    }
];
let frames = {
    "3d1df1b4-4d9d-45a4-bf14-cb580ee74675": [{
        name: "Hello.png",
        second: 0,
        duration: 70
    },
        {
            name: "Welcome.png",
            second: 130,
            duration: 200
        }],
    "7d8c4210-0cfa-4a10-8b21-01e6601e00bf": [{
        name: "Goodbye.png",
        second: 10,
        duration: 150
    }],
    "65079f30-47a8-4469-833e-4f0eea04d233": []
};

function onUpdateFrames(frames) {
    //TODO: deal with frames
    console.log('frames', frames)
}

export default withStyles(style)(VideoEditor)
