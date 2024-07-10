const { Todo } = require("../models/TodoModels");

//desc Get All Todos
//@route GET /api/todos
//@access private
//! GET TODOS - ###################
const getTodos = async (req, res) => {
  const todos = await Todo.findAndCountAll({
    where: {
      user_id: req.user_id,
    },
  });
  res
    .status(200)
    .json({ error: false, count: todos?.count, result: todos?.rows });
};

//desc Get One Todo
//@route GET /api/todos/:id
//@access private
//! Get one todo - ###################
const getOneTodo = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("404 - Todo not Found!");
  }

  if (req.user_id !== todo.user_id) {
    res.status(403);
    throw new Error("403 Forbidden - User don't have permission!");
  }

  res.status(200).json(todo);
};

//desc Create a todo
//@route POST /api/todos
//@access private
//! POST - ###################
const createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("400 Bad Request - Title is mandatory!");
  }

  const newTodo = await Todo.create({
    user_id: req.user_id,
    ...req.body,
  });

  res
    .status(201)
    .json({ error: false, message: "A new todo is created!", newTodo });
};

//desc Update a Todo
//@route PUT /api/todos/:id
//@access private
//! PUT - ###################
const updateTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new Error("400 Bad Reques - Title is mandatory!");
  }

  const todo = await Todo.findByPk(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("404 - Todo not Found!");
  }

  if (req.user_id !== todo.user_id) {
    res.status(403);
    throw new Error("403 Forbidden - User don't have permission!");
  }

  await Todo.update(
    { ...req.body },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  const updatedTodo = await Todo.findByPk(req.params.id);
  console.log("##############=", updateTodo);
  if (!updatedTodo) {
    res.status(500);
    throw new Error("Couldn't update - Something went wront!");
  }
  res
    .status(202)
    .json({ error: false, message: "Update is successfull!", updatedTodo });
};

//desc Delete a todo
//@route DELETE /api/todos/:id
//@access private
//! DELETE - #################
const deleteTodo = async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("404 - Todo not Found!");
  }

  if (req.user_id !== todo.user_id) {
    res.status(403);
    throw new Error("403 Forbidden - User don't have permission!");
  }

  const deletedTodo = await Todo.destroy({
    where: {
      id: req.params.id,
    },
  }); 
  res.status(200).json({
    error: false,
    message: "Delete is Successfull!",
    deletedTodo,
  });
};

module.exports = {
  getTodos,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
