"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.get("/", (req, res) => {
    res.send("Hello, userRoute!");
});
exports.default = userRouter;
