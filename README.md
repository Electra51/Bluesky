# BlueSky Blog

BlueSky Blog is a full-stack MERN project for creating and managing blogs. It supports three user roles: Normal User, Author, and Admin, each with specific permissions and functionalities.

## Features

### General Features:
- User authentication and authorization using role-based access control.
- Responsive and modern UI built with React.js.
- Rich text editor for creating blogs using React Quill.
- MongoDB as the database for storing user data, blog data, comments, ratings, and reactions.
- RESTful API built with Node.js and Express.js.

### Admin Features:
- Create and manage blog categories and tags.
- View and manage the list of authors.
- View and manage blogs, including details.
- Update the status of blogs (Trending, Featured, Pending, Rejected).
- Verify authors to ensure content quality.

### Author Features:
- Add and manage blog tags.
- Create and publish blogs using React Quill.
- View their own blog list.

### Normal User Features:
- Browse and read blogs.
- Add comments to blogs.
- React to blogs (e.g., Like, Love, etc.).
- Rate blogs.
- Share blogs on social media.

> **Note**: Admins and authors cannot comment, rate, or react to blogs.

## Technologies Used

### Frontend:
- React.js
- React Router
- React Quill (for blog creation)
- Axios (for API communication)
- Tailwind CSS (for styling)

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)

### Authentication:
- JWT (JSON Web Tokens) for secure authentication and role-based access control.

## Installation and Setup

### Prerequisites:
- Node.js (v14+)
- MongoDB (Local or cloud instance)
- Git

### Steps to Run Locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bluesky-blog.git
   cd bluesky-blog
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the backend directory with the following environment variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env` file in the frontend directory with the following environment variable:
     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

4. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```
bluesky-blog
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── middleware
│   ├── utils
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── context
│   │   └── App.js
└── README.md
```

## API Endpoints

### Authentication:
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login as a user.

### Admin:
- `POST /api/admin/categories` - Create a category.
- `POST /api/admin/tags` - Create a tag.
- `GET /api/admin/authors` - Get all authors.
- `GET /api/admin/blogs` - Get all blogs.
- `PATCH /api/admin/blogs/:id/status` - Update blog status.
- `PATCH /api/admin/authors/:id/verify` - Verify an author.

### Author:
- `POST /api/author/blogs` - Create a blog.
- `GET /api/author/blogs` - Get the list of blogs created by the author.

### Normal User:
- `GET /api/blogs` - Get all blogs.
- `POST /api/blogs/:id/comments` - Add a comment to a blog.
- `POST /api/blogs/:id/reactions` - React to a blog.
- `POST /api/blogs/:id/ratings` - Rate a blog.

## Future Improvements
- Add pagination and infinite scrolling for blog lists.
- Implement search and filter functionality.
- Add image upload support for blogs.
- Integrate social media sharing buttons.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributors
- **Safayet Nur** - [LinkedIn](https://www.linkedin.com/in/safayet-nur/) | [Portfolio](https://nextjs-my-portfolio-electra51.vercel.app/)
