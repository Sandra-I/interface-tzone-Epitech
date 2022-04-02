export default class UnknownMessageError extends ErrorEvent {
    constructor(message: string) {
        super(message);
    }
}
