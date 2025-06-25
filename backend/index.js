const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');
const fileUpload = require('express-fileupload')



dotenv.config();
const app = express();


app.use(cors({
  origin: ['http://localhost:5174', 'https://moodboard-macker.vercel.app'],
  credentials: true
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error(' MongoDB connection failed:', err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('MongoDB is connected!');
}); 
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use(fileUpload({ useTempFiles: true }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
