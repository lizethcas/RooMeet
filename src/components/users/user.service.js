import userModel from "./users.model.js"

const getUserProfile = async (data) => {   
    try{
        console.log("Buscando usuario con ID:", data.userId)
        
        // Intentar buscar por userId personalizado primero
        let user = await userModel.findOne({userId: data.userId}).select("-password -__v").maxTimeMS(5000)
        
        // Si no se encuentra por userId, intentar por _id de MongoDB
        if(!user) {
            user = await userModel.findById(data.userId).select("-password -__v").maxTimeMS(5000)
        }
        
        if(!user) throw {status: 404, message: "Usuario no encontrado"}
        console.log("Usuario encontrado:", user.name, "userId:", user.userId)
        return user
    }catch(error){
        console.error("Error en getUserProfile:", error)
        if(error.status) throw error
        if(error.name === 'CastError') throw {status: 400, message: "ID de usuario inválido"}
        throw {status: 500, message: "Error al obtener el usuario"}
    }
}

const registerUser = async (data) => {
    try{
        console.log("Registrando usuario:", data.email)
        const {name, email, password, age, ocupation} = data
        
        // Validar datos requeridos
        if(!name || !email || !password || !age || !ocupation) {
            throw {status: 400, message: "Todos los campos son requeridos"}
        }
        
        const user = await userModel.findOne({email}).select("-password -__v").maxTimeMS(5000)
        if(user) throw {status: 400, message: "El usuario ya existe"}
        
        // Generar userId automáticamente
        const lastUser = await userModel.findOne().sort({userId: -1}).maxTimeMS(5000)
        const nextUserId = lastUser ? lastUser.userId + 1 : 1
        
        const newUser = new userModel({
            userId: nextUserId,
            name,
            email,
            password,
            age,
            ocupation,
            avatarUrl: `https://ui-avatars.com/api/?name=${name.split(" ").join("+")}&background=random&size=128`
        })
        
        console.log("Guardando nuevo usuario con userId:", nextUserId)
        const savedUser = await newUser.save()
        console.log("Usuario guardado exitosamente:", savedUser.email, "userId:", savedUser.userId)
        return savedUser
    } catch(error){
        console.error("Error en registerUser:", error)
        if(error.status) throw error
        if(error.code === 11000) throw {status: 400, message: "El email ya está registrado"}
        if(error.name === 'ValidationError') throw {status: 400, message: "Datos de usuario inválidos"}
        throw {status: 500, message: "Error al registrar el usuario"}
    }
}

const getAllUsers = async () => {
    try{
        console.log("Obteniendo todos los usuarios...")
        const users = await userModel.find().select("-password -__v").maxTimeMS(5000)
        console.log(`Se encontraron ${users.length} usuarios`)
        return users
    }catch(error){
        console.error("Error en getAllUsers:", error)
        if(error.status) throw error
        throw {status: 500, message: "Error al obtener los usuarios"}
    }
}

export default { getUserProfile, registerUser, getAllUsers }