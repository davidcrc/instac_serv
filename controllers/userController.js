const User = require("../models/user")
const bcryptjs = require("bcryptjs")

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

    console.log(newUser);

    return input;
}

async function getUser(){

    console.log("Obtener usuario")
    return null;
}

async function login(input){
    const {email, password} = input

    console.log("Login email ", email)
    console.log("Login pass ", password)
}

module.exports = {
    register,
    getUser,
    login
}