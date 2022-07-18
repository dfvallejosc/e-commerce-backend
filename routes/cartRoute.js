const { Router } = require('express');
const carts = require('../db/carts');
const products = require('../db/products');

const router = Router();


let cartId = 1;

router.get('/', (req, res) => {
    res.send({ carts });
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (id <= 0 || id > carts.length) {
        res.status(400).send({ error: "El id está fuera de rango"});
    };

    const cart = carts.filter((item) => item === id)[0];

    res.send({ cart });
});

router.post('/', (req, res) => {
    carts.push({
        id: cartId,
        products: []
    });    

    cartId += 1;

    res.send(carts[cartId - 1]);
}); 

router.post('/products', (req, res) => {

    const { idProduct, idCart } = req.body;

    if (!idProduct || !idCart) {
        res.status(400).send({ error: "Debes ingresar un id de producto y de carrito"});
    }

    const cart = carts.find(cart => cart.id === Number(idCart));

    const product = products.find(product => product.id === Number(idProduct));

    cart.products.push(product);

    res.send({ message: 'Producto agregado al carrito exitosamente'});
});

router.patch('/products', (req, res) => {

    const { idProduct, idCart } = req.body;

    if (!idProduct || !idCart) {
        res.status(400).send({ error: "Debes ingresar un id de producto y de carrito"});
    }

    const cart = carts.find(cart => cart.id === Number(idCart));

    cart.products.find(product => product.id !== Number(idProduct));

    res.send({ message: 'El producto fue eliminado del carrito'});
});

router.delete('/:idCart', (req, res) => {
    const idCart = Number(req.params.idCart);

    if (!idCart || idCart <= 0 || idCart > carts.length) {
        res.status(400).send({ error: "Debes ingresar un id de carrito válido"});
    }

    carts.filter(cart => cart.id !== idCart);

    res.send({ message: 'El carrito fue eliminado correctamente'});
});

module.exports = router;


