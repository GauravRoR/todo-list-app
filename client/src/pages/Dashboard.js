import { useState, useEffect } from 'react';
import { getTodoLists, createTodoList, deleteTodoList } from '../api';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [showNewListForm, setShowNewListForm] = useState(false);

  const fetchTodoLists = async () => {
    try {
      setLoading(true);
      const data = await getTodoLists();
      setTodoLists(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch todo lists');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;

    try {
      await createTodoList({ title: newListTitle });
      setNewListTitle('');
      setShowNewListForm(false);
      fetchTodoLists();
    } catch (error) {
      setError('Failed to create todo list');
      console.error(error);
    }
  };

  const handleDeleteList = async (id) => {
    try {
      await deleteTodoList(id);
      fetchTodoLists();
    } catch (error) {
      setError('Failed to delete todo list');
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Your Todo Lists</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="dashboard-actions">
        <button 
          className="btn btn-primary" 
          onClick={() => setShowNewListForm(!showNewListForm)}
        >
          <FaPlus /> {showNewListForm ? 'Cancel' : 'New List'}
        </button>
      </div>
      
      {showNewListForm && (
        <form onSubmit={handleCreateList} className="new-list-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="List Title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              required
            />
            <button type="submit" className="btn">Create</button>
          </div>
        </form>
      )}
      
      {loading ? (
        <p>Loading...</p>
      ) : todoLists.length === 0 ? (
        <p>You don't have any todo lists yet. Create one to get started!</p>
      ) : (
        <div className="todo-lists">
          {todoLists.map((list) => (
            <div key={list._id} className="todo-list-card">
              <div className="todo-list-header">
                <h3>{list.title}</h3>
                <div className="todo-list-actions">
                  <button
                    onClick={() => handleDeleteList(list._id)}
                    className="btn btn-sm btn-danger"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p>{list.items.length} items</p>
              <Link to={`/todos/${list._id}`} className="btn btn-block">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
