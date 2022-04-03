/* eslint-disable no-useless-constructor */
export default class UnknownMessageError extends ErrorEvent {
  constructor(message: string) {
    super(message);
  }
}
