"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const profile_1 = __importDefault(require("./routes/profile"));
const feed_1 = __importDefault(require("./routes/feed"));
const tweet_1 = __importDefault(require("./routes/tweet"));
const PORT = process.env.PORT || 4000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(profile_1.default);
app.use(feed_1.default);
app.use(tweet_1.default);
app.use('/assets', express_1.default.static(path.join(__dirname, 'assets')));
const server = app.listen(PORT, function () {
    console.info('🌍 Listening on port ' + PORT);
});
//# sourceMappingURL=index.js.map