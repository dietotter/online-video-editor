import { customFfmpeg } from './ffmpeg'
import path from 'path'

// test command by cropping
export const convertForJSMpegCommand = (input) => {
    const updatedInput = path.resolve(__dirname, '../files/' + input)
    const output = path.resolve(__dirname, '../files/converted/FOREDITOR.ts')
    console.log(updatedInput)
    console.log(output)
    return customFfmpeg(
        ['-y', '-i', updatedInput, '-f', 'mpegts', '-codec:v', 'mpeg1video', '-s', '640x360',
            '-b:v', '700k', '-r', '25', '-bf', '0', '-codec:a', 'mp2', '-ar', 44100,
            '-ac', '1', '-b:a', '64k', output])
}


// coding for ffmpeg
// ffmpeg -y -i testVid.mov -f mpegts -codec:v mpeg1video -s 640x360 -b:v 700k -maxrate 2M -bufsize 1M -r 25 -bf 0 -codec:a mp2 -ar 44100 -ac 1 -b:a 64k testVidEncoded.ts
// ffmpeg -y -i /Users/barabakens/Documents/MyProj/OnlineVideoEditor/back-end/src/ffmpeg/files/testVid.mov -f mpegts -codec:v mpeg1video -s 640x360 -b:v 700k -maxrate 2M -bufsize 1M -r 25 -bf 0 -codec:a mp2 -ar 44100 -ac 1 -b:a 64k /Users/barabakens/Documents/MyProj/OnlineVideoEditor/back-end/src/ffmpeg/files/converted/FOREDITOR.ts

