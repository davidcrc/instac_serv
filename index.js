const mongoose = require("mongoose");
require("dotenv").config({path: ".env"})


console.log("Hola world! "+process.env.BBDD)

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
    }
})
