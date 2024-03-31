import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../configs/response.js";
import { where } from "sequelize";

const model = initModels(sequelize);
//List restaurant
const getRestaurant = async (req, res) => {
  let data = await model.restaurant.findAll();
  responseData(res, "Danh sách restaurant", 200, data);
};
//Add like
const addLike = async (req, res) => {
  let { user_id, res_id } = req.body;

  let checkLike = await model.like_res.findOne({
    where: {
      user_id,
      res_id,
    },
  });

  if (checkLike) {
    responseData(res, "Bạn đã like nhà hàng này rồi", 400, "");
    return;
  }
  let newLike = {
    user_id,
    res_id,
  };
  await model.like_res.create(newLike);
  responseData(res, "Like thành công", 200, newLike);
};

//Un like
const unLike = async (req, res) => {
  let { user_id, res_id } = req.body;

  let checkLike = await model.like_res.findOne({
    where: {
      user_id,
      res_id,
    },
  });

  if (checkLike) {
    await model.like_res.destroy({
      where: {
        user_id,
        res_id,
      },
    });
    responseData(res, "Đã Unlike", 200, "");
  }
};
//Get list like by reataurant id
const getLikeByRes = async (req, res) => {
  let { resId } = req.params;

  let data = await model.like_res.findAll({
    where: {
      res_id: resId,
    },
    include: ["user", "re"],
  });
  responseData(res, "Get list like by resId success", 200, data);
};
//Get list like by use_id
const getLikeByUser = async (req, res) => {
  let { userId } = req.params;

  let data = await model.like_res.findAll({
    where: {
      user_id: userId,
    },
    include: ["user", "re"],
  });
  responseData(res, "Get list like by userId success", 200, data);
};

//Add Rate
const addRate = async (req, res) => {
  let { res_id, user_id, amount } = req.body;

  let checkRate = await model.rate_res.findOne({
    where: {
      res_id,
      user_id,
    },
  });

  if (checkRate) {
    responseData(res, "Bạn đã đánh giá nhà hàng này rồi", 400, "");
    return;
  }

  let newRate = {
    res_id,
    user_id,
    amount,
  };

  await model.rate_res.create(newRate);
  responseData(res, "Đánh giá thành công", 200, newRate);
};
//Get list rate by restaurant
const getRateByRes = async (req, res) => {
  let { resId } = req.params;

  let data = await model.rate_res.findAll({
    where: {
      res_id: resId,
    },
    include: ["user", "re"],
  });
  responseData(res, "Get list rate by resId success", 200, data);
};
//Get list rate by user
const getRateByUser = async (req, res) => {
  let { userId } = req.params;

  let data = await model.rate_res.findAll({
    where: {
      user_id: userId,
    },
    include: ["user", "re"],
  });
  responseData(res, "Get list rate by userId success", 200, data);
};
//Take an order
const takeOrder = async (req, res) => {
  let { user_id, food_id, amount, arr_sub_id } = req.body;
  let arr_sub = [];
  let checkOrder = await model.order_food.findOne({
    where: {
      food_id,
      user_id,
    },
    include: ["food", "user"],
  });

  if (checkOrder) {
    responseData(
      res,
      "Món ăn của bạn đang được chuẩn bị, vui lòng không đặt trùng",
      400,
      ""
    );
    return;
  }

  let newOrder = {
    food_id,
    user_id,
    amount,
    arr_sub_id,
  };

  await model.order_food.create(newOrder);
  responseData(res, "Order success, please wait", 200, newOrder);
};
export {
  getRestaurant,
  addLike,
  unLike,
  getLikeByRes,
  getLikeByUser,
  addRate,
  getRateByRes,
  getRateByUser,
  takeOrder,
};
