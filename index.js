const express = require('express');
const app = express();
const fileUploadRoute = require('./routes/fileUpload');
const testRoute = require('./routes/test');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/upload', fileUploadRoute);
app.use('/api/test', testRoute);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
