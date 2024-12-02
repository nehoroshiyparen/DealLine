import { Model, DataTypes, Association, BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin, BelongsToManySetAssociationsMixin, BelongsToManyGetAssociationsMixin, BelongsToGetAssociationMixin } from 'sequelize'
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
    public assigneeTasks!: Task[];

    public getTasks!: BelongsToManyGetAssociationsMixin<Task>;

    public getDiscussions!: BelongsToManyGetAssociationsMixin<Discussion>;
    
    public getFriend!: BelongsToManyGetAssociationsMixin<User>
    public addFriend!: BelongsToManyAddAssociationMixin<User, number>
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

class UserFriends extends Model {
    public userId!: number;
    public friendsId!: number[];
}

UserFriends.init({
    userId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'Users', key: 'id' } },
    friendsId: { type: DataTypes.JSONB }
}, {
    sequelize, modelName: 'UserFriends'
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

    public addUser!: BelongsToManyAddAssociationMixin<User, number>;
    public setUser!: BelongsToManySetAssociationsMixin<User, number>;
    public getTask!: BelongsToGetAssociationMixin<Task>
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

class DiscusionParticipants extends Model {
    public discussionId!: number;
    public userId!: number[];
}

DiscusionParticipants.init({
    discussionId: { type: DataTypes.INTEGER, primaryKey: true },
    userId: { type: DataTypes.JSONB }
}, {
    sequelize, modelName: 'DiscusionParticipants'
})

class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public priority!: string;
    public deadline!: Date;
    public status!: string;
    public discussionId!: number;
    public assignees!: number[];

    public addUser!: BelongsToManyAddAssociationMixin<User, number>;
    public getUsers!: BelongsToManyGetAssociationsMixin<User>; 
    public removeUsers!: BelongsToManyRemoveAssociationMixin<User, number>
    public setUsers!: BelongsToManySetAssociationsMixin<User, number>
}

Task.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    priority: { type: DataTypes.STRING, allowNull: true, validate: {isIn: [['High' , 'Medium' , 'Low']]} },
    deadline: { type: DataTypes.DATE, allowNull: true },
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'In Progress', validate: { isIn: [['In Progress', 'Completed']],} },
    discussionId: { type: DataTypes.INTEGER, references: { model: Discussion, key: 'id' } },
    assignees: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },
}, {
    sequelize, modelName: 'Task'
})

class TaskAssignees extends Model {
    public taskId!: number;
    public userId!: number[];
}

TaskAssignees.init({
    taskId: { type: DataTypes.INTEGER, references: { model: 'Tasks', key: 'id' } },
    userId: { type: DataTypes.JSONB, references: { model: 'Users', key: 'id' } }
}, {
    sequelize, modelName: 'TaskAssignees'
});

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
    public message?: string;
}

Notifications.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false, validate: {isIn: [['friend_request', 'discussion_invitation', 'reminder']]} },
    senderId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    receiverId: {type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    message: { type: DataTypes.STRING, allowNull: true }, 
}, {
    sequelize, modelName: 'Notifications'
})


User.belongsToMany(Discussion, { through: 'DiscussionParticipants', foreignKey: 'userId' });
Discussion.belongsToMany(User, { through: 'DiscussionParticipants', foreignKey: 'discussionId' });
Task.belongsTo(Discussion, { foreignKey: 'discussionId' });
Task.belongsToMany(User, { through: 'TaskAssignees', foreignKey: 'taskId' });
User.belongsToMany(Task, { through: 'TaskAssignees', foreignKey: 'userId' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Notifications.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Notifications.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' }); 
User.belongsToMany(User, {through: UserFriends, as: 'friends', foreignKey: 'friendId'})
User.belongsToMany(User, {through: UserFriends, as: 'friendOf', foreignKey: 'UserId'})

export { sequelize, User, Discussion, Task, Comment, Notifications, Token };