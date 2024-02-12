import express from "express";

const usersRouter = express.Router();

usersRouter.post('/', (req, res, next) => {
  try {
    const user;
  } catch (error) {
    return next(error);
  }
});