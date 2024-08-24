//Tương ứng với model User
const { User } = require("@models/index.js");
const Repository = require("@core/repository.js");
module.exports = class extends Repository {
    getModel() {
        return User;
    }

    getLastestUser() {
        return this.findAll({
            order: [["id", "desc"]],
            limit: 5,
        });
    }
    getUserById(id) {
        return this.findByPk(id);
    }
    repository_getUserByname(username) {
        return this.find({
            where: { username: username }
        })
    }
    repository_createUser(data) {
        return this.create({ ...data, type: false, status: true })
    }
};