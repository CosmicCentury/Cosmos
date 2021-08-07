"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = require("./config/express");
const app = express_1.init();
require("./config/dbManager").init();
app.listen(process.env.PORT, () => {
    console.info(`App is listening at http//${process.env.HOST}:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map