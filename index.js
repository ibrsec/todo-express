const express = require("express");

const ValidateToken = require("./middlewares/ValidateTokenHandler");
const app = express();
require("dotenv").config();
require("express-async-errors");
// const {sequelize} = require("./models/UserModels");
const { syncUser } = require("./models/UserModels");
const { syncTodo } = require("./models/TodoModels");
const sequelize = require("./config/db");
const PORT = process.env.PORT || 80;



const cors = require('cors');
app.use(cors());


app.use(express.json());

const dbConnect = async () => {
  await syncUser();
  await syncTodo();
  sequelize
    .authenticate()
    .then(() => console.log("* DB CONNECTED *"))
    .catch(() => console.log("* DB NOT CONNECTED *"));
};

dbConnect();

// import swagger ui module and swagger json file
const swJsonDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger/swagger.json");

const options = require('./swagger/options.json');
const swaggerSpecs = swJsonDoc(options);

// add route for swagger document API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// add routes
app.use("/api/user", require("./router/userRouter"));
app.use("/api/todos", ValidateToken, require("./router/todoRouter"));

app.use(require("./middlewares/errorHandler"));
app.listen(PORT, () => console.log(`Server is running on : ${PORT}`));
