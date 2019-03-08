import { customFfmpeg } from './ffmpeg'

// test command by cropping
export const testCropCommand = ({input, width, height, x, y, output}) => {
    const cropCmd = customFfmpeg(
        ['-i', input, '-filter:v', `crop=${width}:${height}:${x}:${y}`, '-c:a', 'copy', '-y', output])


    cropCmd.on('error', (err) => {
        console.log(err)
    })

    cropCmd.on('close',(code) => {
        console.log('ffmpeg exited with code ' + code)
    })

    cropCmd.stderr.on('data', (data) => {
        // console.log('stderr: ' + data)
        const tData = data.toString('utf8')
        // var a = tData.split('[\\s\\xA0]+')
        const a = tData.split('\n')
        console.log(a)
    })

    cropCmd.stdout.on('data', (data) => {
        // don't uncomment unless you know what all of that means

        // var frame = new Buffer(data).toString('base64')
        // console.log(frame)

        // cropCmd.stdin.write(data)
    })
}


// TEST COMMAND
// http://localhost:8080/testCommand?input=/Users/barabakens/Documents/MyProj/OnlineVideoEditorTestVids/01.mp4&width=100&height=200&x=10&y=0&output=/Users/barabakens/Documents/MyProj/OnlineVideoEditorTestVids/02.mp4
