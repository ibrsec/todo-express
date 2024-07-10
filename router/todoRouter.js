const {
  getTodos,
  getOneTodo,
  createTodo,
  updateTodo,deleteTodo
} = require("../controllers/todoControllers.js");
const express = require("express");

const router = express.Router();


/**
 * @swagger
 * /api/todos:
 *  get:
 *      tags: 
 *          -  Todos
 *      summary: Get all todos
 *      description: Get all todos desription
 *      responses:
 *          200:
 *              description:  Successgully got the todos
 *          
 */
router.get("/",getTodos)


/**
 * @swagger
 * /api/todos:
 *  post:
 *      tags: 
 *          -  Todos
 *      summary: Create a new todo
 *      description: Create a new todo
 *      requestBody:
 *        description: Create a new todo in the todo app
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *        required: true
*      responses:
*          201:
*              description:  Succesfully posted
*              content:
*                application/json:
*                  schema:
*                    $ref: '#/components/schemas/Todo'
*          400:
*              description: Invalid input
*      security:
*        - petstore_auth:
*          - write:pets
*          - read:pets
 *          
 */

router.post("/",createTodo);
router.route("/:id").get(getOneTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;



/**
  "schema": {
    "Todo":{
      "required":["title"],
      "type": "object",
      "properties": {
        "title":{
          "type":"string",
          "example":" Todo 1"
        },
        "description": {
          "type":"string",
          "example":" Description 1"
        },
        "priority": {
          "type":"number",
          "example": 0
        },
        "isDone":{
          "type":"boolean",
          "example":false
        }
      }
    }
  },
 */