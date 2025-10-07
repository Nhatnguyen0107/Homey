import { Router } from "express";
import routerUser from "./user.js";
import routerProduct from "./product.js";
import routerUpload from "./upload.js";
import authRouter from "./auth.js";
import middlewares from "../middlewares/index.js";
import categoryRouter from "./category.js";
import tagsRouter from "./tags.js";
import roomRoutes from "./room.js";

export default {
  v1: Router()
    .use("/products", middlewares.jwt(), routerProduct)
    .use("/users", middlewares.jwt(), routerUser)
    .use("/upload", routerUpload)
    .use("/auth", authRouter)
    .use("/categories", categoryRouter)
    .use("/tags", tagsRouter)
    .use("/rooms", roomRoutes),  // Using categoryRouter for tags as well
};
