import { createServer } from 'http';
import app from './app.js';
// const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = createServer(app);

// initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});