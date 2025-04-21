import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { updateTodoItem, deleteTodoItem } from '../api';

const TodoItem = ({ item, listId, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const [completed, setCompleted] = useState(item.completed);

  const handleUpdate = async () => {
    try {
      await updateTodoItem(listId, item._id, { text, completed });
      setEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating todo item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodoItem(listId, item._id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting todo item:', error);
    }
  };

  const toggleComplete = async () => {
    try {
      const newCompleted = !completed;
      setCompleted(newCompleted);
      await updateTodoItem(listId, item._id, { completed: newCompleted });
      onUpdate();
    } catch (error) {
      console.error('Error updating todo item:', error);
    }
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      {editing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleUpdate} className="btn btn-sm">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="btn btn-sm">
            Cancel
          </button>
        </div>
      ) : (
        <div className="view-mode">
          <div className="todo-text">
            <input
              type="checkbox"
              checked={completed}
              onChange={toggleComplete}
            />
            <span className={completed ? 'completed-text' : ''}>{item.text}</span>
          </div>
          <div className="todo-actions">
            <button onClick={() => setEditing(true)} className="btn btn-sm">
              <FaEdit />
            </button>
            <button onClick={handleDelete} className="btn btn-sm btn-danger">
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
