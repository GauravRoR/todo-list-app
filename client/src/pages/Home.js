import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to the To-Do List App</h1>
        <p>Organize your tasks and boost your productivity</p>
        
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Go to Dashboard
          </Link>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Register
            </Link>
          </div>
        )}
      </div>
      
      <div className="features">
        <div className="feature">
          <h2>Create Multiple Lists</h2>
          <p>Organize your tasks into different categories</p>
        </div>
        <div className="feature">
          <h2>Track Progress</h2>
          <p>Mark items as complete and see your progress</p>
        </div>
        <div className="feature">
          <h2>Secure Access</h2>
          <p>Your lists are private and secure</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
