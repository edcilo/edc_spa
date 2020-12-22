import Service from "./service";

export default class LandingpageService extends Service {
  public middlewares = {};

  constructor() {
    super();

    this.applyMiddleware();
  }

  getSchema(lang: string) {
    return this.client.get(`/?lang=${lang}`);
  }
}
