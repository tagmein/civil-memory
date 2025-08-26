"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.civilMemoryObjects = exports.civilMemoryKV = void 0;
const cloudflareKV_1 = require("./kv/cloudflareKV");
const diskKV_1 = require("./kv/diskKV");
const httpKV_1 = require("./kv/httpKV");
const redisKV_1 = require("./kv/redisKV");
const volatileKV_1 = require("./kv/volatileKV");
const cloudflareObjects_1 = require("./objects/cloudflareObjects");
const diskObjects_1 = require("./objects/diskObjects");
const vercelObjects_1 = require("./objects/vercelObjects");
exports.civilMemoryKV = {
    cloudflare: cloudflareKV_1.cloudflareKV,
    disk: diskKV_1.diskKV,
    http: httpKV_1.httpKV,
    redis: redisKV_1.redisKV,
    volatile: volatileKV_1.volatileKV,
};
exports.civilMemoryObjects = {
    cloudflare: cloudflareObjects_1.cloudflareObjects,
    disk: diskObjects_1.diskObjects,
    vercel: vercelObjects_1.vercelObjects,
};
