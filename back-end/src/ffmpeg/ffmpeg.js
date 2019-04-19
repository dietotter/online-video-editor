import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import { spawn } from 'child_process'

ffmpeg.setFfmpegPath(ffmpegPath)

export const customFfmpeg = (args) => {
    return spawn(ffmpegPath, args)
    // spawn('ffmpeg', ['-i', 'input.mov', 'output.mp4'])
}
