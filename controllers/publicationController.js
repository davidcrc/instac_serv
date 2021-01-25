const Publication = require("../models/publication")
const User = require("../models/user")
const awsUploadImage = require("../utils/aws-upload-image")
const { v4: uuidv4 } = require("uuid");

async function publish(file, ctx) {
    // console.log("publicando...", file)
    // console.log("user...", ctx)
    const { id } = ctx.user;
    const { createReadStream, mimetype } = await file;

    const extension = mimetype.split("/")[1];
    const fileName = `publication/${uuidv4()}.${extension}`;
    const fileData = createReadStream();
    
    try {
        const result = await awsUploadImage(fileData, fileName)
        console.log(result)

        const publication = new Publication({
            idUser: id,
            file: result,
            typeFile: mimetype.split("/")[0],
            createAt: Date.now()
        });

        publication.save();

        return {
            status: true,
            urlFile: result
        }

    } catch (error) {
        return {
            status: null,
            urlFile: ""
        }
    }    
    
}

async function getPublications(id, username, ctx) {
    
    let userFound = null;

    if(id){
        userFound = await User.findById(id);
    }
    if(username){
        userFound = await User.findOne({username});
    }

    if(!userFound){
        throw new Error("Usuario no encontrado");
    }

    const publications = await Publication.find()
        .where({ idUser: userFound._id })
        .sort({ createAt : -1})
    
    return publications;
}

module.exports = {
    publish,
    getPublications,
}