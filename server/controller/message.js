import { Op } from "sequelize";
import Massage from "../model/message.js";

export const getMessages = async(req, res) => {
    const { id_pengirim, id_penerima } = req.body;
    try {
        const response = await Massage.findAll({
            // attributes: { exclude: ['id_pengirim', 'id_penerima'] },
            order: [
                ['message_id', 'ASC']
            ],
            where: {
                [Op.or]: [{
                        id_penerima: id_penerima,
                        id_pengirim: id_pengirim,
                    },
                    {
                        id_penerima: id_pengirim,
                        id_pengirim: id_penerima,
                    },
                ],
            },
        });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
    }
};

export const sendMessage = async(req, res) => {
    const { id_pengirim, id_penerima, text_Massage } = req.body;

    const message = {
        id_pengirim: id_pengirim,
        id_penerima: id_penerima,
        message: text_Massage,
    };

    try {
        const response = await Massage.create(message);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};