export default class EventEmitter {
  constructor ({socket}) {
    this.socket = socket
  }

  emit (actionType, actionPayload) {
    this.socket.emit('action', {
      type: actionType,
      payload: actionPayload
    })
  }
}
