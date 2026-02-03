
const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

// Load env vars
const path = require('path');

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false, // Allow inline scripts/styles for simple debug
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow PDF loading
}));
app.use(compression());
app.use(morgan('dev'));

// Static File Serving (Robust Path)
const uploadsPath = path.join(__dirname, 'public', 'uploads');
console.log('Serving static files from:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));

// Database Connection


// Routes
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.send('Uninest API is running...');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Only start server if run directly (not imported as Vercel function)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
