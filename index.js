const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const {ApolloServer} = require("apollo-server");
const typeDefs = require("./gql/schema")
const resolvers = require("./gql/resolver")

require("dotenv").config({path: ".env"})


// console.log("Hola world! "+process.env.BBDD)

mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, (err, _) => {
    if(err){
        console.log("Error de conexión");
    }else{
        console.log("Conexion exitosa")
        server();
    }
})

function server(){
    const serverApollo  = new ApolloServer({
        typeDefs,
        resolvers,
        // context: (headers) => {
        context: ({req}) => {
            // console.log("head", headers)
            console.log("tokenn", req.headers.authorization)

            const token = req.headers.authorization;

            if(token){
                try {
                    const user = jwt.verify(
                        token.replace("Bearer ", ""),
                        process.env.SECRET_KEY
                    );

                    return {
                        user
                    }
                } catch (error) {
                    console.log("err ctx", error)
                    throw new Error("Token invalido")
                }
            }
        }
    });

    serverApollo.listen().then((response) => {
        console.log("=======================>>>")
        console.log("Servidor ON")
        console.log("URL: " +response.url)
        console.log("<<<=======================")

    } )
}
