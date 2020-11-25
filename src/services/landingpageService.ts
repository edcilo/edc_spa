import Service from "./service";

export default class LandingpageService extends Service {
  public middlewares = {};

  constructor() {
    super();

    this.applyMiddleware();
  }

  getSchema() {
    return this.client.get("/");
  }
}
