//importar express
import express from "express"
import usersRoutes from  "./src/users/user.router.js"

const app = express()
const PORT = process.env.PORT

//mostrar mensaje segun entorno NODE_ENV
process.env.NODE_ENV === "production" ? console.log("Modo producción") : console.log("Modo desarrollo")

app.use("/api/users",usersRoutes)

app.listen(PORT, ()=>{
    console.log(`escuchando el puerto ${PORT} http://localhost:${PORT}` )
})