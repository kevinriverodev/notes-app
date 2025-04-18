import { DataTypes } from 'sequelize';
import db from '../config/db-config';
import User from './user';

const Note = db.sequelizeInstance.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Note.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });

export default Note;