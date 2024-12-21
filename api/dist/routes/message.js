"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageRouter = (0, express_1.Router)();
messageRouter.get('/test', (req, res) => {
    res.send('Hello, messageRoute!');
});
exports.default = messageRouter;
