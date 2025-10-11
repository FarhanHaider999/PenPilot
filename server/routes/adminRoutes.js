import express from "express";
import { adminlogin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminlogin);


export default adminRouter