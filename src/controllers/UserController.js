import User from "../schemas/User";
import { hash } from 'bcryptjs'

class UserController {
    async create(req, res) {
        const { nome, email, username, password, phone } = req.body;
        const verifiEmail = await User.findOne({ email });
        if(verifiEmail){
            res.status(400).json({return:"Email já cadastrado"})
        }
        const passwordCrypt = await hash(password, 12)
        const user = await User.create({
            nome,
            email,
            username,
            password: passwordCrypt,
            phone
        });
        res.json(user)
    }

    async getUsers(req, res) {
        const users = await User.find({}, { nome: 1, email: 1, username: 1, phone: 1 });
        res.json(users);
    }

    async getUserId(req, res) {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    }

    async updateUser(req, res) {
        const { id, nome, email, username, phone } = req.body;
        const user = await User.findById(id);
        if (user == null) {
            res.status(404).json({ return: "Usuario não encontrado" })
        } else {
            const userUpdate = await User.findByIdAndUpdate(id, {
                nome,
                email,
                username,
                phone
            })
            if (userUpdate) {
                res.status(200).json({return: "Usuario atualizado com sucesso!"})
            }
        }

    }
    async deleteUser(req, res) {
        const { id } = req.params;
        //where delete
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.status(200).json({ return: "Usuario deletado com sucesso" });
        } else {
            res.status(404).json({ return: "Usuario não encontrado" });
        }
    }

}


export default new UserController;