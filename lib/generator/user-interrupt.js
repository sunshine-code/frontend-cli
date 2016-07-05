export default class UserInterrupt extends Error {
  constructor() {
    super();
    this.name = "UserInterrupt";
  }
}