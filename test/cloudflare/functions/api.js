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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestPost = exports.onRequestDelete = exports.onRequestGet = void 0;
var civil_memory_1 = require("@tagmein/civil-memory");
var TEST_REQUEST_KEYS = ['mykey', 'mynamespace#mykey'];
var TEST_REQUEST_BODY = 'myvalue';
function validateKey(key) {
    if (typeof key !== 'string') {
        return new Response(JSON.stringify({
            error: 'key parameter must be a string',
        }), { status: 400 });
    }
    if (!TEST_REQUEST_KEYS.includes(key)) {
        return new Response(JSON.stringify({
            error: "key parameter must be one of ".concat(JSON.stringify(TEST_REQUEST_KEYS)),
        }), { status: 400 });
    }
    return key;
}
var onRequestGet = function (_a) {
    var env = _a.env, params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var key, kv, value;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    key = validateKey(params.key);
                    if (typeof key !== 'string') {
                        return [2 /*return*/, key];
                    }
                    kv = civil_memory_1.civilMemoryKV.cloudflare({
                        binding: env.DATA_KV,
                    });
                    return [4 /*yield*/, kv.get(key)];
                case 1:
                    value = _b.sent();
                    return [2 /*return*/, new Response(value)];
            }
        });
    });
};
exports.onRequestGet = onRequestGet;
var onRequestDelete = function (_a) {
    var env = _a.env, params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var key, kv;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    key = validateKey(params.key);
                    if (typeof key !== 'string') {
                        return [2 /*return*/, key];
                    }
                    kv = civil_memory_1.civilMemoryKV.cloudflare({
                        binding: env.DATA_KV,
                    });
                    return [4 /*yield*/, kv.delete(key)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, new Response()];
            }
        });
    });
};
exports.onRequestDelete = onRequestDelete;
var onRequestPost = function (_a) {
    var env = _a.env, params = _a.params, request = _a.request;
    return __awaiter(void 0, void 0, void 0, function () {
        var key, kv, value;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    key = validateKey(params.key);
                    if (typeof key !== 'string') {
                        return [2 /*return*/, key];
                    }
                    kv = civil_memory_1.civilMemoryKV.cloudflare({
                        binding: env.DATA_KV,
                    });
                    return [4 /*yield*/, request.text()];
                case 1:
                    value = _b.sent();
                    if (value !== TEST_REQUEST_BODY) {
                        return [2 /*return*/, new Response(JSON.stringify({
                                error: "request body must be ".concat(JSON.stringify(TEST_REQUEST_BODY)),
                            }), { status: 400 })];
                    }
                    return [4 /*yield*/, kv.set(key, value)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, new Response()];
            }
        });
    });
};
exports.onRequestPost = onRequestPost;
