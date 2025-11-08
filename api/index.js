import { authenticationRoutes } from "./v1/authentication/routes/index.js";
import { connnectionRoutes } from "./v1/connection/routes/index.js";

export function v1Routes(app) {

    authenticationRoutes(app);
    connnectionRoutes(app);

}