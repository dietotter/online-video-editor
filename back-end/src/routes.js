import TestController from './controller/TestController'

export default (app) => {
    app.get('/testCommand', TestController.cropCommand)
}
