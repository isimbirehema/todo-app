require('dotenv').config();
require('./src/passport'); // load passport strategies

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Static assets
app.use(express.static(path.resolve(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'replace_this_with_a_strong_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: true
  }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// User available in views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index', { user: req.user || null });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
