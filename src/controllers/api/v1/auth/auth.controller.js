const bcrypt = require("bcrypt")
const serviceUser = require("@services/api/v1/auth/user.services.js")
const { successResponse, errorResponse } = require("@helpers/response.js");
module.exports = {
    register: async (req, res, next) => {
        try {

            const { username, password: passwordKey, name, email, phone } = req.body;


            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(passwordKey, salt);
            const user_service = await serviceUser.getUserByUsername(username);


            if (user_service) {
                return errorResponse(res, 409, "The request could not be completed due to a conflict with the current state of the resource.", {})
            }
            const createNewUser = await serviceUser.createUser({ username, password, name, email, phone });
            if (!createNewUser) {
                return errorResponse(res, 500, "Server Err.")
            }
            return successResponse(res, 201, { message: "User created successfully." })
        } catch (err) {
            return errorResponse(res, 500, "Server Err.")
        }
    },
    login(req, res, next) {
        res.json({})
    }
}