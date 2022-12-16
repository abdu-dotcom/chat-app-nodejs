import Massage from "../model/message.js";

export const sendMessage = async(req, res) => {
    const { id_pengirim, id_penerima, text_Massage } = req.body;

    const message = {
        id_pengirim: id_pengirim,
        id_penerima: id_penerima,
        message: text_Massage
    }

    try {
        const response = await Massage.create(message);
        res.send(response);

    } catch (error) {
        console.log(error);
    }
};