import jwt from "jsonwebtoken";

import Users from "../model/users.js";

export const getAUser = async(req, res) => {
    const unique_id_pengerima = req.params.id_penerima;

    try {
        const response = await Users.findOne({
            where: {
                unique_id: unique_id_pengerima,
            },
        });
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsers = async(req, res) => {
    try {
        const response = await Users.findAll();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;

        const user = {
            username: username,
            password: password,
        };

        const checkUser = await Users.findOne({
            where: {
                username: user.username,
            },
        });
        // check user
        if (checkUser == undefined) {
            return res.json({
                msg: "Sorry, Wrong Username or Password",
                username: username,
            });
        }
        // check password
        if (user.password != checkUser.password) {
            return res.status(403).json({ msg: "Sorry, Wrong Username or Password" });
        }
        // if username and password match
        const userId = checkUser.unique_id;
        const userUsername = checkUser.username;

        // set jwt
        const refreshTokenChat = jwt.sign({ userId, userUsername },
            // process.env.REFRESH_TOKEN_SECRET, {
            "anrwkn4n1412ok3123213n12p312n3j213", {
                expiresIn: "1d",
            }
        );
        // set cookie
        await res.cookie("refreshTokenChat", refreshTokenChat, {
            httpOnly: true,
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // set status member menjadi Online
        await Users.update({
            status: "Online",
            refresh_token: refreshTokenChat
        }, {
            where: {
                unique_id: userId
            }
        });

        res.json({
            // accessToken: accessToken,
            refreshTokenChat: refreshTokenChat,
            status: `berhasil login admin ${username}`,
        });

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