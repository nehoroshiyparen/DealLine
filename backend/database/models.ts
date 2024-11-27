import { Model, DataTypes } from 'sequelize'
import sequelize from './db';

class User extends Model {
    public id!: number;
    public email!: string;
    public username!: string;
    public description!: string;
    public contacts!: object[];
    public avatar!: string;
    public password!: string;
    public isActivated!: boolean;
    public activationLink!: string;
}

User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    username: {type: DataTypes.STRING(30), unique: true, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
    contacts: {type: DataTypes.JSONB, allowNull: true},
    avatar: {type: DataTypes.STRING, allowNull: true},
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize, modelName: 'User'
})

class Token extends Model {
    public user_id!: number;
    public refreshToken!: string;
}

Token.init({
    user_id: { type: DataTypes.INTEGER, references: {model: User, key: 'id'} },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize, modelName: 'Token'
})

class Discussion extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public createdAt!: Date;
    public creatorId!: number;
    public participants!: number[];
    public status!: string;
}

Discussion.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titile: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    creatorId: { type: DataTypes.INTEGER, references: {model: User, key: 'id'} },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Active' },
    participants: { type: DataTypes.JSONB, allowNull: true },
}, {
    sequelize, modelName: 'Discussion'
})

class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public priority!: string;
    public deadline!: Date;
    public status!: string;
    public discussionId!: number;
}

Task.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    priority: { type: DataTypes.STRING, allowNull: false, validate: {isIn: [['High' , 'Medium' , 'Low']]} },
    deadline: { type: DataTypes.DATE, allowNull: true },
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'In Progress', validate: { isIn: [['In Progress', 'Completed']],} },
    discussionId: { type: DataTypes.INTEGER, references: { model: Discussion, key: 'id' } }
}, {
    sequelize, modelName: 'Task'
})

class Comment extends Model {
    public id!: number;
    public taskId!: number;
    public userId!: number;
    public content!: string;
    public createdAt!: Date;
}

Comment.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskId: { type: DataTypes.INTEGER, references: { model: Task, key: 'id' } },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    content: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    sequelize, modelName: 'Comment'
})

class Notifications extends Model {
    public id!: number;
    public type!: string;
    public senderId!: number;
    public receiverId!: number;
    public date!: Date;
}

Notifications.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false, validate: {isIn: [['friend_request', 'discussion_invitation', 'reminder']]} },
    senderId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    receiverId: {type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    sequelize, modelName: 'Notifications'
})


Discussion.belongsTo(User, { foreignKey: 'creatorId' })
Task.belongsTo(Discussion, { foreignKey: 'discussionId' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Notifications.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' }); // Уведомление от отправителя
Notifications.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' }); 

export { sequelize, User, Discussion, Task, Comment, Notifications, Token };