import { Router } from "express";
import { ROUTES as SWOGGERSLOL_ROUTES } from "./swoggerslol.mjs";
import { ROUTES as DEADLAB_ROUTES } from "./deadlab.mjs";
const ROUTES = Router();

ROUTES.use((req, res, next) => {
	return SWOGGERSLOL_ROUTES(req, res, next);
	// if (req.hostname==="swoggerslol.com")return SWOGGERSLOL_ROUTES(req,res,next);
	// return DEADLAB_ROUTES(req,res,next)
});
export { ROUTES };
