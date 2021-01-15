const userController = require("../controllers/userController");
const followController = require("../controllers/followController");

const resolver = {
    Query : {
        // User
        getUser: (_, {id, username}) => userController.getUser(id, username),
        search: (_, {search}) => userController.search(search),

        // Follow
        isFollow: (_, {id, username}, ctx) => followController.isFollow(id, username, ctx),
        getFollowers: (_, {id, username}, ctx) => followController.getFollowers(id, username, ctx),
    },
    Mutation: {
        // -- User
        // Params: _, el body , los headers
        register: (_, {input}, conext) => userController.register(input),
        login: (_,{input}, context) => userController.login(input),
        updateAvatar: (_, {file}, ctx) => userController.updateAvatar(file, ctx),
        deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
        updateUser:(_, {input}, ctx) => userController.updateUser(input, ctx),

        // -- Follow
        follow: (_, {id, username}, ctx) => followController.follow(id, username, ctx),
        unFollow: (_, {id, username}, ctx) => followController.unFollow(id, username, ctx),
    }
}

module.exports = resolver;