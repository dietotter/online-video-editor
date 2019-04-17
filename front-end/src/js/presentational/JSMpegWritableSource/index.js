class JSMpegWritableSource {
    constructor(url, options) {
        this.destination = null;

        this.completed = false;
        this.established = false;
        this.progress = 0;

        // Streaming is obiously true when using a stream
        this.streaming = true;
    }

    connect(destination) {
        this.destination = destination;
    }

    start() {
        this.established = true;
        this.completed = true;
        this.progress = 1;
    }

    resume() { // eslint-disable-line class-methods-use-this

    }

    destroy() { // eslint-disable-line class-methods-use-this
    }

    write(data) {
        this.destination.write(data);
    }
}

export default JSMpegWritableSource;
