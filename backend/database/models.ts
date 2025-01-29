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
    public isDeleted!: boolean;

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
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: true },
    activationLink: { type: DataTypes.STRING, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    sequelize, modelName: 'User'
})

class UserFriends extends Model {
    public userId!: number;
    public friendId!: number;
}

UserFriends.init({
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
    friendId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' }  }
}, {
    sequelize, modelName: 'UserFriends'
})

class Discussion extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public createdAt!: Date;
    public creatorId!: number;
    public status!: string;

    public addParticipants!: BelongsToManyAddAssociationMixin<User, number>;
    public setParticipants!: BelongsToManySetAssociationsMixin<User, number>;
    public getParticipants!: BelongsToGetAssociationMixin<Task>
}

Discussion.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    creatorId: { type: DataTypes.INTEGER, references: {model: User, key: 'id'} },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Active' },
}, {
    sequelize, modelName: 'Discussion'
})

class DiscussionParticipants extends Model {
    public discussionId!: number;
    public userId!: number;
}

DiscussionParticipants.init({
    discussionId: { type: DataTypes.INTEGER, primaryKey: true },
    userId: { type: DataTypes.INTEGER, primaryKey: true }
}, {
    sequelize,
    modelName: 'DiscussionParticipants',
    tableName: 'DiscussionParticipants',
    timestamps: true,  // если хотите использовать createdAt и updatedAt
});

class Topic extends Model {
    public id!: number;
    public title!: string;
    public discussionId!: number;
}

Topic.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    discussionId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize, modelName: 'Topic'
})

class Task extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public priority!: string;
    public deadline!: Date;
    public status!: string;
    public topicId!: number;
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
    topicId: { type: DataTypes.INTEGER, references: { model: Topic, key: 'id' } },
    discussionId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Discussion, key: 'id' } },
}, {
    sequelize, modelName: 'Task'
})

class TaskAssignees extends Model {
    public taskId!: number;
    public userId!: number[];
}

TaskAssignees.init({
    taskId: { type: DataTypes.INTEGER, references: { model: 'Tasks', key: 'id' } },
    userId: { type: DataTypes.ARRAY(DataTypes.INTEGER) }, 
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

class Position extends Model {
    public userId!: number;
    public elementId!: string;
    public discussionId!: number;
    public x!: number;
    public y!: number;
}

Position.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    elementId: { type: DataTypes.STRING, allowNull: false },
    discussionId: { type: DataTypes.INTEGER, allowNull: false },
    x: { type: DataTypes.FLOAT, allowNull: false },
    y: { type: DataTypes.FLOAT, allowNull: false }
}, {
    sequelize, 
    modelName: 'Position',
    indexes: [
        {
            unique: true,
            fields: ['userId', 'discussionId', 'elementId'],
            name: 'unique_user_element'
        }
    ]
})

class Notifications extends Model {
    public id!: number;
    public type!: string;
    public senderId!: number;
    public recieverId!: number;
    public date!: Date;
    public message?: string;
    public dicussionId?: number;
    public taskId?: number;
}

Notifications.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false, validate: {isIn: [['friend_request', 'discussion_invitation', 'reminder']]} },
    senderId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    recieverId: {type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    message: { type: DataTypes.STRING, allowNull: true }, 
    discussionId: { type: DataTypes.INTEGER, allowNull: true },
    taskId: { type: DataTypes.INTEGER, allowNull: true }
}, {
    sequelize, modelName: 'Notifications'
})

class Token extends Model {
    public user_id!: number;
    public refreshToken!: string;
}

Token.init({
    user_id: { type: DataTypes.INTEGER, references: {model: User, key: 'id'} },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
}, {
    sequelize, modelName: 'Token'
})

Discussion.belongsToMany(User, { through: 'DiscussionParticipants', foreignKey: 'discussionId', as: 'participants' });
Discussion.belongsTo(User, { foreignKey: 'creatorId', as: 'owner'})
Discussion.hasMany(Topic, { foreignKey: 'discussionId', as: 'topics' });
Discussion.hasMany(Task, { foreignKey: 'discussionId', as: 'tasks' });

Topic.belongsTo(Discussion, { foreignKey: 'discussionId' });
Topic.hasMany(Task, { foreignKey: 'topicId', as: 'tasks', onDelete: 'CASCADE' });

Task.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic'});
Task.belongsToMany(User, { through: 'TaskAssignees', foreignKey: 'taskId', as: 'assignees' });
Task.hasMany(Comment, { foreignKey: 'taskId', as: 'comments' });
Task.belongsTo(Discussion, { foreignKey: 'discussionId' });

User.hasMany(Discussion, { foreignKey: 'creatorId', as: 'ownedDiscussions' })
User.belongsToMany(Task, { through: 'TaskAssignees', foreignKey: 'userId', as: 'assignees' });
User.belongsToMany(Discussion, { through: 'DiscussionParticipants', foreignKey: 'userId', as: 'discussions'});
User.belongsToMany(User, {through: UserFriends, as: 'friends', foreignKey: 'userId'})
User.belongsToMany(User, {through: UserFriends, as: 'friendOf', foreignKey: 'friendId'})

Comment.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

Notifications.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Notifications.belongsTo(User, { as: 'Receiver', foreignKey: 'recieverId' }); 

export { sequelize, User, Discussion, Task, Comment, Notifications, Token, UserFriends, DiscussionParticipants, Topic, Position };