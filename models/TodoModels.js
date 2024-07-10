const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const {User} = require('./UserModels')

const Todo = sequelize.define("todos", {
  user_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:User,
        key:"id",
      }
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  priority: {
    // 0:Normal, 1:High, -1:Low;
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

const syncTodo = async () => {
  await sequelize.sync();
  console.log("Todo table is synced!!");
};

module.exports = { Todo, syncTodo };
 