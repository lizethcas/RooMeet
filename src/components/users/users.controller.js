import * as serviceUser from './user.service.js';

export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await serviceUser.default.getUserProfile({ userId });
        res.status(200).json({
            message: "Usuario obtenido exitosamente",
            data: user
        });
    } catch (error) {
        next(error);
    }
};


export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, age, ocupation } = req.body;
        const newUser = await serviceUser.default.registerUser({ name, email, password, age, ocupation });
        
        const user = newUser.toObject();
        delete user.password;
        res.status(201).json({
            message: "Usuario registrado exitosamente",
            data: user
        });
    } catch (error) {
        next(error);
    }
};


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await serviceUser.default.getAllUsers();
        res.status(200).json({
            message: "Usuarios obtenidos exitosamente",
            data: users,
            count: users.length
        });
    } catch (error) {
        next(error);
    }
};

export default {getUserProfile, registerUser, getAllUsers}