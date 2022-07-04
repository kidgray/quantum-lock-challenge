const User = require('./User');
const Post = require('./Post');
const User_Follower = require('./User_Follower');

User.hasMany(Post, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});
User.belongsToMany(User, { 
    through: User_Follower,
    as: 'followed',
    foreignKey: 'followed_id'
});
User.belongsToMany(User, {
    through: User_Follower,
    as: 'follower',
    foreignKey: 'follower_id'
});
Post.belongsTo(User, { 
    as: 'author',
    foreignKey: 'user_id',
    targetKey: 'id'
});
User_Follower.belongsTo(User, { 
    as: 'followed',
    onDelete: 'CASCADE' 
});
User_Follower.belongsTo(User, {
    as: 'follower',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, User_Follower };