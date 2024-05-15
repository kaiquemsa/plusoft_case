import { Router } from "express";

import CreateGadgetController from "./controllers/CreateGadgetController";
import DeleteGadgetController from "./controllers/DeleteGadgetController";
import GetAllGadgetController from "./controllers/GetAllGadgetController";
import UpdateGadgetController from "./controllers/UpdateGadgetController";

import CreateSellerController from "./controllers/CreateSellerController";
import GetAllSoldController from "./controllers/GetAllSoldController";

import GeminiAIController from "./controllers/GeminiAIController";
import CreateUserController from "./controllers/CreateUserController";
import AuthLoginUserController from "./controllers/AuthloginController";

const routes = Router();

routes.post("/gadgets", new CreateGadgetController().handle);
routes.get("/gadgets", new GetAllGadgetController().handle);
routes.delete("/gadgets/:id", new DeleteGadgetController().handle);
routes.put("/gadgets/:id", new UpdateGadgetController().handle);

routes.post("/sold", new CreateSellerController().handle);
routes.get("/sold", new GetAllSoldController().handle);

routes.post("/geminiai", new GeminiAIController().handle);

routes.post("/user", new CreateUserController().handle);

routes.post("/authUser", new AuthLoginUserController().handle);

export default routes;