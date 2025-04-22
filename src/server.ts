import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';

await db(); // ✅ top-level await is fine

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// app.use(routes);
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});


// Wrap server start in async function to wait for DB connection when we dont have top-level await support and correct tsconfig
// const init = async () => {
//   await db();   // <- ✅ here it belongs
//   app.listen(PORT, () => {
//     console.log(`🚀 API server running on http://localhost:${PORT}`);
//   });
// };

// init();