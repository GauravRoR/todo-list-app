import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getTodoListById, 
  updateTodoList, 
  addTodoItem 
} from '../api';
import TodoItem from '../components/TodoItem';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';

const TodoListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [todoList, setTodoList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newItemText, setNewItemText] = useState('');
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState('');

  const fetchTodoList = async () => {
    try {
      setLoading(true);
      const data = await getTodoListById(id);
      setTodoList(data);
      setTitle(data.title);
      setError('');
    } catch (error) {
      setError('Failed to fetch todo list');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, [id]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    try {
      await addTodoItem(id, { text: newItemText });
      setNewItemText('');
      setShowNewItemForm(false);
      fetchTodoList();
    } catch (error) {
      setError('Failed to add todo item');
      console.error(error);
    }
  };

  const handleUpdateTitle = async () => {
    if (!title.trim() || title === todoList.title) {
      setTitle(todoList.title);
      setEditingTitle(false);
      return;
    }

    try {
      await updateTodoList(id, { title });
      setEditingTitle(false);
      fetchTodoList();
    } catch (error) {
      setError('Failed to update title');
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!todoList) return <p>Todo list not found</p>;

  return (
    <div className="todo-list-detail">
      <div className="todo-list-header">
        <button onClick={() => navigate('/dashboard')} className="btn btn-back">
          <FaArrowLeft /> Back to Dashboard
        </button>
        
        {editingTitle ? (
          <div className="edit-title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleUpdateTitle} className="btn">
              Save
            </button>
            <button 
              onClick={() => {
                setTitle(todoList.title);
                setEditingTitle(false);
              }} 
              className="btn"
            >
              Cancel
            </button>
          </div>
        ) : (
          <h1 onClick={() => setEditingTitle(true)} className="editable-title">
            {todoList.title}
          </h1>
        )}
      </div>

      <div className="todo-list-actions">
        <button 
          className="btn btn-primary" 
          onClick={() => setShowNewItemForm(!showNewItemForm)}
        >
          <FaPlus /> {showNewItemForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>
      
      {showNewItemForm && (
        <form onSubmit={handleAddItem} className="new-item-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Item Text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              required
            />
            <button type="submit" className="btn">Add</button>
          </div>
        </form>
      )}
      
      <div className="todo-items">
        {todoList.items.length === 0 ? (
          <p>No items in this list yet. Add one to get started!</p>
        ) : (
          todoList.items.map((item) => (
            <TodoItem 
              key={item._id} 
              item={item} 
              listId={id} 
              onUpdate={fetchTodoList} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoListDetail;
