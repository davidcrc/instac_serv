const resolver = {
    Query : {
        // User
        getUser: () => {

            console.log("Obtener usuario")
            return null;
        }
    },
    Mutation: {
        
        // Params: _, el body , los headers
        register: (_, {input}, conext) => {
            
            console.log("Registrando un usuario")
            console.log(input)

            return input;
        }
    }
}

module.exports = resolver;