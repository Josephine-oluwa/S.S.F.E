import {Router} from "express"
import { registerAccount } from "../controller/AuthController"
import ValidatorHolder from "../utils/ValidatorHolder";
import { createAccountValidator } from "../utils/validator";

const authRouter = Router();

authRouter.route("/register").post(ValidatorHolder(createAccountValidator),
registerAccount)
// authRouter.route("/sign-in").post(SignInAccount)
// authRouter.route("/getOneUser").get(getOneUser)

export default authRouter