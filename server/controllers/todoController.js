const TodoList = require('../models/Todo');

const getTodoLists = async (req, res) => {
  try {
    const todoLists = await TodoList.find({ user: req.user._id });
    res.json(todoLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createTodoList = async (req, res) => {
  try {
    const { title, items } = req.body;

    const todoList = new TodoList({
      title,
      user: req.user._id,
      items: items || []
    });

    const createdTodoList = await todoList.save();
    res.status(201).json(createdTodoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getTodoListById = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    if (todoList.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.json(todoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTodoList = async (req, res) => {
  try {
    const { title, items } = req.body;

    const todoList = await TodoList.findById(req.params.id);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    if (todoList.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    todoList.title = title || todoList.title;
    if (items) todoList.items = items;

    const updatedTodoList = await todoList.save();
    res.json(updatedTodoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    if (todoList.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await todoList.deleteOne();
    res.json({ message: 'Todo list removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addTodoItem = async (req, res) => {
  try {
    const { text } = req.body;

    const todoList = await TodoList.findById(req.params.id);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    if (todoList.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    todoList.items.push({ text });
    await todoList.save();
    
    res.status(201).json(todoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTodoItem = async (req, res) => {
  try {
    const { text, completed } = req.body;

    const todoList = await TodoList.findById(req.params.id);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    if (todoList.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const item = todoList.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (text !== undefined) item.text = text;
    if (completed !== undefined) item.completed = completed;

    await todoList.save();
    
    res.json(todoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteTodoItem = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    if (todoList.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const itemIndex = todoList.items.findIndex(
      item => item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    todoList.items.splice(itemIndex, 1);
    await todoList.save();
    
    res.json(todoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTodoLists,
  createTodoList,
  getTodoListById,
  updateTodoList,
  deleteTodoList,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem
};
