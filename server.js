 import express from 'express';
 import mongoose from 'mongoose';
 import urlRoutes from './routes/url.js'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dbUri = 'mongodb+srv://urlProject:urlProject@urldb.6bnm9dg.mongodb.net/url-shortener?retryWrites=true&w=majority';
// const dbUri = 'mongodb+srv://urlProject:urlProject@urldb.6bnm9dg.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});