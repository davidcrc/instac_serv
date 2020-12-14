const userController = require("../controllers/userController");

const resolver = {
    Query : {
        // User
        getUser: () => userController.getUser()
    },
    Mutation: {
        
        // Params: _, el body , los headers
        register: (_, {input}, conext) => userController.register(input),
        login: (_,{input}, context) => userController.login(input),

    }
}

module.exports = resolver;