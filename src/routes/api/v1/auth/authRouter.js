var express = require('express');
var router = express.Router();
const authController = require("@controllers/api/v1/auth/auth.controller.js")
/* GET home page. */
module.exports = function (app) {
    router.post('/register', authController.register);
    router.get('/login', authController.login);
    return app.use("/api/v1/auth", router)
}


