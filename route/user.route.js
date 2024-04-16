import express from "express";
import { getUser } from "../controller/user.controller.js";

const route = express.Router();

route.get("/", getUser);

export default route;
