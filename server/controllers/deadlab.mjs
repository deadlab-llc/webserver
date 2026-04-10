import { Router } from "express";
import dotenv from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
const __DIRNAME = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__DIRNAME, "../../.env") });
const ROUTES = Router();
const DEADLAB_HTML = readFileSync(
	join(
		__DIRNAME,
		"../../client-deadlab/dist",
		"index.html",
	),
	"utf8",
);
ROUTES.get("*", (req, res) => {
	res.send(
		DEADLAB_HTML,
	);
});
export { ROUTES };
