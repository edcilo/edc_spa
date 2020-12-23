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

  contactForm(name: string, email: string, message: string) {
    return this.client.post("/contact", {
      name,
      email,
      message
    });
  }
}
