export default async ({payload, socket, emitAction, sessionData}) => {
    let { message } = payload

    emitAction('CONNECTION_RESPONSE', { message: `Thanks mr.${sessionData.get('tokenId').substr(0,8)} for your message: ${message}` })
}

// coding for ffmpeg
// ffmpeg -i testVid.mov -f mpegts -codec:v mpeg1video -s 640x360 -b:v 700k -r 25 -bf 0 -codec:a mp2 -ar 44100 -ac 1 -b:a 64k testVidEncoded.ts
