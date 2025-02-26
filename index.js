const express = require('express');
const app = express();
const fileUploadRoute = require('./routes/fileUpload');
const testRoute = require('./routes/test');
const cors = require('cors');

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/upload', fileUploadRoute);
app.use('/api/test', testRoute);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
