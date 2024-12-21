"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const message_1 = __importDefault(require("./routes/message"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/message', message_1.default);
const httpServer = app.listen(8080, () => {
    console.log('API server running on port 8080');
});
exports.httpServer = httpServer;
require("./websocket");
