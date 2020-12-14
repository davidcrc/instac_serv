const userController = require("../controllers/userController");

const resolver = {
    Query : {
        // User
        getUser: () => userController.getUser()
    },
    Mutation: {
        
        // Params: _, el body , los headers
        register: async (_, {input}, conext) => userController.register(input)
    }
}

module.exports = resolver;