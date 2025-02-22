const express = require('express');
const app = express();
const cors = require('cors');
const fileUploadRoute = require('./routes/fileUpload');
const testRoute = require('./routes/test');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/upload', fileUploadRoute);
app.use('/api/test', testRoute);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
