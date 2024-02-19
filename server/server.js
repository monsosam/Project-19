const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Calculate and log the absolute path for serving static files
const staticPath = path.join(__dirname, '../client/dist');
console.log(`Serving static files from: ${staticPath}`);

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
