import Users from "../model/users.js";

export const getAllUsers = async(req, res) => {
    try {
        const response = await Users.findAll();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async(req, res) => {

    const { username, password, image } = req.body;
    let unique_id_user = Math.floor(100000 + Math.random() * 900000);

    console.log(unique_id_user);
    const user = {
        unique_id: unique_id_user,
        username: username,
        password: password,
        image: image,
    };

    try {
        const response = await Users.create(user);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};