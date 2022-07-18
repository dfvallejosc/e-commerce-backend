const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRoute');

const server = express();

const PORT = 8080;

server.use(cors());
server.use(express.json());
server.use('/products', productsRouter);
server.use('/carts', cartRouter);


server.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});