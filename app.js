//importar express
import express from "express"
import usersRoutes from "./src/components/users/user.router.js"
import { mongoConfig } from "./src/config/mongo.config.js"
import { errorMiddleware } from "./src/middleware/error.middelware.js"
import helmet from "helmet"

const app = express()
const PORT = process.env.PORT

//mostrar mensaje segun entorno NODE_ENV
process.env.NODE_ENV === "production" ? console.log("Modo producción") : console.log("Modo desarrollo")

try {
    await mongoConfig()
} catch (error) {
    console.error("Error al conectar a la base de datos", error)
    process.exit(1)
}

app.use(helmet()) // Middleware de seguridad
// Middleware para parsear JSON
app.use(express.json())
// Rutas
app.use("/api/users", usersRoutes)

// Middleware de manejo de errores debe ir al final
app.use(errorMiddleware)


app.listen(PORT, () => {
    console.log(`escuchando el puerto ${PORT} http://localhost:${PORT}`)
})