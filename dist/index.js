"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.civilMemoryObjects = exports.civilMemoryKV = void 0;
var cloudflareKV_1 = require("./kv/cloudflareKV");
var diskKV_1 = require("./kv/diskKV");
var vercelKV_1 = require("./kv/vercelKV");
var volatileKV_1 = require("./kv/volatileKV");
var cloudflareObjects_1 = require("./objects/cloudflareObjects");
var diskObjects_1 = require("./objects/diskObjects");
var vercelObjects_1 = require("./objects/vercelObjects");
var volatileObjects_1 = require("./objects/volatileObjects");
exports.civilMemoryKV = {
    cloudflare: cloudflareKV_1.cloudflareKV,
    disk: diskKV_1.diskKV,
    vercel: vercelKV_1.vercelKV,
    volatile: volatileKV_1.volatileKV,
};
exports.civilMemoryObjects = {
    cloudflare: cloudflareObjects_1.cloudflareObjects,
    disk: diskObjects_1.diskObjects,
    vercel: vercelObjects_1.vercelObjects,
    volatile: volatileObjects_1.volatileObjects,
};
