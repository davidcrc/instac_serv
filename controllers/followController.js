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

    // VIEW: Mi aporte
    let isFollowUser = await isFollow(id, username, ctx)

    if(isFollowUser) {
        return true;
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

    return (follow.length > 0) ? true : false ;
}

async function unFollow(id, username, ctx) {

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

    const follow = await Follow.deleteOne({idUser: ctx.user.id})
        .where("follow")                    // en su objeto es igual a...
        .equals(userFound._id)

    return (follow.deletedCount > 0) ? true : false;

}

async function getFollowers(id, username, ctx) {
    
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

    const followers = await Follow.find( {follow: userFound._id}).populate("idUser");       // solo escoge idUser con sus datos
    console.log(followers);

    // CHECK: Como devolver datos de de un populate
    const followersList = [];
    for await (const data of followers) {
        followersList.push(data.idUser);
    }

    return followersList;

}

async function getFolloweds(id, username, ctx) {
    
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

    const followeds = await Follow.find( {idUser: userFound._id}).populate("follow");       // solo escoge idUser con sus datos
    console.log(followeds);
    

    // CHECK: Como devolver datos de de un populate
    const followedsList = [];
    for await (const data of followeds) {
        followedsList.push(data.follow);
    }

    return followedsList;
}

module.exports = {
    follow,
    isFollow,
    unFollow,
    getFollowers,
    getFolloweds,
}