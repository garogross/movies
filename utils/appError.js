export class AppError extends Error {
    constructor(message,statusCode) {
        super(message)
        this.statusCode = statusCode || 400
        this. status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOptional = true

        // add stack to error
        Error.captureStackTrace(this,this.constructor)
    }
}