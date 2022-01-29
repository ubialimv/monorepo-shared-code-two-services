export default class GeneralError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
