

export const getUserProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: "respuesta exitosa"
        });
    } catch (error) {
        res.status(500).json({ message: "Error interno", error: error.message });
    }
};



export default {getUserProfile}