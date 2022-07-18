const { Router } = require('express');
const products = require('../db/products');

const router = Router();

let productId = 1;

router.get('/', (req, res) => {
    res.send({ products });
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (id <= 0 || id >= products.length + 1) {
        res.status(400).send({ error: "El id está fuera de rango"});
    };

    const product = products.find((item) => item.id === id);

    res.send({ product });
});

router.post('/', (req, res) => {
    const { name, price, stock } = req.body;
    
    products.push({ id: productId, name, price, stock });    

    productId += 1;

    res.send({ message: 'El producto fue agregado exitosamente'});
}); 

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!id || id <= 0 || id > products.length) {
        res.status(400).send({ error: "Debes ingresar un id de producto válido"});
    }

    products.filter(product => product.id !== product);

    res.send({ message: 'El producto fue eliminado correctamente'});
});

module.exports = router;