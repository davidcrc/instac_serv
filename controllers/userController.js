const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const awsUploadImage = require("../utils/aws-upload-image")

function createToken(user, SECRET_KEY, expiresIn){
    
    const {id, name, email, username} = user;
    const payload = {
        id, name, email, username
    };
    
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

async function register(input){
            
    // console.log("Registrando un usuario")
    // console.log(input)
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const { email, username, password } = newUser;

    const foundEmail = await User.findOne({email})

    // Consultar Si email y username ya existen en la BD
    if(foundEmail){
        console.log("Email ya Registrado")
        throw new Error("El email ya esta en uso");
    }

    const foundUsername = await User.findOne({username})

    if(foundUsername){
        console.log("Usuario ya Registrado")
        throw new Error("El usuario ya esta en uso");
    }
    
    // Encriptar
    const salt = await bcryptjs.genSaltSync(10);
    newUser.password = await bcryptjs.hash(password, salt);

    try {
        const user = new User(newUser)
        user.save();

        return user;
    } catch (error) {
        console.log(error)
    }

    // console.log(newUser);

    // return input;
}

async function getUser(id, username){

    let user = null;

    if(id){
        user = await User.findById(id);
    }
    if(username){
        user = await User.findOne({username});
    }

    if(!user){
        throw new Error("usuario no existe");
    }

    return user;
}

async function login(input){
    const {email, password} = input

    // console.log("Login email ", email)
    // console.log("Login pass ", password)
    const userFound = await User.findOne({email: email.toLowerCase()})

    if(!userFound){
        throw new Error("Error en email o contraseña");
    }

    const passwordSuccess = await bcryptjs.compare(password, userFound.password);

    if(!passwordSuccess) {
        throw new Error("Error en email o contraseña!");
    }

    // console.log(createToken(userFound, process.env.SECRET_KEY , "24h"))
    const token = createToken(userFound, process.env.SECRET_KEY , "24h")

    if(!token){
        throw new Error("Hubo un error al iniciar sesion");
    }
    
    return {
        token
    };
}

async function updateAvatar(file){
    // console.log(file)
    const { createReadStream, mimetype } = await file;

    const extension = mimetype.split("/")[1];

    // TODO: Recibir el id del usuario para añadirlo al nombre
    const imageName = `avatar/avt.${extension}`;
    // console.log(imageName)
    const fileData = createReadStream();

    try {
        const result = await awsUploadImage(fileData, imageName);       // Aqui se sube realmente
        console.log(result)
        // return {
        //     status: true,
        //     urlAvatar: result
        // }
    } catch (error) {
        return {
            status: false,
            urlAvatar: null
        }
    }
    // return null;
}

module.exports = {
    register,
    getUser,
    login,
    updateAvatar
}