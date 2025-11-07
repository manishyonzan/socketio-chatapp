import { authenticationRoutes } from "./v1/authentication/routes/index.js";

export function v1Routes(app) {

    authenticationRoutes(app);

}