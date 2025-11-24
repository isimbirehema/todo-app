import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Views setup
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Home route (Landing page)
app.get('/', (req, res) => {
  res.render('index'); // looks for index.ejs inside ./src/views
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Connect to MongoDB
await connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
