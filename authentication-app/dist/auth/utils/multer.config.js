"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.storage = (0, multer_1.diskStorage)({
    destination: './uploads',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const extension = (0, path_1.extname)(file.originalname);
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${name}-${randomName}${extension}`);
    },
});
//# sourceMappingURL=multer.config.js.map