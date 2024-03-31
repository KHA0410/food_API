import express, { Router } from "express";
import {
  addLike,
  addRate,
  getLikeByRes,
  getLikeByUser,
  getRateByRes,
  getRateByUser,
  getRestaurant,
  takeOrder,
  unLike,
} from "../controllers/restaurantController.js";

const rootRouter = express.Router();

rootRouter.get("/restaurant/list", getRestaurant);
rootRouter.post("/addlike", addLike);
rootRouter.put("/unlike", unLike);
rootRouter.get("/get-like-by-res/:resId", getLikeByRes);
rootRouter.get("/get-like-by-user/:userId", getLikeByUser);
rootRouter.post("/rating", addRate);
rootRouter.get("/get-list-rate-by-res/:resId", getRateByRes);
rootRouter.get("/get-list-rate-by-user/:userId", getRateByUser);
rootRouter.post("/order", takeOrder);
export default rootRouter;
