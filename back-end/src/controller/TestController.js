import { testCropCommand } from '../ffmpeg/test'

const cropCommand = (req, res) => {
    console.log('testing crop cmd', req.query)

    testCropCommand(req.query)

    res.status(200).send('Testing')
}

export default {
    cropCommand
}
