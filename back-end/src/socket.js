import socketIo from 'socket.io'
import api from './socket-routes'
import EventEmitter from './EventEmitter'
import { handleConnection } from './utils/token'
import fs from 'fs'
import path from 'path'

import { convertForJSMpegCommand } from './ffmpeg/convertForJSMpeg'

export default async (server) => {
    const io = socketIo(server)
    const connectedUsers = new Map()
    io.on('connection', async (socket) => {
        const eventEmitter = new EventEmitter({socket})
        console.log('new connection')

        const sessionData = new Map()
        handleConnection(socket)
        sessionData.set('tokenId', socket.tokenId)

        socket.emit('connected')
        const emitAction = (...args) => eventEmitter.emit(...args)

        socket.on('action', (action = {}) => {
            const {type, payload} = action
            if (!type) {
                return socket.emit('err', {code: 1})
            }
            const actionType = type.substr(7, type.length)
            console.log(`Token ID: ${sessionData.get('tokenId')} | Action: ${actionType}. Payload: ${JSON.stringify(payload)}`)

            if (api[actionType]) {
                api[actionType]({
                    payload,
                    socket,
                    emitAction,
                    sessionData,
                    // connectedUsers
                })
            } else {
                return socket.emit('err', {code: 1})
            }
        })

        socket.on('disconnect', () => {
            connectedUsers.delete(socket.id)
        })

        socket.on('test', (data) => {
            console.log('Test: ', data)
        })

        setUpVideoUpload(socket)
    })
}

const setUpVideoUpload = (socket) => {
    let files = {},
        struct = {
            name: null,
            type: null,
            size: 0,
            data: [],
            slice: 0
        }

        socket.on('slice upload', (data) => {
            if (!files[data.name]) {
                files[data.name] = Object.assign({}, struct, data)
                files[data.name].data = []
            }

            data.data = Buffer.from(new Uint8Array(data.data))

            files[data.name].data.push(data.data)
            files[data.name].slice++

            if (files[data.name].slice * 100000 >= files[data.name].size){
                // save file
                let fileBuffer = Buffer.concat(files[data.name].data)
                fs.writeFileSync(path.join(__dirname, '/files/' + data.name), fileBuffer, (err) => {
                    delete files[data.name]
                    if (err) {
                        console.log('Upload error', err)
                        return socket.emit('end upload', {
                            status: 'error'
                        })
                    }
                })

                console.log('slice', files[data.name].slice)
                socket.emit('end upload', {
                    status: 'success'
                })
                // convert video to jsmpeg format
                convertVideoToJSMpegFormat(socket, files[data.name].name)
            } else {
                // request for another slice
                socket.emit('request slice upload', {
                    currentSlice: files[data.name].slice
                })
            }
        })
}

// convert video to jsmpeg format
const convertVideoToJSMpegFormat = (socket, filename) => {
    const keklul = convertForJSMpegCommand(filename)
        .on('exit',(code) => {
            console.log('ffmpeg exited with code ' + code)

            // if success
            if (code === 0) {
                // read file as Buffer
                fs.readFile(path.join(__dirname, '/files/converted/FOREDITOR.ts'), (err, data) => {
                    if (err) return console.log(err)

                    const videoArrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
                    // socket.emit()
                    // access ArrayBuffer to send it to front-end
                })
            }
        })
}
