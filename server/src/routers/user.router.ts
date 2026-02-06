import express from "express";
import userActions from "../modules/user/userActions.js"


const router = express.Router();

router.post("/", userActions.add);


export default router;
