import { Router } from "express";
import routerUpload from "./upload.js";
import authRouter from "./auth.js";
import middlewares from "../middlewares/index.js";
import categoryRouter from "./category.js";
import userRouter from "./user.route.js";
import roomRoutes from "./room.js";

export default {
  v1: Router()
    .use("/upload", routerUpload)
    .use("/auth", authRouter)
    .use("/categories", categoryRouter)
    .use("/users", middlewares.jwt(), userRouter)
    .use("/rooms", roomRoutes),  // Using categoryRouter for tags as well
};
