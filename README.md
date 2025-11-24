# My To Do List App

# Overview
This is My full App "To Do List" app made by Rehema Isimbi. It lets users sign up, log in, manage their profile, and create, edit, delete, and view tasks. The app also has a splash home page and a public tasks page that anyone can see.

# Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- EJS templates
- express-session
- connect-mongo
- dotenv
- Custom CSS 

# Features
- User sign up, login, and logout
- Session-based login system
- Profile update and delete
- Task CRUD (create, read, update, delete)
- Public tasks page (`/tasks/public`)
- Splash home page (`/`)
- Shared header and footer
- Custom CSS styling (`public/css/auth.css`)
- Middleware for route protection
- Environment variables stored in `.env` and ignored with `.gitignore`




# Folder Structure

- todo-app/
  - app.js
  - .env
  - .gitignore
  - package.json
  - public/
    - css/
      - auth.css
  - src/
    - models/
      - User.js
      - Task.js
    - routes/
      - auth.js
      - tasks.js
    - views/
      - index.ejs
      - login.ejs
      - register.ejs
      - profile.ejs
      - tasks.ejs
      - tasks-public.ejs
      - partials/
        - header.ejs
        - footer.ejs
    - middleware/
      - requireLogin.js




## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root folder with:


4. Run the app with `node app.js` or `npm start`.
5. Open `http://localhost:3000` in browser.

# Styling
The app uses custom CSS in `public/css/auth.css`. 

# Security
Sensitive data is stored in `.env` and loaded with `dotenv`. The `.env` file is ignored in GitHub using `.gitignore`.

# Author
Rehema Isimbi — built the whole app (frontend + backend).

# Reference: 

- W3schools
- Youtube video
- shecodes


