import { usersService } from "../repositoryServices/index.js";
import customError from "../services/errors/errors.generate.js"
import { errorsMessage, errorsName } from "../services/errors/errors.enum.js";
import passport from "passport";




export const findUserById = (req, res) => {
    passport.authenticate("jwt", { session: false }),

    async (req, res) => {
        const { idUser } = req.params;
        const user = await usersService.findById(idUser);
        if (!user) {
            customError.createError(errorsName.USER_NOT_FOUND,errorsMessage.USER_NOT_FOUND,500)
            }
        res.json({ message: "User", user });
}};

export const findUserByEmail = async (req, res) => {
    const { UserEmail } = req.body;
    const user = await usersService.findByEmail(UserEmail);
    if (!user) {
        customError.createError(errorsName.USER_NOT_FOUND,errorsMessage.USER_NOT_FOUND,500)
    }
    res.status(200).json({ message: "User found", user });
};

export const createUser =  async (req, res) => {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password) {
        customError.createError(errorsName.DATA_NOT_RECEIVED,errorsMessage.DATA_NOT_RECEIVED,500)
    }
    const createdUser = await usersService.createOne(req.body);
    res.status(200).json({ message: "User created", user: createdUser });
};

