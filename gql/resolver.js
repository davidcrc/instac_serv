const userController = require("../controllers/userController");

const resolver = {
    Query : {
        // User
        getUser: (_, {id, username}) => userController.getUser(id, username)
    },
    Mutation: {
        
        // Params: _, el body , los headers
        register: (_, {input}, conext) => userController.register(input),
        login: (_,{input}, context) => userController.login(input),
        updateAvatar: (_, {file}, ctx) => userController.updateAvatar(file, ctx)

    }
}

module.exports = resolver;