"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    res.status(500).send({
        message: 'Server error',
    });
    next(err);
};
exports.default = errorHandler;
