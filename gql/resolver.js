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

    }
}

module.exports = resolver;