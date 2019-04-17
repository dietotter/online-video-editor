const rand = () => Math.random().toString(36).substr(2); // remove `0.`

const generateToken = () => (rand() + rand()); // to make it longer

export const handleConnection = (socket) => {
    const {token} = socket.request._query

    if (token && token !== 'undefined') {
        socket.tokenId = token
        socket.emit('token', token)
        return
    }

    let newToken = generateToken()
    socket.tokenId = newToken
    socket.emit('token', newToken)
}
