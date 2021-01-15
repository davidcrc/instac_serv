const Follow = require("../models/follow")
const User = require("../models/user")

async function follow(id, username, ctx) {
    // console.log("el user", username );
    // console.log("el ctx", ctx);

    let userFound = null;

    if(id){
        userFound = await User.findById(id);
    }
    if(username){
        userFound = await User.findOne({username});
    }

    if(!userFound){
        throw new Error("usuario no existe");
    }

    try {
        const follow = new Follow({
            idUser: ctx.user.id,
            follow: userFound._id
        });

        follow.save();
    
        return true;

    } catch (error) {
        console.log("err follow", error);
        return false;
    }
}

async function isFollow(id, username, ctx) {
    
    let userFound = null;

    if(id){
        userFound = await User.findById(id);
    }
    if(username){
        userFound = await User.findOne({username});
    }
    
    if(!userFound){
        throw new Error("usuario no encontrado");
    }

    const follow = await Follow.find({ idUser: ctx.user.id })
        .where("follow")                    // en su objeto es igual a...
        .equals(userFound._id)

    if(follow.length > 0) return true;

    return false;
}

module.exports = {
    follow,
    isFollow
}