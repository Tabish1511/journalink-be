"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const ws_1 = require("ws");
const index_1 = require("./index");
const wss = new ws_1.WebSocketServer({ server: index_1.httpServer, path: '/api/v1/chatWs' });
exports.wss = wss;
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        return __awaiter(this, void 0, void 0, function* () {
            wss.clients.forEach(function each(client) {
                if (client.readyState === 1) {
                    client.send(data, { binary: isBinary });
                }
            });
        });
    });
});
