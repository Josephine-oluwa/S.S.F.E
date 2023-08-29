import express from "express";
import { readProduct } from "../controller/storeController";


const router = express.Router();

router.route("/view-products").get( readProduct);


export default router;