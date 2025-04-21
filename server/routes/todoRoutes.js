const express = require('express');
const router = express.Router();
const {
  getTodoLists,
  createTodoList,
  getTodoListById,
  updateTodoList,
  deleteTodoList,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem
} = require('../controllers/todoController');
const { protect } = require('../middleware/auth');

router.use(protect);


router.route('/')
  .get(getTodoLists)
  .post(createTodoList);

router.route('/:id')
  .get(getTodoListById)
  .put(updateTodoList)
  .delete(deleteTodoList);

router.route('/:id/items')
  .post(addTodoItem);

router.route('/:id/items/:itemId')
  .put(updateTodoItem)
  .delete(deleteTodoItem);

module.exports = router;
