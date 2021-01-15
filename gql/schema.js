const { gql } = require("apollo-server");

const typeDefs = gql`
    # Datos que puede devolver
    type User {
        id: ID
        name: String
        username: String,
        email: String,
        avatar: String,
        sitioWeb: String,
        descripcion: String,
        password: String,
        createdAt: String
    }

    type Token {
        token: String
    }

    type UpdateAvatar {
        status: Boolean         # el estado si ha sido o no actualizado
        urlAvatar: String
    }

    # Datos que puede recibir
    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }
    input LoginInput {
        email: String!
        password: String!
    }

    # Una sola funcion que reciba los datos necesarios para actualizar
    # deacuerdo al usuario
    input UserUpdateInput {
        name: String
        email: String
        currentPassword: String
        newPassword: String
        sitioWeb: String
        descripcion: String
    }

    # Sirven como GETS
    type Query {
        # User
        getUser(id: ID, username: String): User
        search(search: String): [User]

        # Follow
        isFollow(username: String!): Boolean
    }

    # Sirven como POST
    type Mutation {
        # User
        register(input: UserInput): User
        login(input: LoginInput): Token
        updateAvatar(file: Upload): UpdateAvatar        # Upload: ya definido por react 
        deleteAvatar: Boolean
        updateUser(input: UserUpdateInput): Boolean

        #Follow
        follow(id: ID, username: String!): Boolean
        unFollow(id: ID, username: String!): Boolean
    }
`;

module.exports = typeDefs;