import AppState from "./app/types";
import LandingState from "./landingpage/types";

interface RootState {
  app: AppState;
  landingpage: LandingState;
}

export default RootState;
