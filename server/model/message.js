import Sequelize from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const message = db.define('message', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pengirim: {
        type: DataTypes.INTEGER
    },
    id_penerima: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.STRING
    },

}, {
    freezeTableName: true,
    updatedAt: false,
});

export default message;