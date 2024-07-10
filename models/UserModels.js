const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
 
const User = sequelize.define('user',{
    username:{
        type: DataTypes.STRING,
        allowNull:false,

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})
const syncUser = async() => {
    await sequelize.sync()
    console.log('User table is synced!');
}


module.exports = {
    User,sequelize,syncUser
}