mongodb+srv://gauravdevock:<db_password>@cluster0.eozm2hu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


# To-Do List Application 📝

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing to-do lists with user authentication.

## Features 🚀

### User Authentication
- Register and login with email and password
- JWT token-based authentication
- Protected routes for authenticated users

### To-Do List Management
- Create, view, update, and delete to-do lists
- Add, edit, and delete to-do items within lists
- Mark items as complete/incomplete
- Real-time updates

### Responsive Design
- Mobile-friendly interface
- Clean and intuitive UI

## Tech Stack 🛠️

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon components
- **Context API** - State management

## Project Structure 📁

to-do list/
├── server/                  # Backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── .env                 # Environment variables
│   ├── package.json         # Dependencies
│   └── server.js            # Entry point
│
├── client/                  # Frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Context providers
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main component
│   │   ├── App.css          # Global styles
│   │   ├── api.js           # API service
│   │   └── index.js         # Entry point
│   └── package.json         # Dependencies
│
└── README.md                # Project documentation



## Installation 💻

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)

### Backend Setup
1. Navigate to the `server` directory:

    ```bash
    cd "to-do list/server"
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `server` directory with the following variables:

    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/todolist
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

### Frontend Setup
1. Navigate to the `client` directory:

    ```bash
    cd "to-do list/client"
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## API Endpoints 📡

### Authentication
- **POST** `/api/users` - Register a new user
- **POST** `/api/users/login` - Login user
- **GET** `/api/users/profile` - Get user profile (protected)

### To-Do Lists
- **GET** `/api/todos` - Get all todo lists for logged in user (protected)
- **POST** `/api/todos` - Create a new todo list (protected)
- **GET** `/api/todos/:id` - Get a specific todo list (protected)
- **PUT** `/api/todos/:id` - Update a todo list (protected)
- **DELETE** `/api/todos/:id` - Delete a todo list (protected)

### To-Do Items
- **POST** `/api/todos/:id/items` - Add a new item to a todo list (protected)
- **PUT** `/api/todos/:id/items/:itemId` - Update a todo item (protected)
- **DELETE** `/api/todos/:id/items/:itemId` - Delete a todo item (protected)

## Usage 💡

1. Register a new account or log in with existing credentials
2. Create a new to-do list from the dashboard
3. Add items to your to-do list
4. Mark items as complete by checking the checkbox
5. Edit or delete items as needed
6. Create multiple lists to organize different categories of tasks

## Future Enhancements 🚀
- Drag and drop functionality for reordering items
- Due dates and reminders for tasks
- Sharing lists with other users
- Categories and tags for better organization
- Dark mode theme
- Export/import functionality

## Contributing 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the **ISC License**.

## Acknowledgements 🙏
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express Documentation](https://expressjs.com/en/starter/installing.html)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
