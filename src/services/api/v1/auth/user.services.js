const UserRepository = require("@repositories/api/v1/auth/user.repository.js");
const userRepository = new UserRepository();
module.exports = {
    createUser: (data) => {
        return userRepository.repository_createUser(data)
    },
    login: () => {
        //Gọi model user
    },
    getUsers(id) {
        return userRepository.getUserById(id);
    },
    getUserByUsername(username) {
        return userRepository.repository_getUserByname(username);
    },

};