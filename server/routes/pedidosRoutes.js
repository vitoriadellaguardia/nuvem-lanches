const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const authenticateUser = require('../middleware/authenticateUser');

router.use(authenticateUser);

router.get('/:id', pedidosController.getPedidosItens);
router.post('/', pedidosController.addPedido);

module.exports = router;