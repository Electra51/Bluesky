# BlueSky 

BlueSky is a full-stack MERN project for creating and managing blogs. It supports three user roles: Normal User, Author, and Admin, each with specific permissions and functionalities.

## Features

### General Features:
- User authentication and authorization using role-based access control.
- Responsive and modern UI built with React.js.
- Rich text editor for creating blogs using React Quill.
- MongoDB as the database for storing user data, blog data, comments, ratings, and reactions.
- Mongoose as a mongodb wrapper.
- RESTful API built with Node.js and Express.js.

### Admin Features:
- Create and manage categories and tags.
- View and manage the list of authors.
- View and manage blogs, including details.
- Update the status of blogs (Trending, Featured, Pending, Rejected).
- Verify authors to ensure content quality.

### Author Features:
- Add and manage tags.
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
- React Router Dom
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
- Node.js
- Express.js
- MongoDB (Local or cloud instance)
- Git

### Steps to Run Locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Electra51/Bluesky.git
   cd Bluesky
   ```

3. **Setup:**
   ```bash
   cd Bluesky
   npm install
   ```
   - Create a `.env` file in the frontend directory with the following environment variable:
     ```env
     REACT_APP_API_URL=http://localhost:8080
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

4. **Access the Application:**
   - Open your browser and navigate to `http://localhost:5173`.


## Project Images




## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributors
- **Safayet Nur** - [LinkedIn](https://www.linkedin.com/in/safayet-nur/) | [Portfolio](https://nextjs-my-portfolio-electra51.vercel.app/)


