const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders');
const cron = require('node-cron');
const { processOrderStatuses } = require('./utils/statusQueue');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);

// Cron job to update order statuses every minute
cron.schedule('* * * * *', processOrderStatuses);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
