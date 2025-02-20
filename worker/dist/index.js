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
const redis_1 = require("redis");
// const client = createClient();
const client = (0, redis_1.createClient)({
    url: 'redis://journalink-redis:6379'
});
client.on('error', (err) => console.log('Redis Client Error', err));
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log('Connected to Redis from worker');
        }
        catch (error) {
            console.error('Failed to connect to Redis:', error);
            return;
        }
        while (true) {
            if (!client.isOpen) {
                console.error('Redis connection lost. Exiting worker loop.');
                break;
            }
            try {
                const messageData = yield client.brPop("newMessages", 0);
                if (messageData === null || messageData === void 0 ? void 0 : messageData.element) {
                    console.log("The message received by redis (MESSAGEDATA ONLY, NOT MESSAGEDATA.ELEMENT): ", messageData);
                    console.log('Message processed in BG WORKER');
                }
                else {
                    console.log('NO MESSAGE IN BG WORKER');
                }
            }
            catch (error) {
                console.error("Error processing message:", error);
            }
        }
    });
}
startWorker();
